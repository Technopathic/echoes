'use client'

import { useGetCharacters } from '@/hooks/useCharacter';

const Characters = () => {
  const { data } = useGetCharacters()

  return (
    <section className="flex flex-col px-2 gap-4">
      {data?.data?.map((character, i) => (
        <article className="h-42 rounded-lg shadow-md relative overflow-hidden" key={i}>
          <img src={character.image} className="w-full h-full object-cover"/>
          <section className="absolute bottom-0 w-full px-2 py-1 bg-neutral-900/85 backdrop-blur-sm">
            <p className="text-neutral-100">{character.name}</p>
          </section>
        </article>
      ))}
    </section>
  )
}

export default Characters