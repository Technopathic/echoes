'use client'

import { useGetCharacters } from '@/hooks/useCharacter';

const Characters = () => {
  const { data } = useGetCharacters()

  return (
    <section className="flex flex-col px-2 gap-4">
      {data?.data?.map((character, i) => (
        <article className="border border-neutral-600 h-42 rounded-lg" key={i}>{character.name}</article>
      ))}
    </section>
  )
}

export default Characters