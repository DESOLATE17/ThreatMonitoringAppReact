import { FC, useEffect, useState} from 'react'
import { Spinner } from 'react-bootstrap'
import InputField from '../../components/Search/Search'
import './ThreatsPage.css'
import '../../components/ThreatCard/ThreatCard.css'
import { Threat, mockThreats } from '../../models/Threats'
import {Card} from 'react-bootstrap'
import Navbar from '../../components/Navbar/Navbar'
import { Filter } from '../../components/Filter/Filter'
import  Breadcrumbs  from '../../components/Breadcrumbs/Breadcrumbs'
import {api} from '../../api/index'
import {setLowPrice, setHighPrice, setSearchValue} from '../../store/filterSlice'
import {useDispatch} from 'react-redux'
import {useThreatsFilter} from '../../hooks/useThreatsList'

const Threats: FC = () => { 
    const dispatch = useDispatch();
    const [threats, setThreats] = useState<Threat[]>([]);
    const [loading, setLoading] = useState(false)
    const { lowPrice, highPrice, searchValue} = useThreatsFilter();

    const handleSearch = async () =>{
        setLoading(true)
        var draftId, threats;

        const response = await api.api.threatsList({query: searchValue, lowPrice, highPrice})
        if (response.status !== 200) {
            draftId = 0
            threats= mockThreats 
        }
        draftId = response.data.draftId
        threats = response.data.threats
      
        setThreats(threats)
        setLoading(false) 
    }

    useEffect( ()=> {
        handleSearch();
    }, [searchValue, lowPrice, highPrice])


    const setFilter = (minVal:number, maxVal:number) => {
        dispatch(setLowPrice(minVal));
        dispatch(setHighPrice(maxVal))
    }

    return (
    <div>
        <div style={{marginLeft: "10%", marginTop: "20px"}}>
        <Breadcrumbs pages={[]} />
    </div>
    <div className={`container ${loading && 'containerLoading'}`}>
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
    <div className="site-body">
    <div className='filter'>
        <Filter min={1000}  max={100000} setFilter={setFilter}/>
    </div>
    <div className="cards-with-search">
    <InputField
            value={searchValue}
            setValue={(value) => dispatch(setSearchValue(value))}
        />
        {!threats.length && <div>
        <h1>К сожалению, по вашему запросу ничего не найдено</h1>
        </div>}
        <div className="cards-list">
            {threats.map((item)=> (
                <a href={`/threats/${item.threatId}`} >
                    <Card className="card">
                        <Card.Body className="card__content">
                            <h3 className="card__name">{item.name}</h3>
                            <div className="card_description"> {item.summary}</div>
                            <h4 className='card_description'> от {item.price} руб</h4>
                        </Card.Body>
                        <Card.Img className="card__image" src={item.image} onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src="./public/default.jpeg";
                        }}></Card.Img>
                    </Card>
                </a>
            ))}
        </div>
    </div>
    </div>
    </div>
    </div>
    );
}

export default Threats;
