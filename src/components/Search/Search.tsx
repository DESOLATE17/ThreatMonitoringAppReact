import { FC } from 'react'
import './Search.css'

interface Props {
    value: string
    setValue: (value: string) => void
    placeholder?: string
}

const Search: FC<Props> = ({ value, setValue, placeholder}) => (
    <div className="search">
        <input value={value}  className="search-bar" placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
    </div>
)

export default Search;