'use client'

import { useGetCharacters } from '@/hooks/useCharacter'
import { useUIStore } from '@/hooks/useStore'
import Link from 'next/link'
import { useEffect } from 'react'

const Characters = () => {
  const setIsLoading = useUIStore(state => state.setIsLoading)
  const { data, isLoading } = useGetCharacters()

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  if (isLoading) {
    return null
  }

  return (
    <section className="flex flex-col gap-4 w-full">
      {data?.data?.map((character, i) => (
        <Link href={`/conversation?id=${character.slug}`} className="h-72 w-full rounded-lg shadow-md relative overflow-hidden" key={i}>
          <video className="w-full h-full object-cover" muted playsInline loop autoPlay>
            <source src={`/characters/${character.slug}/cover.mp4`} type="video/mp4" />
          </video>
          <section className="absolute bottom-0 w-full px-4 py-2 bg-neutral-900/85 backdrop-blur-sm">
            <p className="text-neutral-100 text-2xl">{character.name}</p>
          </section>
        </Link>
      ))}
    </section>
  )
}

export default Characters