import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogIn, Loader2 } from "lucide-react";
import logo from "@/assets/logo-kabupaten-rembang.png";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const demoAccounts = [
  { role: "Superadmin", username: "superadmin", password: "admin123" },
  { role: "Admin Bidang", username: "admin", password: "admin123" },
  { role: "Staff DPU", username: "staff", password: "admin123" },
];

const LoginPage = () => {
  const heroImages = [
    "/assets/branding/Kabupaten%20Rembang%20Hero.jpg",
    "/assets/branding/Kabupaten%20Rembang%202.jpg",
    "/assets/branding/Kabupaten%20Rembang%203.jpg",
    "/assets/branding/Kabupaten%20Rembang%204.jpg",
    "/assets/branding/Kabupaten%20Rembang%205.jpg"
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setCurrentBgIndex((prev) => (prev + 1) % heroImages.length);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    const success = await login(username, password);

    if (success) {
      toast({ title: "Login Berhasil", description: "Selamat datang di panel administrasi." });
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Login Gagal",
        description: "Username atau password salah. Silakan coba kembali.",
        variant: "destructive"
      });
    }
    setIsLoggingIn(false);
  };

  return (
    <Layout>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background Images with Layered Cross-fade */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${currentBgIndex === idx ? "opacity-100" : "opacity-0"
                }`}
              style={{
                backgroundImage: `url('${img}')`,
                transform: 'scale(1.05)'
              }}
            />
          ))}
          {/* Whiter Overlay - adjusted opacity as requested */}
          <div className="absolute inset-0 z-0 bg-white/40 backdrop-blur-[2px]" />
        </div>

        {/* Animated Glows for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />

        <div className="relative z-10 w-full max-w-md px-4 py-12">
          <Card className="w-full shadow-2xl border-white/40 bg-white/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
            <CardHeader className="items-center text-center pb-2 pt-8">
              <div
                className="relative mb-4 group/logo cursor-pointer"
                onClick={handleLogoClick}
              >
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl transition-all group-hover/logo:bg-primary/40" />
                <img src={logo} alt="Logo" className="relative h-24 w-auto object-contain transition-transform duration-500 group-hover/logo:scale-110 active:scale-95" />
              </div>
              <CardTitle className="text-3xl font-black text-primary uppercase tracking-tight">Admin Login</CardTitle>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">SIMTARU REMBANG</span>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-4">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Username</Label>
                  <Input
                    id="username"
                    className="h-12 rounded-2xl border-white/50 bg-white/50 focus-visible:ring-primary/20 font-bold"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="superadmin"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" title="Password" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="h-12 rounded-2xl border-white/50 bg-white/50 focus-visible:ring-primary/20 font-bold"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoggingIn} className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-black text-white transition-all shadow-xl shadow-primary/20 text-lg group">
                  {isLoggingIn ? <Loader2 className="h-6 w-6 animate-spin" /> : <><LogIn className="h-6 w-6 mr-3 transition-transform group-hover:translate-x-1" /> MASUK</>}
                </Button>
              </form>

              <div className="mt-8 rounded-[1.5rem] bg-slate-900/5 p-5 border border-white/30 backdrop-blur-sm">
                <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-400" /> Akun Demo (UAT):
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {demoAccounts.map((a) => (
                    <div key={a.role} className="flex items-center justify-between group/item">
                      <span className="text-[9px] font-black uppercase text-primary/70">{a.role}</span>
                      <p className="text-[11px] font-bold text-slate-600 bg-white/40 px-3 py-1 rounded-lg border border-white/50 transition-colors group-hover/item:bg-white/60">
                        {a.username} <span className="mx-1 text-slate-300">/</span> {a.password}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
