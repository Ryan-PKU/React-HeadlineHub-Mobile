import { useEffect, useState } from 'react'
import { ChannelItem, fetchChannelAPI } from '@/apis/list'

function useTabs(){
    const [channels, setChannels] = useState<ChannelItem[]>([])
    useEffect(() => {
        async function getChannels() {
            try {
                const res = await fetchChannelAPI()
                setChannels(res.data.data.channels)
            } catch (error) {
                throw new Error('fetch channels error')
            }
        }
        getChannels()
    }, [])
    return {channels}
}

export {useTabs}