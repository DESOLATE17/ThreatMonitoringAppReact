import { useSelector } from 'react-redux';

export function useRequestFilter() {
    //@ts-ignore
    const filter : Filter = {Accepted: useSelector(state => state.filter.accepted), Canceled: useSelector(state => state.filter.canceled), Formated : useSelector(state => state.filter.formated)}
    //@ts-ignore
    const startDate : Date = new Date(useSelector(state => state.filter.startDate))
    //@ts-ignore
    const endDate : Date = new Date(useSelector(state => state.filter.endDate))

    return {
         filter,
         startDate,
         endDate
    }
}