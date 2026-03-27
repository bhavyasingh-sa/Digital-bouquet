export default function Loading() {
  return (
    <div className="flex flex-col h-[100dvh] bg-gradient-to-br from-[#fdfbf7] via-[#fff5f8] to-[#eaddff] overflow-hidden relative">
      <header className="h-20 flex items-center justify-between px-6 sm:px-12 z-20 border-b border-white/50">
        <div className="w-32 h-6 bg-pink-100 animate-pulse rounded-full"></div>
        <div className="w-10 h-10 bg-pink-100 animate-pulse rounded-full"></div>
      </header>
      <div className="flex-1 relative flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl h-full sm:h-[calc(100vh-8rem)] bg-white/30 backdrop-blur-sm border border-white/60 rounded-[3rem] shadow-xl overflow-hidden mt-2 flex flex-col items-center justify-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-white/40 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-pink-300 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-pink-400 font-bold tracking-[0.2em] uppercase text-xs animate-pulse">Unboxing your gift...</p>
        </div>
      </div>
    </div>
  )
}
