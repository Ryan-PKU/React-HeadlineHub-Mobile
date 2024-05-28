import { http } from "@/utils";

export type ResType<T> = {
    message: string,
    data: T
}

export type ChannelItem = {
    id: number,
    name: string
}

type ChannelRes = {
    channels: ChannelItem[]
}

export function fetchChannelAPI() {
    return http.request<ResType<ChannelRes>>({
        url: '/channels',
    })
}

type ListParams = {
    channel_id: string
    timestamp: string
}

type ListItem = {
    art_id: string
    title: string
    aut_id: string
    comm_count: number
    pubdate: string
    aut_name: string
    is_top: 0 | 1
    cover: {
        type: 0 | 1 | 3
        images: string[]
    }
}

export type ListRes = {
    results: ListItem[]
    pre_timestamp: string
}

export function fetchListAPI(params: ListParams) {
    return http.request<ResType<ListRes>>({
        url: '/articles',
        params,
    })
}

