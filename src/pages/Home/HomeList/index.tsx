import { Image, InfiniteScroll, List } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { ListRes, fetchListAPI } from '@/apis/list'
import { useNavigate } from 'react-router-dom'

type Props = {
    channelId: string
}

const HomeList = (props: Props) => {
    const { channelId } = props
    const [list, setList] = useState<ListRes>({
        results: [],
        pre_timestamp: '' + new Date().getTime()
    })
    useEffect(() => {
        async function getList() {
            try {
                const res = await fetchListAPI({
                    channel_id: channelId,
                    timestamp: '' + new Date().getTime(),
                })
                setList(res.data.data)
            } catch (error) {
                throw new Error('fetch list error')
            }
        }
        getList()
    }, [channelId])

    const [hasMore, setHasMore] = useState(true)
    const loadMore = async () => {
        try {
            const res = await fetchListAPI({
                channel_id: channelId,
                timestamp: list.pre_timestamp
            })
            setList({
                results: [...list.results, ...res.data.data.results],
                pre_timestamp: res.data.data.pre_timestamp
            })
            if (res.data.data.results.length === 0) {
                setHasMore(false)
            }
        } catch (error) {
            throw new Error('fetch list error')
        }
    }
    const navigate = useNavigate()
    const goToDetail = (id: string) => {
        navigate(`/detail?id=${id}`)
    }
    return (
        <>
            <List>
                {list.results.map((item) => (
                    <List.Item
                        onClick={() => goToDetail(item.art_id)}
                        key={item.art_id}
                        prefix={
                            <Image
                                src={item.cover.images?.[0]}
                                style={{ borderRadius: 20 }}
                                fit="cover"
                                width={40}
                                height={40}
                            />
                        }
                        description={item.pubdate}
                    >
                        {item.title}
                    </List.Item>
                ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
        </>
    )
}

export default HomeList