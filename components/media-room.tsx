"use client"

import { useUser } from '@clerk/nextjs'
import { LiveKitRoom, VideoConference} from '@livekit/components-react'
import "@livekit/components-styles"
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface MediaRoomProps {
    chatId: string
    audio: boolean
    video: boolean
}

export const MediaRoom = ({
    chatId,
    audio,
    video
}: MediaRoomProps) => {
    const { user } = useUser()
    const [token, setToken] = useState("")

    useEffect(() => {
        if (!user?.firstName ) return

        const name = `${user.firstName}`;

        (async () => {
            try{
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`)

                const data = await resp.json()
                setToken(data.token)
            }catch(error){
                console.log(error)
            }
        })()
    },[user?.firstName, user?.lastName, chatId])
     

    if(token === ""){
        return (
            <div className='flex flex-col flex-1 justify-center items-center'>
                <Loader2 
                    className='h-7 w-7 text-zinc-500 animate-spin my-4'
                />
                <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                    Loading...
                </p>
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            audio={audio}
            video={video}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}