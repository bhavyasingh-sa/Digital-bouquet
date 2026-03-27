export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#fdfbf7] via-[#fff5f8] to-[#eaddff]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-pink-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-pink-400 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-pink-400 font-bold tracking-[0.2em] uppercase text-xs animate-pulse">Gathering Blooms...</p>
      </div>
    </div>
  )
}
