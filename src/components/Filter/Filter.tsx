import { FC, useState } from 'react'
import Slider from 'react-slider';
import './Filter.css'

export interface Prices {
    priceMin: Number,
    priceMax: Number,
    priceMinAbsolute: Number,
    priceMaxAbsolute: Number
}

const MIN = 10000;
const MAX = 1000000;

interface Props {
    min: number
    max: number
    setFilter: (minVal:number, maxVal:number) => void
}

export const Filter: FC<Props> = ({min, max, setFilter}) => {
    const [values, setValues] = useState([min, max]);

    const handleSliderChange = (newValues: number[]) => {
        setValues(newValues);
        setFilter(newValues[0], newValues[1]);
      };

    return (
        <div>
            <h2 style={{fontSize: "1.25em"}}>Фильтр по цене</h2>
            <div className={"values"}>{values[0]} - {values[1]} руб</div>
            <Slider className={"slider"}
                onChange={handleSliderChange}
                value={values} 
                trackClassName= {"track"}
                min={MIN} 
                max={MAX}/>
        </div>
    )
}