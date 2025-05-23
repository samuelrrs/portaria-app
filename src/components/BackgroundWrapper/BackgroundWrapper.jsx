export default function BackgroundWrapper({ children }) {
  return (
    <div className="relative min-h-screen bg-[#f4f7fa] overflow-hidden">
      {/* SVG como fundo absoluto ocupando 100% da tela */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/image/wave-bg.svg"
          alt="background"
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* Conteúdo sobreposto */}
      <main className="relative z-10 py-10 px-4">{children}</main>
    </div>
  );
}
