import { useSelector } from 'react-redux';

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