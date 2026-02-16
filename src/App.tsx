import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
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
import UserManagement from "./pages/admin/UserManagement";
import ModulePlaceholder from "./pages/admin/ModulePlaceholder";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['superadmin', 'admin', 'staff']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={['superadmin']}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profil"
          element={
            <ProtectedRoute allowedRoles={['superadmin', 'admin', 'staff']}>
              <ModulePlaceholder title="Manajemen Profil" description="Kelola profil daerah, DPUPR, dan Kabupaten." />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/peta"
          element={
            <ProtectedRoute allowedRoles={['superadmin', 'admin', 'staff']}>
              <ModulePlaceholder title="Manajemen Peta" description="Kelola layer peta, markers, dan dokumen spasial." />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dokumen"
          element={
            <ProtectedRoute allowedRoles={['superadmin', 'admin', 'staff']}>
              <ModulePlaceholder title="Manajemen Dokumen" description="Unggah dan kelola dokumen produk tata ruang." />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/zonasi"
          element={
            <ProtectedRoute allowedRoles={['superadmin', 'admin', 'staff']}>
              <ModulePlaceholder title="Manajemen Zonasi" description="Kelola data ITBX dan peraturan zonasi." />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/fpr"
          element={
            <ProtectedRoute allowedRoles={['superadmin', 'admin', 'staff']}>
              <ModulePlaceholder title="Manajemen FPR" description="Kelola profil dan agenda Forum Penataan Ruang." />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/berita"
          element={
            <ProtectedRoute allowedRoles={['superadmin', 'admin', 'staff']}>
              <ModulePlaceholder title="Manajemen Berita" description="Tulis dan publikasikan berita terbaru." />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/agenda"
          element={
            <ProtectedRoute allowedRoles={['superadmin', 'admin', 'staff']}>
              <ModulePlaceholder title="Manajemen Agenda" description="Jadwalkan kegiatan kedinasan." />
            </ProtectedRoute>
          }
        />

        {/* Profil Group */}
        <Route path="/profil/daerah" element={<PageTransition><ProfilDaerah /></PageTransition>} />
        <Route path="/profil/daerah/:id" element={<PageTransition><KecamatanDetail /></PageTransition>} />
        <Route path="/profil/dpupr" element={<PageTransition><ProfilDPUPR /></PageTransition>} />
        <Route path="/profil/kabupaten" element={<PageTransition><ProfilKabupaten /></PageTransition>} />

        <Route path="/peta" element={<PageTransition><PetaInteraktif /></PageTransition>} />
        <Route path="/dokumen" element={<PageTransition><DokumenPage /></PageTransition>} />
        <Route path="/zonasi" element={<PageTransition><InformasiZonasi /></PageTransition>} />

        {/* FPR Group */}
        <Route path="/fpr/profil" element={<PageTransition><ProfilFPR /></PageTransition>} />
        <Route path="/fpr/agenda" element={<PageTransition><AgendaFPR /></PageTransition>} />

        <Route path="/berita" element={<PageTransition><BeritaPage /></PageTransition>} />
        <Route path="/agenda" element={<PageTransition><AgendaPage /></PageTransition>} />

        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
