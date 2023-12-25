import { useSelector } from 'react-redux';

export function useThreatsFilter() {
    //@ts-ignore
    const searchValue = useSelector(state => state.filter.searchValue)
    //@ts-ignore
    const lowPrice = useSelector(state => state.filter.lowPrice)
    //@ts-ignore
    const highPrice = useSelector(state => state.filter.highPrice)

    return {
        searchValue,
        lowPrice,
        highPrice,
    }
}