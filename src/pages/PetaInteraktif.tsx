import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Printer, Download, Search, ChevronLeft, ChevronRight, Loader2, Map, Layers, Maximize, Minimize, Copy, ExternalLink, Eye, EyeOff, CheckCircle2, Ruler, BoxSelect, Trash2, ChevronDown, Palette, SlidersHorizontal, Plus, Minus, ShieldCheck
} from "lucide-react";
import Layout from "@/components/Layout";
import "leaflet/dist/leaflet.css";
import { useToast } from "@/hooks/use-toast";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { identifikasiZona } from "@/services/zonasiService";
import { Regulation } from "@/data/zonasi";
import CompliancePanel from "@/components/map/CompliancePanel";

const layers = [
  {
    id: "kabupaten",
    label: "Batas Kabupaten",
    category: "Batas Administrasi",
    file: "batas_kabupaten.json",
    type: "polygon",
    color: "#D4A017",
    weight: 3,
    defaultOn: false,
    primaryField: "Nama_Wilayah_Administrasi_Kabupaten/Kota"
  },
  {
    id: "kecamatan",
    label: "Batas Kecamatan",
    category: "Batas Administrasi",
    file: "batas_kecamatan.json",
    type: "polygon",
    color: "#1F5E3B",
    weight: 2,
    defaultOn: false,
    primaryField: "Nama_Wilayah_Administrasi_Kecamatan/Distirk"
  },
  {
    id: "desa",
    label: "Batas Desa",
    category: "Batas Administrasi",
    file: "batas_desa.json",
    type: "polygon",
    color: "#64748b",
    weight: 1,
    defaultOn: false,
    primaryField: "Nama_Wilayah_Administrasi_Kelurahan/Desa"
  },
  {
    id: "jalan",
    label: "Jaringan Jalan",
    category: "Jaringan Transportasi",
    file: "jaringan_jalan.json",
    type: "line",
    color: "#ef4444",
    weight: 2,
    defaultOn: false,
    primaryField: "Fungsi_Jalan"
  },
  {
    id: "sungai",
    label: "Sungai",
    category: "Perairan",
    file: "Sungai.json",
    type: "line",
    color: "#0ea5e9",
    weight: 2,
    defaultOn: false,
    primaryField: "Nama_Wilayah_Sungai"
  },
  {
    id: "rtrw",
    label: "RTRW Pola Ruang",
    category: "Rencana Tata Ruang",
    file: "rtrw_pola_ruang.json",
    type: "pola",
    defaultOn: false
  },
  {
    id: "rdtr_lasem",
    label: "RDTR Pola Ruang Perkotaan Lasem",
    category: "Rencana Tata Ruang",
    file: "rdtr_lasem.json",
    type: "pola",
    defaultOn: false
  },
];

const basemaps = [
  {
    id: "osm",
    label: "OpenStreetMap",
    shortLabel: "OSM",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OSM contributors",
    thumbnail: "/assets/map/OSM.jpg"
  },
  {
    id: "google_road",
    label: "Google Maps",
    shortLabel: "Maps",
    url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    attribution: "© Google",
    thumbnail: "/assets/map/Maps.jpg"
  },
  {
    id: "google_sat",
    label: "Google Satellite",
    shortLabel: "Satelit",
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    attribution: "© Google",
    thumbnail: "/assets/map/Satellite.jpg"
  },
  {
    id: "google_hybrid",
    label: "Google Hybrid",
    shortLabel: "Hybrid",
    url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    attribution: "© Google",
    thumbnail: "/assets/map/Hybrid.jpg"
  },
];

const PetaInteraktif = () => {
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const geoJsonLayersRef = useRef<Record<string, any>>({});
  const searchMarkerRef = useRef<any>(null);
  const measureLayersRef = useRef<any[]>([]);
  const tempLineRef = useRef<any>(null);
  const measureHandlersRef = useRef<{ finalize: () => void, clear: () => void } | null>(null);

  const [panelOpen, setPanelOpen] = useState(true);
  const [activeL, setActiveL] = useState(() => layers.filter((l) => l.defaultOn).map((l) => l.id));
  const [activeBasemap, setActiveBasemap] = useState("osm");
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState({ lat: -6.7167, lng: 111.3500 });
  const [L, setL] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, lat: number, lng: number } | null>(null);
  const [switcherExpanded, setSwitcherExpanded] = useState(false);
  const [measureTool, setMeasureTool] = useState<'distance' | 'area' | 'none'>('none');
  const [measureResult, setMeasureResult] = useState<string | null>(null);

  const [selectedFeature, setSelectedFeature] = useState<{ properties: any, layer: any, config: any } | null>(null);
  const [infoPanelOpen, setInfoPanelOpen] = useState(false);
  const [downloadPanelOpen, setDownloadPanelOpen] = useState(false);
  const [printPanelOpen, setPrintPanelOpen] = useState(false);
  const [mapTitle, setMapTitle] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSelectingArea, setIsSelectingArea] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{ startX: number, startY: number, endX: number, endY: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [capturedAreaImage, setCapturedAreaImage] = useState<string | null>(null);

  const lastSelectedLayerRef = useRef<any>(null);
  const resetSelectionRef = useRef<(() => void) | null>(null);

  // Compliance Check State
  const [complianceMode, setComplianceMode] = useState<'none' | 'point' | 'polygon'>('none');
  const [complianceZona, setComplianceZona] = useState<Regulation | null>(null);
  const [isCompliancePanelOpen, setIsCompliancePanelOpen] = useState(false);
  const complianceLayersRef = useRef<any[]>([]);

  // Styling & Category State
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const [activeStyleLayerID, setActiveStyleLayerID] = useState<string | null>(null);
  const [activeLabels, setActiveLabels] = useState<Set<string>>(new Set());
  const [featureStyles, setFeatureStyles] = useState<Record<string, { fillColor?: string, strokeColor?: string }>>({}); // Key: "layerID|primaryFieldValue"
  const [layerStyles, setLayerStyles] = useState<Record<string, { fillColor: string, strokeColor: string, weight: number, opacity: number }>>(() => {
    const initialStyles: Record<string, any> = {};
    layers.forEach(l => {
      initialStyles[l.id] = {
        fillColor: l.color || "#1F5E3B",
        strokeColor: l.color || "#1F5E3B",
        weight: l.weight || 2,
        opacity: l.type === "polygon" ? 0.2 : 0.8
      };
    });
    return initialStyles;
  });

  const toggleCategory = (cat: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const toggleLabels = (id: string) => {
    setActiveLabels(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Define reset selection logic
  const resetSelection = () => {
    setInfoPanelOpen(false);
    if (lastSelectedLayerRef.current) {
      const prevLayer = lastSelectedLayerRef.current.layer;
      const prevConfig = lastSelectedLayerRef.current.config;
      const currentStyle = layerStyles[prevConfig.id];
      const pField = prevConfig.primaryField;
      const pValue = pField ? prevLayer.feature.properties[pField] : null;
      const fKey = pValue ? `${prevConfig.id}|${pValue}` : null;
      const indStyle = fKey ? featureStyles[fKey] : null;

      if (prevConfig.type === "pola") {
        const obj = prevLayer.feature.properties.NAMOBJ || prevLayer.feature.properties.pola_ruang || "";
        const color = obj.toLowerCase().includes("hutan") ? "#15803d" :
          obj.toLowerCase().includes("sawah") ? "#86efac" :
            obj.toLowerCase().includes("permukiman") ? "#fbbf24" :
              obj.toLowerCase().includes("industri") ? "#94a3b8" : "#94a3b8";
        prevLayer.setStyle({ color: "#334155", weight: 0.5, fillColor: color, fillOpacity: currentStyle?.opacity || 0.5 });
      } else {
        prevLayer.setStyle({
          color: indStyle?.strokeColor || currentStyle?.strokeColor || prevConfig.color,
          fillColor: indStyle?.fillColor || currentStyle?.fillColor || prevConfig.color,
          weight: currentStyle?.weight || prevConfig.weight,
          fillOpacity: prevConfig.type === "polygon" ? (currentStyle?.opacity || 0.2) : 1
        });
      }
      lastSelectedLayerRef.current = null;
    }
  };

  useEffect(() => {
    resetSelectionRef.current = resetSelection;
  }, [resetSelection]);

  useEffect(() => {
    let cancelled = false;
    const initMap = async () => {
      const leaflet = (await import("leaflet")).default;
      if (cancelled || !mapRef.current || mapInstance.current) return;

      setL(leaflet);

      const map = leaflet.map(mapRef.current, {
        center: [-6.7167, 111.3500],
        zoom: 12,
        maxZoom: 22,
        zoomControl: true,
        preferCanvas: true, // Force canvas renderer for better capture alignment
        zoomSnap: 0, // Allow fractional zoom levels for extreme smoothness
        zoomDelta: 0.25, // Smaller steps for zoom buttons
        wheelPxPerZoomLevel: 120, // Slower mouse wheel zoom
        wheelDebounceTime: 40, // More responsive wheel but smoother
      });

      // Scale bar
      leaflet.control.scale({ imperial: false }).addTo(map);

      map.on("mousemove", (e: any) => {
        setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      });

      map.on("contextmenu", (e: any) => {
        setContextMenu({
          x: e.containerPoint.x,
          y: e.containerPoint.y,
          lat: e.latlng.lat,
          lng: e.latlng.lng
        });
      });

      map.on("click", (e: any) => {
        setContextMenu(null);
        // Deselect if clicking on map background
        if (resetSelectionRef.current) {
          resetSelectionRef.current();
        }
        setDownloadPanelOpen(false); // Close download panel on map click
        setPrintPanelOpen(false); // Close print panel on map click
      });

      mapInstance.current = map;
      setTimeout(() => setLoading(false), 800);
    };

    initMap();

    // Measurement click handler helper
    const handleMapClickForMeasure = (e: any) => {
      // This will be handled inside a dedicated effect for measureTool
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      // Invalidate size of leaflet map after container size change
      if (mapInstance.current) {
        setTimeout(() => {
          mapInstance.current.invalidateSize();
        }, 100);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      cancelled = true;
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Effect to invalidate map size when panel toggles, fullscreen changes, or navbar toggles
  useEffect(() => {
    if (mapInstance.current) {
      setTimeout(() => {
        mapInstance.current.invalidateSize();
      }, 300); // Wait for transitions
    }
  }, [panelOpen, isFullscreen, isNavbarVisible]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      }
    } else {
      document.exitFullscreen();
    }
  };

  const performSearch = () => {
    if (searchQuery.includes(",") && L) {
      const parts = searchQuery.split(",").map(part => parseFloat(part.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        const [lat, lng] = parts;
        if (mapInstance.current) {
          mapInstance.current.setView([lat, lng], 16);

          // Add or move marker with teardrop pin shape
          if (searchMarkerRef.current) {
            searchMarkerRef.current.setLatLng([lat, lng]);
          } else {
            const greenMarker = L.divIcon({
              className: "custom-div-icon",
              html: `
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 4px rgba(0,0,0,0.4));">
                  <path d="M12 21.7C12 21.7 20 15.4 20 10C20 5.58 16.42 2 12 2C7.58 2 4 5.58 4 10C4 15.4 12 21.7 12 21.7Z" fill="#1F5E3B" stroke="white" stroke-width="1.5"/>
                  <circle cx="12" cy="10" r="3" fill="white"/>
                </svg>
              `,
              iconSize: [32, 32],
              iconAnchor: [16, 32]
            });
            searchMarkerRef.current = L.marker([lat, lng], { icon: greenMarker }).addTo(mapInstance.current);
          }
        }
      }
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Berhasil disalin",
      description: `Koordinat ${text} telah disalin ke clipboard.`,
    });
    setContextMenu(null);
  };

  const openInGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    setContextMenu(null);
  };

  // Effect to handle basemap changes
  useEffect(() => {
    if (!mapInstance.current || !L) return;

    const basemap = basemaps.find(b => b.id === activeBasemap);
    if (!basemap) return;

    if (tileLayerRef.current) {
      mapInstance.current.removeLayer(tileLayerRef.current);
    }

    tileLayerRef.current = L.tileLayer(basemap.url, {
      attribution: basemap.attribution,
      maxNativeZoom: 18,
      maxZoom: 22,
    }).addTo(mapInstance.current);

  }, [activeBasemap, L]);

  // Handle Loading/Unloading GeoJSON layers
  useEffect(() => {
    if (!mapInstance.current || !L) return;

    const loadGeoJSON = async (layerConfig: typeof layers[0]) => {
      try {
        const response = await fetch(`/data/map/${layerConfig.file}`);
        if (!response.ok) throw new Error(`Could not load ${layerConfig.file}`);
        const data = await response.json();

        const geoJsonLayer = L.geoJSON(data, {
          style: (feature: any) => {
            const currentStyle = layerStyles[layerConfig.id];
            const pField = (layerConfig as any).primaryField;
            const pValue = pField ? feature.properties[pField] : null;
            const fKey = pValue ? `${layerConfig.id}|${pValue}` : null;
            const indStyle = fKey ? featureStyles[fKey] : null;

            if (layerConfig.type === "pola") {
              const obj = feature.properties.NAMOBJ || feature.properties.pola_ruang || "";
              const color = obj.toLowerCase().includes("hutan") ? "#15803d" :
                obj.toLowerCase().includes("sawah") ? "#86efac" :
                  obj.toLowerCase().includes("permukiman") ? "#fbbf24" :
                    obj.toLowerCase().includes("industri") ? "#94a3b8" : "#94a3b8";
              return { color: "#334155", weight: 0.5, fillColor: color, fillOpacity: currentStyle?.opacity || 0.5 };
            }
            return {
              color: indStyle?.strokeColor || currentStyle?.strokeColor || layerConfig.color,
              weight: currentStyle?.weight || layerConfig.weight,
              fillColor: indStyle?.fillColor || currentStyle?.fillColor || layerConfig.color,
              fillOpacity: layerConfig.type === "polygon" ? (currentStyle?.opacity || 0.2) : 1
            };
          },
          onEachFeature: (feature: any, layer: any) => {
            // Add Label if enabled
            if (activeLabels.has(layerConfig.id) && layerConfig.primaryField) {
              const name = feature.properties[layerConfig.primaryField];
              if (name) {
                // Always use bounds center for consistent positioning
                const center = layer.getBounds().getCenter();
                layer.bindTooltip(name, {
                  permanent: true,
                  direction: 'center',
                  className: 'map-label-tooltip',
                  offset: [0, 0]
                });
                // Force open at bounds center
                layer.openTooltip(center);
              }
            }

            layer.on({
              click: (e: any) => {
                L.DomEvent.stopPropagation(e);

                // Reset previous selection style
                if (resetSelectionRef.current) resetSelectionRef.current();

                // Apply Selection Style
                layer.setStyle({
                  color: "#D4A017", // Gold/Selection color
                  weight: 4,
                  fillOpacity: 0.4
                });

                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                  layer.bringToFront();
                }

                lastSelectedLayerRef.current = { layer, config: layerConfig };
                setSelectedFeature({ properties: feature.properties, layer, config: layerConfig });
                setInfoPanelOpen(true);
              }
            });
          }
        }).addTo(mapInstance.current);

        geoJsonLayersRef.current[layerConfig.id] = geoJsonLayer;
      } catch (err) {
        console.warn(`Failed to load GeoJSON: ${layerConfig.file}`, err);
      }
    };

    // Remove layers that are no longer active
    Object.keys(geoJsonLayersRef.current).forEach(id => {
      if (!activeL.includes(id)) {
        mapInstance.current.removeLayer(geoJsonLayersRef.current[id]);
        delete geoJsonLayersRef.current[id];
      }
    });

    // Add layers that are newly active
    activeL.forEach(id => {
      if (!geoJsonLayersRef.current[id]) {
        const config = layers.find(l => l.id === id);
        if (config) loadGeoJSON(config);
      }
    });

  }, [activeL, L, resetSelection, layerStyles, activeLabels]);

  // Handle Label Visibility Changes
  useEffect(() => {
    if (!mapInstance.current || !L) return;

    Object.entries(geoJsonLayersRef.current).forEach(([id, geoJsonLayer]) => {
      const config = layers.find(l => l.id === id);
      if (!config) return;

      const shouldShow = activeLabels.has(id);

      geoJsonLayer.eachLayer((layer: any) => {
        if (shouldShow && config.primaryField) {
          const name = layer.feature.properties[config.primaryField];
          if (name) {
            const center = layer.getBounds().getCenter();
            if (!layer.getTooltip()) {
              layer.bindTooltip(name, {
                permanent: true,
                direction: 'center',
                className: 'map-label-tooltip',
                offset: [0, 0]
              });
            }
            layer.openTooltip(center);
          }
        } else if (!shouldShow) {
          layer.closeTooltip();
        }
      });
    });
  }, [activeLabels, L]);

  // Handle Dynamic Re-styling when layerStyles change
  useEffect(() => {
    if (!mapInstance.current || !L) return;

    Object.entries(geoJsonLayersRef.current).forEach(([id, geoJsonLayer]) => {
      const style = layerStyles[id];
      const config = layers.find(l => l.id === id);
      if (!style || !config) return;

      geoJsonLayer.eachLayer((layer: any) => {
        // Don't override if currently selected
        if (lastSelectedLayerRef.current?.layer === layer) return;

        const pField = config.primaryField;
        const pValue = pField ? layer.feature.properties[pField] : null;
        const fKey = pValue ? `${config.id}|${pValue}` : null;
        const indStyle = fKey ? featureStyles[fKey] : null;

        if (config.type === "pola") {
          const obj = layer.feature.properties.NAMOBJ || layer.feature.properties.pola_ruang || "";
          const color = obj.toLowerCase().includes("hutan") ? "#15803d" :
            obj.toLowerCase().includes("sawah") ? "#86efac" :
              obj.toLowerCase().includes("permukiman") ? "#fbbf24" :
                obj.toLowerCase().includes("industri") ? "#94a3b8" : "#94a3b8";
          layer.setStyle({ fillOpacity: style.opacity });
        } else {
          layer.setStyle({
            color: indStyle?.strokeColor || style.strokeColor,
            weight: style.weight,
            fillColor: indStyle?.fillColor || style.fillColor,
            fillOpacity: config.type === "polygon" ? style.opacity : 1
          });
        }
      });
    });
  }, [layerStyles, L, featureStyles]);

  const toggleLayer = (id: string) => {
    setActiveL((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  // Effect to handle measurement logic
  useEffect(() => {
    if (!mapInstance.current || !L || measureTool === 'none') return;

    const map = mapInstance.current;
    let points: any[] = [];
    let isFinished = false;

    const calculatePolygonArea = (latlngs: any[]) => {
      const radius = 6378137;
      const len = latlngs.length;
      let area = 0;
      if (len > 2) {
        for (let i = 0; i < len; i++) {
          const p1 = latlngs[i];
          const p2 = latlngs[(i + 1) % len];
          area += (p2.lng - p1.lng) * (2 + Math.sin(p1.lat * Math.PI / 180) + Math.sin(p2.lat * Math.PI / 180));
        }
        area = area * radius * radius / 2;
      }
      return Math.abs(area);
    };

    const updateMeasureResult = () => {
      if (points.length < 2) return null;
      let res: { unit: string, val: string }[] = [];

      if (measureTool === "distance") {
        let total = 0;
        for (let i = 0; i < points.length - 1; i++) {
          total += points[i].distanceTo(points[i + 1]);
        }
        res.push({ unit: "Meter", val: `${total.toFixed(2)} m` });
        res.push({ unit: "Kilometer", val: `${(total / 1000).toFixed(3)} km` });
      } else if (measureTool === "area" && points.length >= 3) {
        const area = Math.abs(L.GeometryUtil ? L.GeometryUtil.geodesicArea(points) : calculatePolygonArea(points));
        res.push({ unit: "Mtr Persegi", val: `${area.toFixed(2)} m²` });
        res.push({ unit: "KM Persegi", val: `${(area / 1000000).toFixed(4)} km²` });
        res.push({ unit: "Hektar", val: `${(area / 10000).toFixed(3)} ha` });
      }
      if (res.length > 0) setMeasureResult(res[0].val);
      return res;
    };

    const clearMeasure = () => {
      measureLayersRef.current.forEach(layer => map.removeLayer(layer));
      measureLayersRef.current = [];
      if (tempLineRef.current) {
        map.removeLayer(tempLineRef.current);
        tempLineRef.current = null;
      }
      points = [];
      setMeasureResult(null);
      isFinished = false;
    };

    const finalizeMeasure = () => {
      if (isFinished || points.length < 2) return;
      isFinished = true;
      if (tempLineRef.current) {
        map.removeLayer(tempLineRef.current);
        tempLineRef.current = null;
      }

      const lastPoint = points[points.length - 1];
      const results = updateMeasureResult();
      if (results) {
        let content = `<div class="p-1 min-w-[140px]">
          <div style="font-weight: 900; font-size: 10px; color: #1F5E3B; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; margin-bottom: 8px;">Hasil ${measureTool === 'distance' ? 'Jarak' : 'Luas'}</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">`;
        results.forEach(res => {
          content += `<div style="display: flex; justify-content: space-between; align-items: baseline; gap: 12px;">
            <span style="font-size: 9px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">${res.unit}</span>
            <span style="font-size: 12px; font-weight: 900; color: #1e293b;">${res.val}</span>
          </div>`;
        });
        content += `</div></div>`;

        const popup = L.popup({ closeButton: true, autoClose: false, className: 'measure-result-popup' })
          .setLatLng(lastPoint)
          .setContent(content)
          .openOn(map);
        measureLayersRef.current.push(popup);
      }
      setContextMenu(null);
    };

    measureHandlersRef.current = { finalize: finalizeMeasure, clear: clearMeasure };

    const onMapClick = (e: any) => {
      if (isFinished) return;
      const latlng = e.latlng;
      if (points.length > 0 && points[points.length - 1].equals(latlng)) return;

      points.push(latlng);
      const marker = L.circleMarker(latlng, { radius: 4, fillColor: "#1F5E3B", color: "#fff", weight: 2, fillOpacity: 1 }).addTo(map);
      measureLayersRef.current.push(marker);

      if (measureTool === 'distance' && points.length > 1) {
        const line = L.polyline([points[points.length - 2], points[points.length - 1]], { color: "#1F5E3B", weight: 3, dashArray: '5, 5' }).addTo(map);
        measureLayersRef.current.push(line);
      } else if (measureTool === 'area') {
        const poly = measureLayersRef.current.find(l => l instanceof L.Polygon);
        if (poly) map.removeLayer(poly);
        if (points.length >= 3) {
          const polygon = L.polygon(points, { color: "#1F5E3B", fillColor: "#1F5E3B", fillOpacity: 0.2, weight: 3, dashArray: '5, 5' }).addTo(map);
          measureLayersRef.current.push(polygon);
        }
      }
      updateMeasureResult();
    };

    const onMouseMove = (e: any) => {
      if (points.length === 0 || isFinished) return;
      const latlng = e.latlng;
      if (tempLineRef.current) map.removeLayer(tempLineRef.current);

      if (measureTool === 'distance') {
        tempLineRef.current = L.polyline([points[points.length - 1], latlng], { color: "#1F5E3B", weight: 2, dashArray: '5, 5', opacity: 0.5 }).addTo(map);
      } else if (measureTool === 'area' && points.length >= 2) {
        tempLineRef.current = L.polyline([...points, latlng], { color: "#1F5E3B", fillColor: "#1F5E3B", fillOpacity: 0.1, weight: 2, dashArray: '5, 5', opacity: 0.5 }).addTo(map);
      }
    };

    const onDblClick = (e: any) => { L.DomEvent.stopPropagation(e); finalizeMeasure(); };
    const onKeyDown = (e: any) => {
      if (e.key === 'Enter') finalizeMeasure();
      if (e.key === 'Escape') setMeasureTool('none');
    };

    map.on('click', onMapClick);
    map.on('mousemove', onMouseMove);
    map.on('dblclick', onDblClick);
    window.addEventListener('keydown', onKeyDown);
    map.getContainer().style.cursor = 'crosshair';

    return () => {
      map.off('click', onMapClick);
      map.off('mousemove', onMouseMove);
      map.off('dblclick', onDblClick);
      window.removeEventListener('keydown', onKeyDown);
      map.getContainer().style.cursor = '';
      clearMeasure();
    };
  }, [measureTool, L]);

  // Effect to handle spatial compliance check tool
  useEffect(() => {
    if (!mapInstance.current || !L || complianceMode === 'none') return;

    const map = mapInstance.current;
    let points: any[] = [];
    let isFinished = false;

    const clearComplianceSelection = () => {
      complianceLayersRef.current.forEach(layer => map.removeLayer(layer));
      complianceLayersRef.current = [];
      if (tempLineRef.current) {
        map.removeLayer(tempLineRef.current);
        tempLineRef.current = null;
      }
      points = [];
      isFinished = false;
    };

    const finalizeCompliance = async () => {
      if (isFinished || points.length === 0) return;
      isFinished = true;

      if (tempLineRef.current) {
        map.removeLayer(tempLineRef.current);
        tempLineRef.current = null;
      }

      toast({ title: "Mengidentifikasi Zona", description: "Sedang menganalisis koordinat..." });

      try {
        const zona = await identifikasiZona(points.length === 1 ? points[0] : points);
        setComplianceZona(zona);
        setIsCompliancePanelOpen(true);
      } catch (err) {
        toast({ title: "Gagal", description: "Tidak dapat mengidentifikasi zona di lokasi ini.", variant: "destructive" });
      }

      setComplianceMode('none');
    };

    const onMapClick = (e: any) => {
      if (isFinished) return;
      const latlng = e.latlng;
      points.push(latlng);

      if (complianceMode === 'point') {
        const marker = L.circleMarker(latlng, { radius: 8, fillColor: "#D4A017", color: "#fff", weight: 3, fillOpacity: 0.8 }).addTo(map);
        complianceLayersRef.current.push(marker);
        finalizeCompliance();
      } else if (complianceMode === 'polygon') {
        const marker = L.circleMarker(latlng, { radius: 4, fillColor: "#D4A017", color: "#fff", weight: 2, fillOpacity: 1 }).addTo(map);
        complianceLayersRef.current.push(marker);

        const poly = complianceLayersRef.current.find(l => l instanceof L.Polygon);
        if (poly) map.removeLayer(poly);

        if (points.length >= 3) {
          const polygon = L.polygon(points, { color: "#D4A017", fillColor: "#D4A017", fillOpacity: 0.2, weight: 3, dashArray: '5, 5' }).addTo(map);
          complianceLayersRef.current.push(polygon);
        } else if (points.length === 2) {
          const line = L.polyline(points, { color: "#D4A017", weight: 3, dashArray: '5, 5' }).addTo(map);
          complianceLayersRef.current.push(line);
        }
      }
    };

    const onMouseMove = (e: any) => {
      if (points.length === 0 || isFinished || complianceMode !== 'polygon') return;
      const latlng = e.latlng;
      if (tempLineRef.current) map.removeLayer(tempLineRef.current);
      tempLineRef.current = L.polyline([...points, latlng], { color: "#D4A017", weight: 2, dashArray: '5, 5', opacity: 0.5 }).addTo(map);
    };

    const onDblClick = (e: any) => {
      if (complianceMode === 'polygon') {
        L.DomEvent.stopPropagation(e);
        finalizeCompliance();
      }
    };

    const onKeyDown = (e: any) => {
      if (e.key === 'Enter') finalizeCompliance();
      if (e.key === 'Escape') setComplianceMode('none');
    };

    map.on('click', onMapClick);
    map.on('mousemove', onMouseMove);
    map.on('dblclick', onDblClick);
    window.addEventListener('keydown', onKeyDown);
    map.getContainer().style.cursor = 'help';

    return () => {
      map.off('click', onMapClick);
      map.off('mousemove', onMouseMove);
      map.off('dblclick', onDblClick);
      window.removeEventListener('keydown', onKeyDown);
      map.getContainer().style.cursor = '';
      clearComplianceSelection();
    };
  }, [complianceMode, L]);

  const activeLayerConfig = activeStyleLayerID ? layers.find(l => l.id === activeStyleLayerID) : null;
  const currentLayerStyle = activeStyleLayerID ? layerStyles[activeStyleLayerID] : null;

  const handleStyleChange = (key: 'fillColor' | 'strokeColor' | 'weight' | 'opacity', value: string | number) => {
    if (!activeStyleLayerID) return;
    setLayerStyles(prev => ({
      ...prev,
      [activeStyleLayerID]: {
        ...prev[activeStyleLayerID],
        [key]: value
      }
    }));

    // If global colors change, clear all individual overrides for this layer
    if (key === 'fillColor' || key === 'strokeColor') {
      setFeatureStyles(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(k => {
          if (k.startsWith(`${activeStyleLayerID}|`)) {
            delete next[k];
          }
        });
        return next;
      });
    }
  };

  const handleFeatureStyleChange = (key: 'fillColor' | 'strokeColor', color: string) => {
    if (!selectedFeature) return;
    const config = selectedFeature.config;
    const pField = config.primaryField;
    const pValue = pField ? selectedFeature.properties[pField] : null;

    if (pValue) {
      const fKey = `${config.id}|${pValue}`;
      setFeatureStyles(prev => ({
        ...prev,
        [fKey]: { ...prev[fKey], [key]: color }
      }));
    }
  };

  const captureSelectedArea = async () => {
    if (!selectionBox || !mapRef.current) return;

    setIsPrinting(true);
    const { startX, startY, endX, endY } = selectionBox;
    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    if (width < 10 || height < 10) {
      setIsSelectingArea(false);
      setSelectionBox(null);
      setIsPrinting(false);
      return;
    }

    try {
      // Hide controls for capture
      const controls = mapRef.current.querySelectorAll('.leaflet-control-container');
      controls.forEach((c: any) => c.style.display = 'none');

      const canvas = await html2canvas(mapRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        scale: 4, // Higher res for selection
        x: x,
        y: y,
        width: width,
        height: height
      });

      controls.forEach((c: any) => c.style.display = '');

      setCapturedAreaImage(canvas.toDataURL('image/jpeg', 0.9));
      setIsSelectingArea(false);
      setSelectionBox(null);
      setPrintPanelOpen(true);
    } catch (err) {
      console.error("Capture failed", err);
      toast({ title: "Gagal", description: "Terjadi kesalahan saat menangkap area peta.", variant: "destructive" });
    } finally {
      setIsPrinting(false);
    }
  };



  const handleDownloadLayer = (layer: any) => {
    const link = document.createElement('a');
    link.href = `/data/map/${layer.file}`;
    link.download = layer.file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Memulai Unduhan",
      description: `Mengunduh file ${layer.label}...`,
    });
  };

  const handlePrint = async (format: 'pdf' | 'jpg') => {
    if (!capturedAreaImage) return;
    setIsPrinting(true);
    toast({ title: "Memproses Peta", description: "Sedang menyiapkan layout peta..." });

    try {
      // 2. Create Layout Container (Invisible)
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.width = '1200px';
      container.style.height = '800px';
      container.style.backgroundColor = 'white';
      container.style.display = 'flex';
      container.style.fontFamily = 'Arial, sans-serif';
      document.body.appendChild(container);

      // 3. Build Layout Content
      // Left: Map
      const mapWrapper = document.createElement('div');
      mapWrapper.style.width = '75%';
      mapWrapper.style.height = '100%';
      mapWrapper.style.padding = '20px';
      mapWrapper.style.backgroundColor = 'white';
      mapWrapper.style.display = 'flex';
      mapWrapper.style.alignItems = 'center';
      mapWrapper.style.justifyContent = 'center';
      container.appendChild(mapWrapper);

      const mapImg = document.createElement('img');
      mapImg.src = capturedAreaImage;
      mapImg.style.width = '100%';
      mapImg.style.height = '100%';
      mapImg.style.objectFit = 'contain'; // Better for custom selections
      mapImg.style.border = '2px solid #1F5E3B';
      mapImg.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      mapWrapper.appendChild(mapImg);

      // (Rest of the print logic remains similar, using capturedAreaImage)
      // Right: Sidebar
      const sidebar = document.createElement('div');
      sidebar.style.width = '25%';
      sidebar.style.height = '100%';
      sidebar.style.padding = '20px';
      sidebar.style.borderLeft = '4px solid #1F5E3B';
      sidebar.style.backgroundColor = '#f8fafc';
      sidebar.style.display = 'flex';
      sidebar.style.flexDirection = 'column';
      sidebar.style.gap = '20px';
      container.appendChild(sidebar);

      // Header (Logos & Title)
      const header = document.createElement('div');
      header.style.textAlign = 'center';
      header.style.borderBottom = '2px solid #e2e8f0';
      header.style.paddingBottom = '15px';

      const logo = document.createElement('img');
      logo.src = '/og-image.png'; // Updated to og-image.png from public folder
      logo.style.height = '80px'; // Slightly larger for clarity
      logo.style.display = 'block';
      logo.style.margin = '0 auto 15px auto'; // Centered with bottom margin
      header.appendChild(logo);

      const title1 = document.createElement('h3');
      title1.innerText = "PEMERINTAH KABUPATEN REMBANG";
      title1.style.fontSize = '12px';
      title1.style.fontWeight = 'bold';
      title1.style.margin = '0 0 4px 0';
      title1.style.color = '#334155';
      header.appendChild(title1);

      const title2 = document.createElement('h2');
      title2.innerText = "SIMTARU 2026";
      title2.style.fontSize = '16px';
      title2.style.fontWeight = '900';
      title2.style.margin = '0';
      title2.style.color = '#1F5E3B';
      title2.style.letterSpacing = '1px';
      header.appendChild(title2);

      sidebar.appendChild(header);

      // Map Title
      const mapTitleEl = document.createElement('div');
      mapTitleEl.innerHTML = `
        <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; font-weight: bold;">JUDUL PETA</div>
        <div style="font-size: 14px; font-weight: 800; color: #0f172a; margin-top: 4px; line-height: 1.4;">${mapTitle || "PETA TANPA JUDUL"}</div>
      `;
      sidebar.appendChild(mapTitleEl);

      // Legend
      const legendEl = document.createElement('div');
      legendEl.style.flex = '1';
      legendEl.style.overflow = 'hidden';
      legendEl.style.display = 'flex';
      legendEl.style.flexDirection = 'column';

      let legendHtml = `<div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; font-weight: bold; margin-bottom: 8px;">LEGENDA / KETERANGAN</div>`;
      legendHtml += `<div style="display: flex; flex-direction: column; gap: 8px;">`;

      // Iterate active layers for legend
      activeL.forEach(id => {
        const l = layers.find(lay => lay.id === id);
        const style = layerStyles[id];
        if (l && style) {
          const isLine = l.type === 'line';
          legendHtml += `
            <div style="display: flex; align-items: center; gap: 10px;">
               ${isLine ?
              `<div style="width: 20px; height: 0; border-top: 3px solid ${style.strokeColor}; flex-shrink: 0;"></div>` :
              `<div style="width: 20px; height: 12px; border: 1px solid ${style.strokeColor}; flex-shrink: 0; position: relative; overflow: hidden; display: flex;">
                    <div style="position: absolute; inset: 0; background-color: ${style.fillColor}; opacity: ${style.opacity};"></div>
                  </div>`
            }
               <div style="display: flex; flex-direction: column;">
                  <div style="font-size: 11px; font-weight: bold; color: #334155; line-height: 1;">${l.label}</div>
                  <div style="font-size: 8px; color: #64748b; margin-top: 2px;">${l.category}</div>
               </div>
            </div>
          `;
        }
      });
      legendHtml += `</div>`;
      legendEl.innerHTML = legendHtml;
      sidebar.appendChild(legendEl);

      // Footer (Source & Date)
      const footer = document.createElement('div');
      footer.style.borderTop = '2px solid #e2e8f0';
      footer.style.paddingTop = '15px';
      footer.style.fontSize = '9px';
      footer.style.color = '#64748b';

      const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      footer.innerHTML = `
        <div style="margin-bottom: 4px;"><strong>SUMBER:</strong> SIMTARU Kab. Rembang</div>
        <div><strong>DICETAK:</strong> ${date}</div>
      `;
      sidebar.appendChild(footer);

      // 4. Capture Final Layout
      const finalCanvas = await html2canvas(container, {
        scale: 3, // Very High Quality for final output
        useCORS: true,
        allowTaint: true
      });

      // 5. Save Output
      if (format === 'jpg') {
        const link = document.createElement('a');
        link.download = `Peta-SIMTARU-${Date.now()}.jpg`;
        link.href = finalCanvas.toDataURL('image/jpeg', 0.9);
        link.click();
      } else {
        // PDF
        const imgData = finalCanvas.toDataURL('image/jpeg', 0.9);
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [1200, 800] // Match container size
        });
        pdf.addImage(imgData, 'JPEG', 0, 0, 1200, 800);
        pdf.save(`Peta-SIMTARU-${Date.now()}.pdf`);
      }

      // Cleanup
      document.body.removeChild(container);
      toast({ title: "Berhasil", description: "Peta berhasil dicetak." });

    } catch (err) {
      console.error(err);
      toast({ title: "Gagal", description: "Terjadi kesalahan saat mencetak peta.", variant: "destructive" });
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <Layout hideFooter hideNavbar={isFullscreen || !isNavbarVisible}>
      <div ref={containerRef} className={`relative flex transition-all duration-200 ${(isFullscreen || !isNavbarVisible) ? "h-screen w-screen bg-slate-100" : "h-[calc(100vh-80px)] md:h-[calc(100vh-64px)]"}`}>
        {/* Mobile Sidebar Backdrop */}
        {panelOpen && (
          <div
            className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm transition-opacity md:hidden"
            onClick={() => setPanelOpen(false)}
          />
        )}

        {/* Side panel */}
        <div className={`absolute md:relative z-[1001] h-full flex-shrink-0 border-r bg-card transition-all duration-300 ease-in-out ${panelOpen ? "w-[280px] sm:w-80 md:w-72 translate-x-0" : "w-0 -translate-x-full md:translate-x-0 overflow-hidden"}`}>
          <div className="p-4 space-y-2 overflow-y-auto h-full custom-scrollbar bg-slate-50/30">
            {["Batas Administrasi", "Jaringan Transportasi", "Perairan", "Rencana Tata Ruang"].map((cat) => {
              const isOpen = !collapsedCategories.has(cat);
              const catLayers = layers.filter(l => l.category === cat);
              return (
                <div key={cat} className="mb-2">
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="flex w-full items-center justify-between py-3 px-2 rounded-xl hover:bg-slate-100/80 transition-all group"
                  >
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A017]">
                      {cat}
                    </h2>
                    <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-300 ${isOpen ? "" : "-rotate-90"}`} />
                  </button>

                  <div className={`space-y-1 transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    {catLayers.map((l) => (
                      <div key={l.id} className="group relative mb-1 last:mb-0">
                        <div className={`flex flex-col p-2.5 rounded-2xl transition-all ${activeL.includes(l.id) ? "bg-white shadow-sm ring-1 ring-slate-100/50" : "hover:bg-slate-100/30"}`}>
                          <label className="flex cursor-pointer items-start gap-3">
                            <Checkbox
                              checked={activeL.includes(l.id)}
                              onCheckedChange={() => toggleLayer(l.id)}
                              className="mt-0.5 border-slate-300 data-[state=checked]:bg-[#1F5E3B] data-[state=checked]:border-[#1F5E3B]"
                            />
                            <span className={`text-[12px] font-bold leading-tight transition-colors ${activeL.includes(l.id) ? "text-[#1F5E3B]" : "text-slate-600 group-hover:text-slate-800"}`}>
                              {l.label}
                            </span>
                          </label>

                          {activeL.includes(l.id) && (
                            <div className="mt-2 flex flex-col gap-2 pl-7 animate-in fade-in slide-in-from-top-1 duration-200">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveStyleLayerID(activeStyleLayerID === l.id ? null : l.id);
                                  }}
                                  className="h-5 w-10 bg-slate-100 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden"
                                  title="Pengaturan Gaya"
                                >
                                  <div className="flex h-full w-full">
                                    <div className="flex-1 h-full" style={{ backgroundColor: layerStyles[l.id]?.fillColor }} />
                                    <div className="flex-1 h-full border-l border-white/50" style={{ backgroundColor: layerStyles[l.id]?.strokeColor }} />
                                  </div>
                                </button>
                                <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400">Gaya Layer</span>
                              </div>

                              {l.category === "Batas Administrasi" && (
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    id={`label-${l.id}`}
                                    checked={activeLabels.has(l.id)}
                                    onCheckedChange={() => toggleLabels(l.id)}
                                    className="h-3 w-3 border-slate-300 data-[state=checked]:bg-[#D4A017] data-[state=checked]:border-[#D4A017]"
                                  />
                                  <label htmlFor={`label-${l.id}`} className="text-[9px] font-black uppercase tracking-tighter text-slate-400 cursor-pointer">
                                    Tampilkan Label Nama
                                  </label>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setPanelOpen(!panelOpen)}
          className="absolute left-0 top-1/2 z-[1002] -translate-y-1/2 rounded-r-xl bg-[#1F5E3B] p-2 text-white shadow-2xl transition-all duration-300 hover:pl-4"
          style={{ left: panelOpen ? (window.innerWidth < 768 ? "280px" : "288px") : "0" }}
        >
          {panelOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>

        {/* Map area */}
        <div className="relative flex-1 bg-slate-100 overflow-hidden">
          {/* Map */}
          <div ref={mapRef} className="h-full w-full z-0" />

          {/* Area Selection Overlay */}
          {isSelectingArea && (
            <div
              className="absolute inset-0 z-[10002] cursor-crosshair bg-black/10"
              onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setIsDragging(true);
                setSelectionBox({ startX: x, startY: y, endX: x, endY: y });
              }}
              onMouseMove={(e) => {
                if (!isDragging || !selectionBox) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setSelectionBox(prev => prev ? { ...prev, endX: x, endY: y } : null);
              }}
              onMouseUp={() => {
                setIsDragging(false);
                captureSelectedArea();
              }}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#1F5E3B] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl animate-bounce">
                Tarik Mouse untuk Memilih Area
              </div>

              {selectionBox && (
                <div
                  className="absolute border-2 border-[#D4A017] bg-[#D4A017]/10"
                  style={{
                    left: Math.min(selectionBox.startX, selectionBox.endX),
                    top: Math.min(selectionBox.startY, selectionBox.endY),
                    width: Math.abs(selectionBox.endX - selectionBox.startX),
                    height: Math.abs(selectionBox.endY - selectionBox.startY),
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <div className="absolute -top-6 left-0 text-[10px] font-bold text-[#D4A017] bg-white px-2 py-0.5 rounded shadow-sm">
                    {Math.round(Math.abs(selectionBox.endX - selectionBox.startX))} x {Math.round(Math.abs(selectionBox.endY - selectionBox.startY))} px
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Context Menu */}
          {contextMenu && (
            <div
              className="fixed z-[10000] w-64 rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
              style={{ top: contextMenu.y + (isFullscreen ? 0 : 64), left: contextMenu.x + (panelOpen ? 288 : 0) }}
            >
              <button
                onClick={() => copyToClipboard(`${contextMenu.lat.toFixed(6)}, ${contextMenu.lng.toFixed(6)}`)}
                className="w-full flex flex-col items-start p-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-0.5">
                  <Copy className="h-3 w-3 text-[#1F5E3B]" />
                  Salin Koordinat
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{contextMenu.lat.toFixed(6)}, {contextMenu.lng.toFixed(6)}</span>
              </button>
              <button
                onClick={() => openInGoogleMaps(contextMenu.lat, contextMenu.lng)}
                className="w-full flex items-center gap-2 p-3 text-left hover:bg-slate-50 transition-colors text-xs font-bold text-slate-800"
              >
                <ExternalLink className="h-3 w-3 text-[#1F5E3B]" />
                Buka di Google Maps
              </button>
              {measureTool !== 'none' && (
                <>
                  <button
                    onClick={() => {
                      measureHandlersRef.current?.finalize();
                      setContextMenu(null);
                    }}
                    className="w-full flex items-center gap-2 p-3 text-left hover:bg-emerald-50 transition-colors text-xs font-bold text-emerald-600 border-t border-slate-100"
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    Selesai Mengukur
                  </button>
                  <button
                    onClick={() => {
                      measureHandlersRef.current?.clear();
                      setContextMenu(null);
                    }}
                    className="w-full flex items-center gap-2 p-3 text-left hover:bg-rose-50 transition-colors text-xs font-bold text-rose-600 border-t border-slate-100"
                  >
                    <Trash2 className="h-3 w-3" />
                    Reset Pengukuran
                  </button>
                </>
              )}
            </div>
          )}

          {/* Top bar (Shifted right with ml-12 and updated logic) */}
          <div className="absolute left-4 right-4 top-4 z-[1001] flex flex-col md:flex-row md:items-center justify-between gap-3 pointer-events-none">
            <div className="flex w-full max-w-sm md:ml-12 items-center gap-2 bg-white/95 pl-1 pr-4 py-1 shadow-xl backdrop-blur-md rounded-2xl border border-white/20 pointer-events-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={performSearch}
                className="h-9 w-9 rounded-xl hover:bg-[#1F5E3B]/10 hover:text-[#1F5E3B]"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Cari koordinat (Lat, Lng)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                className="h-10 border-none bg-transparent shadow-none focus-visible:ring-0 text-slate-700 p-0 text-xs md:text-sm"
              />
            </div>

            <div className="flex gap-2 pointer-events-auto self-end md:self-auto overflow-x-auto pb-1 md:pb-0 max-w-full">
              <div className="flex bg-white/90 p-1 shadow-xl backdrop-blur-md rounded-2xl border border-white/20 gap-1">
                <Button
                  size="icon"
                  variant={measureTool === 'distance' ? 'default' : 'ghost'}
                  onClick={() => setMeasureTool(measureTool === 'distance' ? 'none' : 'distance')}
                  className={`h-10 w-10 rounded-xl transition-all ${measureTool === 'distance' ? 'bg-[#1F5E3B] text-white shadow-lg' : 'text-slate-500 hover:text-[#1F5E3B] hover:bg-[#1F5E3B]/10'}`}
                  title="Ukur Jarak"
                >
                  <Ruler className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant={measureTool === 'area' ? 'default' : 'ghost'}
                  onClick={() => setMeasureTool(measureTool === 'area' ? 'none' : 'area')}
                  className={`h-10 w-10 rounded-xl transition-all ${measureTool === 'area' ? 'bg-[#1F5E3B] text-white shadow-lg' : 'text-slate-500 hover:text-[#1F5E3B] hover:bg-[#1F5E3B]/10'}`}
                  title="Ukur Luas"
                >
                  <BoxSelect className="h-5 w-5" />
                </Button>
                <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
                <Button
                  size="icon"
                  variant={complianceMode === 'point' ? 'default' : 'ghost'}
                  onClick={() => {
                    setComplianceMode(complianceMode === 'point' ? 'none' : 'point');
                    if (complianceMode !== 'point') {
                      toast({
                        title: "Cek Kesesuaian (Titik)",
                        description: "Klik pada satu titik di peta untuk mengecek zonasi."
                      });
                    }
                  }}
                  className={`h-10 w-10 rounded-xl transition-all ${complianceMode === 'point' ? 'bg-[#D4A017] text-white shadow-lg' : 'text-slate-500 hover:text-[#D4A017] hover:bg-[#D4A017]/10'}`}
                  title="Cek Kesesuaian (Titik)"
                >
                  <ShieldCheck className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant={complianceMode === 'polygon' ? 'default' : 'ghost'}
                  onClick={() => {
                    setComplianceMode(complianceMode === 'polygon' ? 'none' : 'polygon');
                    if (complianceMode !== 'polygon') {
                      toast({
                        title: "Cek Kesesuaian (Poligon)",
                        description: "Klik beberapa titik untuk membuat area, lalu klik dua kali untuk selesai."
                      });
                    }
                  }}
                  className={`h-10 w-10 rounded-xl transition-all ${complianceMode === 'polygon' ? 'bg-[#D4A017] text-white shadow-lg' : 'text-slate-500 hover:text-[#D4A017] hover:bg-[#D4A017]/10'}`}
                  title="Cek Kesesuaian (Poligon)"
                >
                  <div className="relative">
                    <ShieldCheck className="h-5 w-5" />
                    <BoxSelect className="h-2.5 w-2.5 absolute -bottom-1 -right-1 bg-white rounded-sm text-[#D4A017]" />
                  </div>
                </Button>
              </div>

              <Button
                size="icon"
                variant="outline"
                onClick={() => setIsNavbarVisible(!isNavbarVisible)}
                className="h-12 w-12 rounded-2xl bg-white/90 shadow-xl border-white/20 hover:text-[#1F5E3B]"
                title={isNavbarVisible ? "Sembunyikan Navbar" : "Tampilkan Navbar"}
              >
                {isNavbarVisible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={toggleFullscreen}
                className="h-12 w-12 rounded-2xl bg-white/90 shadow-xl border-white/20 hover:text-[#1F5E3B]"
                title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
              >
                {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>

              <Button
                size="icon"
                variant={downloadPanelOpen ? "default" : "outline"}
                onClick={() => {
                  setDownloadPanelOpen(!downloadPanelOpen);
                  setInfoPanelOpen(false); // Close info panel if open
                }}
                className={`h-12 w-12 rounded-2xl shadow-xl border-white/20 transition-all ${downloadPanelOpen ? "bg-[#1F5E3B] text-white" : "bg-white/90 text-slate-700 hover:text-[#1F5E3B]"}`}
                title="Download Layer"
              >
                <Download className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant={printPanelOpen || isSelectingArea ? "default" : "outline"}
                onClick={() => {
                  if (printPanelOpen) {
                    setPrintPanelOpen(false);
                    setCapturedAreaImage(null);
                  } else {
                    setIsSelectingArea(true);
                    setDownloadPanelOpen(false);
                    setInfoPanelOpen(false);
                    toast({
                      title: "Mode Seleksi Cetak",
                      description: "Klik dan tarik mouse pada area peta yang ingin dicetak."
                    });
                  }
                }}
                className={`h-12 w-12 rounded-2xl shadow-xl border-white/20 transition-all ${(printPanelOpen || isSelectingArea) ? "bg-[#1F5E3B] text-white" : "bg-white/90 text-slate-700 hover:text-[#1F5E3B]"}`}
                title="Cetak Peta"
              >
                {isSelectingArea ? <Loader2 className="h-5 w-5 animate-spin" /> : <Printer className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Basemap Switcher (Google Maps Style) */}
          <div
            className="absolute bottom-6 left-6 z-[1001]"
            onMouseEnter={() => setSwitcherExpanded(true)}
            onMouseLeave={() => setSwitcherExpanded(false)}
          >
            <div className={`relative flex items-end gap-2 p-1.5 transition-all duration-300 rounded-2xl bg-white shadow-2xl border border-white/20 backdrop-blur-md ${switcherExpanded ? "w-auto px-3" : "w-[84px]"}`}>
              {!switcherExpanded ? (
                // Collapsed State: Show active with a layered look
                <div className="relative h-16 w-16 cursor-pointer">
                  {basemaps.slice(0, 2).reverse().map((b, i) => (
                    <div
                      key={b.id}
                      className={`absolute inset-0 rounded-xl border-2 border-white shadow-sm transition-all duration-300 ${activeBasemap === b.id ? "z-10 translate-x-0 translate-y-0" : "z-0 translate-x-2 translate-y-[-8px] scale-95 opacity-50"}`}
                      style={{ backgroundImage: `url(${b.thumbnail})`, backgroundSize: 'cover' }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-end p-1.5 bg-gradient-to-t from-black/60 to-transparent rounded-xl z-20">
                    <span className="text-[9px] font-black text-white uppercase tracking-tighter truncate">Base Map</span>
                  </div>
                </div>
              ) : (
                // Expanded State: Show all options
                <div className="flex gap-3 py-1 animate-in fade-in slide-in-from-left-4 duration-300">
                  {basemaps.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setActiveBasemap(b.id)}
                      className="group relative flex flex-col items-center gap-2"
                    >
                      <div className={`h-16 w-20 rounded-xl border-2 transition-all duration-200 overflow-hidden shadow-sm ${activeBasemap === b.id ? "border-[#1F5E3B] ring-2 ring-[#1F5E3B]/20 scale-105" : "border-white hover:border-slate-200"}`}>
                        <div
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${b.thumbnail})` }}
                        />
                        {activeBasemap === b.id && (
                          <div className="absolute inset-0 bg-[#1F5E3B]/10 flex items-center justify-center">
                            <CheckCircle2 className="h-6 w-6 text-[#1F5E3B] drop-shadow-md" />
                          </div>
                        )}
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-tight ${activeBasemap === b.id ? "text-[#1F5E3B]" : "text-slate-500"}`}>
                        {b.shortLabel}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Coordinates (Moved after Map div and increased z-index) */}
          <div className="absolute bottom-6 right-6 z-[1001] rounded-xl bg-[#1F5E3B] px-3 md:px-4 py-2 text-[8px] md:text-[10px] font-black tracking-widest text-white shadow-2xl backdrop-blur-md border border-white/10 uppercase">
            {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
          </div>

          {/* Loading */}
          {loading && (
            <div className="absolute inset-0 z-[1002] flex items-center justify-center bg-[#1F5E3B]/10 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-white shadow-2xl">
                <Loader2 className="h-10 w-10 animate-spin text-[#1F5E3B]" />
                <div className="text-center">
                  <p className="text-sm font-black text-[#1F5E3B] uppercase tracking-widest">Inisialisasi GIS</p>
                  <p className="text-xs text-slate-500 font-medium">Memuat layer spasial...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Feature Info Panel */}
        <div
          className={`fixed md:absolute left-4 right-4 md:left-auto md:right-6 top-24 z-[1005] w-auto md:w-80 bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-3xl border border-white/20 transition-all duration-500 ease-in-out ${infoPanelOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"}`}
          style={{ maxHeight: "calc(100% - 140px)" }}
        >
          {selectedFeature && (
            <div className="flex h-full max-h-[inherit] flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100/50 p-5">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: selectedFeature.config.color || "#1F5E3B" }}
                  >
                    <Map className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#1F5E3B]">Detail Informasi</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{selectedFeature.config.label}</p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={resetSelection}
                  className="rounded-xl h-8 w-8 hover:bg-slate-100 transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-white/50">
                <div className="space-y-5">
                  {Object.entries(selectedFeature.properties).map(([key, value]) => {
                    if (value === null || value === undefined) return null;
                    const label = key.replace(/_/g, " ");
                    const formattedValue = String(value).replace(/_/g, " ");
                    const isPrimary = key === selectedFeature.config.primaryField;

                    return (
                      <div key={key} className={`group animate-in fade-in slide-in-from-bottom-2 duration-300 ${isPrimary ? "bg-[#1F5E3B]/5 p-4 rounded-2xl border border-[#1F5E3B]/10 shadow-sm" : ""}`}>
                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5 transition-colors group-hover:text-[#1F5E3B]">
                          {label}
                        </div>
                        <div className={`${isPrimary ? "text-[13px] font-black text-[#1F5E3B] leading-tight" : "text-xs font-bold text-slate-700"} break-words`}>
                          {formattedValue}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Individual Color Picker */}
                <div className="mt-8 border-t border-slate-100/50 pt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="h-4 w-4 text-[#1F5E3B]" />
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kustomisasi Warna Wilayah</h4>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-[8px] font-black text-[#1F5E3B] uppercase tracking-widest mb-1.5 block">Warna Isi (Fill)</span>
                      <div className="grid grid-cols-5 gap-2">
                        {["#1F5E3B", "#D4A017", "#ef4444", "#0ea5e9", "#f59e0b", "#6366f1", "#ec4899", "#22c55e", "#64748b", "#000000"].map(c => {
                          const pField = selectedFeature.config.primaryField;
                          const pValue = pField ? selectedFeature.properties[pField] : null;
                          const fKey = pValue ? `${selectedFeature.config.id}|${pValue}` : null;
                          const isSelected = fKey && featureStyles[fKey]?.fillColor === c;

                          return (
                            <button
                              key={c}
                              onClick={() => handleFeatureStyleChange('fillColor', c)}
                              className={`h-7 w-full rounded-lg border-2 transition-all ${isSelected ? "border-[#1F5E3B] scale-110 shadow-md" : "border-white hover:border-slate-200"}`}
                              style={{ backgroundColor: c }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block">Warna Garis (Outline)</span>
                      <div className="grid grid-cols-5 gap-2">
                        {["#1F5E3B", "#D4A017", "#ef4444", "#0ea5e9", "#f59e0b", "#6366f1", "#ec4899", "#22c55e", "#64748b", "#000000"].map(c => {
                          const pField = selectedFeature.config.primaryField;
                          const pValue = pField ? selectedFeature.properties[pField] : null;
                          const fKey = pValue ? `${selectedFeature.config.id}|${pValue}` : null;
                          const isSelected = fKey && featureStyles[fKey]?.strokeColor === c;

                          return (
                            <button
                              key={c}
                              onClick={() => handleFeatureStyleChange('strokeColor', c)}
                              className={`h-7 w-full rounded-lg border-2 transition-all ${isSelected ? "border-slate-500 scale-110 shadow-md" : "border-white hover:border-slate-200"}`}
                              style={{ backgroundColor: c }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50/80 border-t border-slate-100/50 text-center">
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                  © SIMTARU REMBANG 2026
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Floating Download Panel */}
        <div
          className={`fixed md:absolute left-4 right-4 md:left-auto md:right-6 top-24 z-[1005] w-auto md:w-80 bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-3xl border border-white/20 transition-all duration-500 ease-in-out ${downloadPanelOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"}`}
          style={{ maxHeight: "calc(100% - 140px)" }}
        >
          <div className="flex h-full max-h-[inherit] flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100/50 p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-[#1F5E3B] text-white shadow-lg">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#1F5E3B]">Download Layer</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Unduh Data Spasial</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setDownloadPanelOpen(false)}
                className="rounded-xl h-8 w-8 hover:bg-slate-100 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar bg-slate-50/50">
              <div className="space-y-2">
                {layers.map((layer) => (
                  <div key={layer.id} className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 hover:shadow-md hover:border-[#1F5E3B]/30 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#1F5E3B]/10 group-hover:text-[#1F5E3B] transition-colors">
                        <Layers className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-700 group-hover:text-[#1F5E3B] transition-colors">{layer.label}</p>
                        <p className="text-[9px] text-slate-400 font-medium">{layer.category}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleDownloadLayer(layer)}
                      className="h-8 w-8 p-0 rounded-xl bg-slate-100 text-slate-600 hover:bg-[#1F5E3B] hover:text-white transition-all shadow-sm"
                      title={`Download ${layer.label}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 border-t border-slate-100/50 text-center">
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                Format: GeoJSON (.json)
              </p>
            </div>
          </div>
        </div>



        {/* Floating Print Panel */}
        <div
          className={`fixed md:absolute left-4 right-4 md:left-auto md:right-6 top-24 z-[1005] w-auto md:w-80 bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-3xl border border-white/20 transition-all duration-500 ease-in-out ${printPanelOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"}`}
          style={{ maxHeight: "calc(100% - 140px)" }}
        >
          <div className="flex h-full max-h-[inherit] flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100/50 p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl flex items-center justify-center bg-[#1F5E3B] text-white shadow-lg">
                  {isPrinting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Printer className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#1F5E3B]">Cetak Peta</h3>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Export PDF / JPG</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setPrintPanelOpen(false)}
                className="rounded-xl h-8 w-8 hover:bg-slate-100 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              <div className="space-y-6">

                <div className="space-y-3">
                  <label className="text-[9px] font-black text-[#1F5E3B] uppercase tracking-widest block">Judul Peta</label>
                  <Input
                    placeholder="Contoh: Peta Rencana Jalan Kecamatan Rembang"
                    value={mapTitle}
                    onChange={(e) => setMapTitle(e.target.value)}
                    className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:ring-[#1F5E3B] text-xs font-medium"
                  />
                  <p className="text-[9px] text-slate-400 leading-relaxed">
                    Judul ini akan ditampilkan pada layout cetak peta di bagian legenda.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Format Export</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      disabled={isPrinting}
                      onClick={() => handlePrint('jpg')}
                      className="h-16 flex flex-col gap-1 rounded-2xl border-2 hover:border-[#1F5E3B]/50 hover:bg-[#1F5E3B]/5"
                    >
                      <span className="text-xl font-black text-slate-700">JPG</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Gambar</span>
                    </Button>
                    <Button
                      variant="outline"
                      disabled={isPrinting}
                      onClick={() => handlePrint('pdf')}
                      className="h-16 flex flex-col gap-1 rounded-2xl border-2 hover:border-[#1F5E3B]/50 hover:bg-[#1F5E3B]/5"
                    >
                      <span className="text-xl font-black text-slate-700">PDF</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Dokumen</span>
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 font-bold text-xs">!</span>
                    </div>
                    <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
                      Proses export mengambil tangkapan layar area peta saat ini. Pastikan area yang diinginkan sudah terlihat dengan jelas.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Floating Style Editor Panel */}
        <div
          className={`fixed md:absolute left-4 right-4 md:left-[300px] md:right-auto top-4 md:top-4 z-[1010] w-auto md:w-64 bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border border-white/20 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeStyleLayerID ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
        >
          {activeStyleLayerID && (
            <div className="p-5 flex flex-col gap-5">
              <div className="flex items-center justify-between border-b border-slate-100/50 pb-3">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-[#1F5E3B]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Editor Gaya</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg" onClick={() => setActiveStyleLayerID(null)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-2">Layer: {layers.find(l => l.id === activeStyleLayerID)?.label}</p>

                <div className="space-y-4">
                  <div>
                    <span className="text-[8px] font-black text-[#1F5E3B] uppercase tracking-widest mb-1.5 block">Warna Isi (Fill)</span>
                    <div className="grid grid-cols-5 gap-2">
                      {["#1F5E3B", "#D4A017", "#ef4444", "#0ea5e9", "#f59e0b", "#6366f1", "#ec4899", "#22c55e", "#64748b", "#000000"].map(c => (
                        <button
                          key={c}
                          onClick={() => handleStyleChange('fillColor', c)}
                          className={`h-7 w-full rounded-lg border-2 transition-all ${layerStyles[activeStyleLayerID]?.fillColor === c ? "border-[#1F5E3B] scale-110 shadow-md" : "border-white hover:border-slate-200"}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block">Warna Garis (Outline)</span>
                    <div className="grid grid-cols-5 gap-2">
                      {["#1F5E3B", "#D4A017", "#ef4444", "#0ea5e9", "#f59e0b", "#6366f1", "#ec4899", "#22c55e", "#64748b", "#000000"].map(c => (
                        <button
                          key={c}
                          onClick={() => handleStyleChange('strokeColor', c)}
                          className={`h-7 w-full rounded-lg border-2 transition-all ${layerStyles[activeStyleLayerID]?.strokeColor === c ? "border-slate-500 scale-110 shadow-md" : "border-white hover:border-slate-200"}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Transparansi</span>
                    <span className="text-[10px] font-bold text-[#1F5E3B]">{Math.round((layerStyles[activeStyleLayerID]?.opacity || 0) * 100)}%</span>
                  </div>
                  <input
                    type="range" min="0" max="1" step="0.1"
                    value={layerStyles[activeStyleLayerID]?.opacity || 0}
                    onChange={(e) => setLayerStyles(prev => ({ ...prev, [activeStyleLayerID]: { ...prev[activeStyleLayerID], opacity: parseFloat(e.target.value) } }))}
                    className="w-full accent-[#1F5E3B] cursor-pointer"
                  />
                </div>

                {layers.find(l => l.id === activeStyleLayerID)?.type !== "pola" && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Ketebalan Garis</span>
                      <span className="text-[10px] font-bold text-[#1F5E3B]">{layerStyles[activeStyleLayerID]?.weight || 0}px</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline" size="icon" className="h-8 w-8 rounded-lg"
                        onClick={() => setLayerStyles(prev => ({ ...prev, [activeStyleLayerID]: { ...prev[activeStyleLayerID], weight: Math.max(1, (prev[activeStyleLayerID]?.weight || 2) - 1) } }))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1F5E3B]" style={{ width: `${((layerStyles[activeStyleLayerID]?.weight || 2) / 10) * 100}%` }} />
                      </div>
                      <Button
                        variant="outline" size="icon" className="h-8 w-8 rounded-lg"
                        onClick={() => setLayerStyles(prev => ({ ...prev, [activeStyleLayerID]: { ...prev[activeStyleLayerID], weight: Math.min(10, (prev[activeStyleLayerID]?.weight || 2) + 1) } }))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Floating Compliance Panel */}
        <div
          className={`fixed md:absolute right-4 md:right-6 top-24 z-[1006] w-auto md:w-96 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-3xl border border-white/20 transition-all duration-500 ease-in-out ${isCompliancePanelOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-8 pointer-events-none"}`}
          style={{ maxHeight: "calc(100% - 140px)" }}
        >
          <CompliancePanel
            zona={complianceZona}
            onClose={() => setIsCompliancePanelOpen(false)}
          />
        </div>
      </div>

      <style>{`
        .map-label-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          color: #1F5E3B !important;
          font-weight: 900 !important;
          font-size: 11px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          text-shadow:
            -1px -1px 0 #fff,
            1px -1px 0 #fff,
            -1px  1px 0 #fff,
            1px  1px 0 #fff,
            0 0 5px rgba(255,255,255,0.8) !important;
          pointer-events: none !important;
        }
        .leaflet-tooltip-pane {
          z-index: 600 !important;
        }
      `}</style>
    </Layout>
  );
};

export default PetaInteraktif;
