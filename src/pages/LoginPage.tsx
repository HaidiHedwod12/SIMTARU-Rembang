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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

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
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-sm shadow-xl border-slate-100 rounded-2xl">
          <CardHeader className="items-center text-center pb-2">
            <img src={logo} alt="Logo" className="mb-4 h-20 w-auto object-contain" />
            <CardTitle className="text-2xl font-black text-primary uppercase tracking-tight">Admin Login</CardTitle>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">SIMTARU REMBANG</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs font-black uppercase text-slate-500">Username</Label>
                <Input
                  id="username"
                  className="rounded-xl border-slate-100 bg-slate-50 focus-visible:ring-primary/20"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="superadmin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" title="Password" className="text-xs font-black uppercase text-slate-500">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="rounded-xl border-slate-100 bg-slate-50 focus-visible:ring-primary/20"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoggingIn} className="w-full h-12 rounded-xl bg-primary hover:bg-[#1a5032] font-black text-white transition-all shadow-lg shadow-primary/20">
                {isLoggingIn ? <Loader2 className="h-5 w-5 animate-spin" /> : <><LogIn className="h-5 w-5 mr-4" /> MASUK</>}
              </Button>
            </form>

            <div className="mt-10 rounded-2xl bg-slate-50 p-6 border border-slate-100/50">
              <p className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Akun Demo (UAT):</p>
              <div className="space-y-3">
                {demoAccounts.map((a) => (
                  <div key={a.role} className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase text-primary">{a.role}</span>
                    <p className="text-xs font-bold text-slate-600">
                      {a.username} <span className="mx-1 text-slate-300">/</span> {a.password}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
