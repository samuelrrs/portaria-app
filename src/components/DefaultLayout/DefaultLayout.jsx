"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import BackgroundWrapper from "../BackgroundWrapper/BackgroundWrapper";

export default function DefaultLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // rotas que NÃO devem usar o layout
  const ignorarLayout = ["/login"];
  const isProtected = !ignorarLayout.includes(pathname);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (isProtected && auth !== "true") {
      router.push("/login");
    }
  }, [pathname, isProtected]);

  // se for rota ignorada, retorna apenas o conteúdo (ex: /login)
  if (ignorarLayout.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <BackgroundWrapper>
      <div className="flex justify-end mb-6 max-w-6xl mx-auto px-4">
        <Button
          variant="outline"
          onClick={() => {
            localStorage.removeItem("auth");
            router.push("/login");
          }}
          className="border-red-600 text-red-600 hover:bg-red-50"
        >
          Sair
        </Button>
      </div>
      {children}
    </BackgroundWrapper>
  );
}
