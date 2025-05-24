"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // Redireciona se já estiver logado
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth === "true") router.push("/entry");
  }, []);

  const handleLogin = () => {
    if (email === "porteiro1" && senha === "123456") {
      localStorage.setItem("auth", "true");
      router.push("/entry");
    } else {
      setErro("Credenciais inválidas");
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Imagem lateral */}
      <div
        className="hidden lg:block w-2/3 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/image/background.jpg')" }}
      ></div>

      {/* Formulário */}
      <div className="w-full lg:w-1/3 flex flex-col justify-center items-center px-8 py-12 bg-background-panel shadow-lg">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="text-3xl font-bold text-primary text-center">
            Acesso a portaria
          </h1>
          <p className="text-text-subtle text-center">
            Entre com suas credenciais
          </p>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                placeholder="porteiro@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {erro && <p className="text-red-500 text-sm">{erro}</p>}

            <Button
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary-dark"
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
