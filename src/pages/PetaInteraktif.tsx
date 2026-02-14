import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Printer, Download, Search, ChevronLeft, ChevronRight, Loader2, Map, Layers, Maximize, Minimize, Copy, ExternalLink, Eye, EyeOff, CheckCircle2, Ruler, BoxSelect, Trash2
} from "lucide-react";
import Layout from "@/components/Layout";
import "leaflet/dist/leaflet.css";
import { useToast } from "@/hooks/use-toast";

const layers = [
  { id: "kabupaten", label: "Batas Kabupaten", file: "batas_kabupaten.json", type: "polygon", color: "#D4A017", weight: 3, defaultOn: false },
  { id: "kecamatan", label: "Batas Kecamatan", file: "batas_kecamatan.json", type: "polygon", color: "#1F5E3B", weight: 2, defaultOn: true },
  { id: "desa", label: "Batas Desa", file: "batas_desa.json", type: "polygon", color: "#64748b", weight: 1, defaultOn: false },
  { id: "jalan", label: "Jaringan Jalan", file: "jaringan_jalan.json", type: "line", color: "#ef4444", weight: 2, defaultOn: false },
  { id: "sungai", label: "Sungai", file: "sungai.json", type: "line", color: "#0ea5e9", weight: 2, defaultOn: false },
  { id: "rtrw", label: "RTRW Pola Ruang", file: "rtrw_pola_ruang.json", type: "pola", defaultOn: false },
];

const basemaps = [
  {
    id: "osm",
    label: "OpenStreetMap",
    shortLabel: "OSM",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OSM contributors",
    thumbnail: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "google_road",
    label: "Google Maps",
    shortLabel: "Maps",
    url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    attribution: "© Google",
    thumbnail: "https://images.unsplash.com/photo-1569336415962-a4bd4f79c0f2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "google_sat",
    label: "Google Satellite",
    shortLabel: "Satelit",
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    attribution: "© Google",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "google_hybrid",
    label: "Google Hybrid",
    shortLabel: "Hybrid",
    url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    attribution: "© Google",
    thumbnail: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=150&q=80"
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

      map.on("click", () => {
        setContextMenu(null);
      });

      map.on("movestart", () => {
        setContextMenu(null);
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
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
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
            if (layerConfig.type === "pola") {
              // Simple categorical coloring for RTRW
              const obj = feature.properties.NAMOBJ || feature.properties.pola_ruang || "";
              const color = obj.toLowerCase().includes("hutan") ? "#15803d" :
                obj.toLowerCase().includes("sawah") ? "#86efac" :
                  obj.toLowerCase().includes("permukiman") ? "#fbbf24" :
                    obj.toLowerCase().includes("industri") ? "#94a3b8" : "#94a3b8";
              return { color: "#334155", weight: 0.5, fillColor: color, fillOpacity: 0.5 };
            }
            return {
              color: layerConfig.color,
              weight: layerConfig.weight,
              fillColor: layerConfig.color,
              fillOpacity: layerConfig.type === "polygon" ? 0.2 : 1
            };
          },
          onEachFeature: (feature: any, layer: any) => {
            let popupContent = `<div class="p-2"><strong>Atribut:</strong><br/><div class="text-[10px] mt-1 space-y-1">`;
            for (const key in feature.properties) {
              popupContent += `<div><strong>${key}:</strong> ${feature.properties[key]}</div>`;
            }
            popupContent += `</div></div>`;
            layer.bindPopup(popupContent);
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

  }, [activeL, L]);

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

  return (
    <Layout hideFooter hideNavbar={isFullscreen || !isNavbarVisible}>
      <div ref={containerRef} className={`relative flex transition-all duration-200 ${(isFullscreen || !isNavbarVisible) ? "h-screen w-screen bg-slate-100" : "h-[calc(100vh-64px)]"}`}>
        {/* Side panel */}
        <div className={`relative z-[1001] flex-shrink-0 border-r bg-card transition-all duration-200 ${panelOpen ? "w-72" : "w-0 overflow-hidden"}`}>
          <div className="p-4 space-y-6">
            <div>
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4A017]">Layer Tematik</h2>
              <div className="space-y-3">
                {layers.map((l) => (
                  <label key={l.id} className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700 hover:text-[#1F5E3B]">
                    <Checkbox checked={activeL.includes(l.id)} onCheckedChange={() => toggleLayer(l.id)} />
                    {l.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D4A017]">Legenda Statis</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <span className="inline-block h-3 w-3 rounded-full bg-[#ef4444]" /> Jaringan Jalan
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <span className="inline-block h-3 w-3 rounded-full bg-[#0ea5e9]" /> Sungai
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <span className="inline-block h-3 w-3 rounded border border-black/10 bg-[#D4A017]/20" /> Batas Wilayah
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setPanelOpen(!panelOpen)}
          className="absolute left-0 top-1/2 z-[1002] -translate-y-1/2 rounded-r-xl bg-[#1F5E3B] p-1.5 text-white shadow-lg transition-all hover:pl-3"
          style={{ left: panelOpen ? "288px" : "0" }}
        >
          {panelOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        {/* Map area */}
        <div className="relative flex-1 bg-slate-100 overflow-hidden">
          {/* Map */}
          <div ref={mapRef} className="h-full w-full z-0" />

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
          <div className="absolute left-4 right-4 top-4 z-[1001] flex items-center justify-between gap-2">
            <div className="flex w-full max-w-sm ml-12 items-center gap-2 bg-white/90 pl-1 pr-4 py-1 shadow-xl backdrop-blur-md rounded-2xl border border-white/20">
              <Button
                variant="ghost"
                size="icon"
                onClick={performSearch}
                className="h-8 w-8 rounded-xl hover:bg-[#1F5E3B]/10 hover:text-[#1F5E3B]"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Cari koordinat (Lat, Lng)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                className="h-10 border-none bg-transparent shadow-none focus-visible:ring-0 text-slate-700 p-0"
              />
            </div>

            <div className="flex gap-2">
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
              <Button size="icon" variant="outline" className="h-12 w-12 rounded-2xl bg-white/90 shadow-xl border-white/20 hover:text-[#1F5E3B]">
                <Printer className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="h-12 w-12 rounded-2xl bg-white/90 shadow-xl border-white/20 hover:text-[#1F5E3B]">
                <Download className="h-5 w-5" />
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
          <div className="absolute bottom-6 right-6 z-[1001] rounded-xl bg-[#1F5E3B] px-4 py-2 text-[10px] font-black tracking-widest text-white shadow-2xl backdrop-blur-md border border-white/10 uppercase">
            LAT: {coords.lat.toFixed(6)} | LNG: {coords.lng.toFixed(6)}
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
      </div>
    </Layout>


  );
};

export default PetaInteraktif;
