import { FlowerState } from '@/store/useBouquetStore'
import BouquetViewerClient from '@/components/BouquetViewerClient'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default async function ViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ data?: string }>
}) {
  const { data: encodedData } = await searchParams

  if (!encodedData) {
    return <ErrorState message="No bouquet data found in the link. Make sure you copied the entire URL!" />
  }

  try {
    const jsonString = decodeURIComponent(encodedData)
    const payload = JSON.parse(jsonString)
    
    const flowers: FlowerState[] = payload.f || []
    const title: string = payload.t || "A Bouquet for you"

    if (flowers.length === 0) {
      return <ErrorState message="This bouquet seems to have no flowers in it!" />
    }

    return <BouquetViewerClient flowers={flowers} title={title} shareId="url" />
  } catch (error) {
    console.error("Failed to parse bouquet data from URL", error)
    return <ErrorState message="The bouquet link appears to be corrupted or invalid." />
  }
}

// Custom sophisticated error component so the user isn't just hit with a 404 page
function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-[#fdfbf7] via-[#fff5f8] to-[#eaddff] p-6 text-center">
      <div className="bg-white/60 p-10 rounded-[3rem] shadow-xl backdrop-blur-xl border border-white max-w-lg w-full space-y-6">
        <div className="w-20 h-20 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <AlertCircle size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Oops! Something went wrong</h2>
          <p className="text-gray-500 font-medium">{message}</p>
        </div>
        <div className="pt-4">
          <Link 
            href="/build"
            className="inline-flex items-center justify-center rounded-full bg-gray-900 text-white px-8 py-3.5 text-sm font-bold tracking-wide transition-all hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-200"
          >
            Create a New Bouquet
          </Link>
        </div>
      </div>
    </div>
  )
}
