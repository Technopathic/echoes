'use client'

import { Loader } from '@/components/ai-elements/loader';
import { useUIStore } from '@/hooks/useStore';

const Loading = () => {
    const isLoading = useUIStore(state => state.isLoading)

    if (!isLoading) {
        return <></>
    }
    
    return (
        <section className="w-full h-screen z-40 bg-neutral-800/75 fixed top-0 left-0 right-0 bottom-0 backdrop-blur flex flex-col justify-center items-center">
            <Loader className="z-50 text-white" size={48} />
        </section>
    )
}

export default Loading