import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PetaInteraktif from "./pages/PetaInteraktif";
import InformasiZonasi from "./pages/InformasiZonasi";
import DokumenPage from "./pages/DokumenPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ProfilDaerah from "./pages/ProfilDaerah";
import ProfilDPUPR from "./pages/ProfilDPUPR";
import ProfilKabupaten from "./pages/ProfilKabupaten";
import ProfilFPR from "./pages/ProfilFPR";
import AgendaFPR from "./pages/AgendaFPR";
import BeritaPage from "./pages/BeritaPage";
import AgendaPage from "./pages/AgendaPage";
import KecamatanDetail from "./pages/KecamatanDetail";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import ModulePlaceholder from "./pages/admin/ModulePlaceholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profil"
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <ModulePlaceholder title="Manajemen Profil" description="Kelola profil daerah, DPUPR, dan Kabupaten." />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/peta"
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <ModulePlaceholder title="Manajemen Peta" description="Kelola layer peta, markers, dan dokumen spasial." />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dokumen"
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <ModulePlaceholder title="Manajemen Dokumen" description="Unggah dan kelola dokumen produk tata ruang." />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/zonasi"
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <ModulePlaceholder title="Manajemen Zonasi" description="Kelola data ITBX dan peraturan zonasi." />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/fpr"
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <ModulePlaceholder title="Manajemen FPR" description="Kelola profil dan agenda Forum Penataan Ruang." />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/berita"
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <ModulePlaceholder title="Manajemen Berita" description="Tulis dan publikasikan berita terbaru." />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/agenda"
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <ModulePlaceholder title="Manajemen Agenda" description="Jadwalkan kegiatan kedinasan." />
                </ProtectedRoute>
              }
            />

            {/* Profil Group */}
            <Route path="/profil/daerah" element={<ProfilDaerah />} />
            <Route path="/profil/daerah/:id" element={<KecamatanDetail />} />
            <Route path="/profil/dpupr" element={<ProfilDPUPR />} />
            <Route path="/profil/kabupaten" element={<ProfilKabupaten />} />

            <Route path="/peta" element={<PetaInteraktif />} />
            <Route path="/dokumen" element={<DokumenPage />} />
            <Route path="/zonasi" element={<InformasiZonasi />} />

            {/* FPR Group */}
            <Route path="/fpr/profil" element={<ProfilFPR />} />
            <Route path="/fpr/agenda" element={<AgendaFPR />} />

            <Route path="/berita" element={<BeritaPage />} />
            <Route path="/agenda" element={<AgendaPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
