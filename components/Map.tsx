
import * as maplibregl from "maplibre-gl";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X, Minus, Plus, Loader2 } from "lucide-react";
import { cn } from "../utils";

// Handle potential ESM default export differences
const MapLibreGL = (maplibregl as any).default || maplibregl;

type MapContextValue = {
  map: any | null;
  isLoaded: boolean;
};

const MapContext = createContext<MapContextValue | null>(null);

function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}

const defaultStyles = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
};

type MapProps = {
  children?: ReactNode;
  styles?: {
    light?: string;
    dark?: string;
  };
  className?: string;
  center?: [number, number];
  zoom?: number;
  [key: string]: any;
};

const DefaultLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 z-10">
    <div className="flex gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse [animation-delay:300ms]" />
    </div>
  </div>
);

export function Map({ children, styles, className, center, zoom, ...props }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  
  const currentStyle = styles?.light ?? defaultStyles.light;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const mapInstance = new MapLibreGL.Map({
      container: containerRef.current,
      style: currentStyle,
      center: center || [0, 0],
      zoom: zoom || 1,
      renderWorldCopies: false,
      attributionControl: {
        compact: true,
      },
      ...props,
    });

    const styleDataHandler = () => setIsStyleLoaded(true);
    const loadHandler = () => setIsLoaded(true);

    mapInstance.on("load", loadHandler);
    mapInstance.on("styledata", styleDataHandler);
    mapRef.current = mapInstance;

    return () => {
      mapInstance.off("load", loadHandler);
      mapInstance.off("styledata", styleDataHandler);
      mapInstance.remove();
      mapRef.current = null;
    };
  }, [isMounted]);

  const isLoading = !isMounted || !isLoaded || !isStyleLoaded;

  return (
    <MapContext.Provider
      value={{
        map: mapRef.current,
        isLoaded: isMounted && isLoaded && isStyleLoaded,
      }}
    >
      <div ref={containerRef} className={cn("relative w-full h-full min-h-[300px] overflow-hidden shadow-sm", className)}>
        {isLoading && <DefaultLoader />}
        {isMounted && children}
      </div>
    </MapContext.Provider>
  );
}

type MarkerContextValue = {
  markerRef: React.RefObject<any | null>;
  markerElementRef: React.RefObject<HTMLDivElement | null>;
  map: any | null;
  isReady: boolean;
};

const MarkerContext = createContext<MarkerContextValue | null>(null);

function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error("Marker components must be used within MapMarker");
  }
  return context;
}

type MapMarkerProps = {
  longitude: number;
  latitude: number;
  children?: ReactNode;
  onClick?: (e: MouseEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  draggable?: boolean;
  [key: string]: any;
};

export function MapMarker({
  longitude,
  latitude,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  draggable = false,
  ...markerOptions
}: MapMarkerProps) {
  const { map, isLoaded } = useMap();
  const markerRef = useRef<any | null>(null);
  const markerElementRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoaded || !map) return;

    const container = document.createElement("div");
    markerElementRef.current = container;

    const marker = new MapLibreGL.Marker({
      ...markerOptions,
      element: container,
      draggable,
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    markerRef.current = marker;

    const handleClick = (e: MouseEvent) => onClick?.(e);
    const handleMouseEnter = (e: MouseEvent) => onMouseEnter?.(e);
    const handleMouseLeave = (e: MouseEvent) => onMouseLeave?.(e);

    container.addEventListener("click", handleClick);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    setIsReady(true);

    return () => {
      container.removeEventListener("click", handleClick);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      marker.remove();
      markerRef.current = null;
      markerElementRef.current = null;
      setIsReady(false);
    };
  }, [map, isLoaded]);

  useEffect(() => {
    markerRef.current?.setLngLat([longitude, latitude]);
  }, [longitude, latitude]);

  return (
    <MarkerContext.Provider value={{ markerRef, markerElementRef, map, isReady }}>
      {children}
    </MarkerContext.Provider>
  );
}

export function MarkerContent({ children, className }: { children?: ReactNode; className?: string }) {
  const { markerElementRef, isReady } = useMarkerContext();
  if (!isReady || !markerElementRef.current) return null;
  return createPortal(
    <div className={cn("relative cursor-pointer", className)}>{children}</div>,
    markerElementRef.current
  );
}

export function MarkerLabel({ children, className, position = "top" }: { children?: ReactNode; className?: string; position?: "top" | "bottom" }) {
  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
  };
  return (
    <div className={cn("absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-widest text-black bg-white px-3 py-1.5 rounded-lg shadow-xl border border-gray-100", positionClasses[position], className)}>
      {children}
    </div>
  );
}

export function MapControls({ position = "bottom-right", showZoom = true, className }: { position?: string, showZoom?: boolean, className?: string }) {
  const { map, isLoaded } = useMap();
  const handleZoomIn = useCallback(() => map?.zoomTo(map.getZoom() + 1, { duration: 300 }), [map]);
  const handleZoomOut = useCallback(() => map?.zoomTo(map.getZoom() - 1, { duration: 300 }), [map]);

  if (!isLoaded) return null;

  const posClass = position === "bottom-right" ? "bottom-6 right-6" : "top-6 left-6";

  return (
    <div className={cn("absolute z-10 flex flex-col gap-2", posClass, className)}>
      {showZoom && (
        <div className="flex flex-col rounded-xl border border-gray-100 bg-white shadow-xl overflow-hidden">
          <button onClick={handleZoomIn} className="p-2.5 hover:bg-gray-50 border-b border-gray-100 transition-colors"><Plus className="w-4 h-4 text-black" /></button>
          <button onClick={handleZoomOut} className="p-2.5 hover:bg-gray-50 transition-colors"><Minus className="w-4 h-4 text-black" /></button>
        </div>
      )}
    </div>
  );
}
