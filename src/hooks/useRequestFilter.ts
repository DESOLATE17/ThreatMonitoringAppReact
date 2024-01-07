import { useSelector } from 'react-redux';
import { Filter } from '../pages/myRequests/MyRequestsPage';

export function useRequestFilter() {
    //@ts-ignore
   const {canceled, formated, accepted, startDate, endDate} = useSelector(state => state.filterRequest);
   const startDateState: Date = new Date(startDate);
   const endDateState: Date = new Date(endDate);

   return {
       canceled,
       formated,
       accepted, 
       startDateState,
       endDateState
   }
}