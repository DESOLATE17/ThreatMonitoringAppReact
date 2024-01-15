import { FC, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import InputField from '../../components/Search/Search'
import './ThreatsPage.css'
import '../../components/ThreatCard/ThreatCard.css'
import { Threat, ThreatsList, mockThreats } from '../../models/Threats'
import { Card } from 'react-bootstrap'
import Navbar from '../../components/Navbar/Navbar'
import { Filter } from '../../components/Filter/Filter'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { Link } from 'react-router-dom'


const getThreatsList = async (name = '', lowPrice: number, highPrice: number): Promise<ThreatsList> => {
  return fetch(`http://localhost:3000/api/threats?query=${name}&lowPrice=${lowPrice}&highPrice=${highPrice}`)
    .then((response) => response.json())
    .catch(() => ({ draftId: 0, threats: mockThreats }))
}


const Threats: FC = () => {
  const [threats, setThreats] = useState<Threat[]>([])

  const handleSearch = async () => {
    setLoading(true)
    const { draftId, threats } = await getThreatsList(searchValue, lowPrice, highPrice)
    console.log(draftId)
    setThreats(threats)
    setLoading(false)
  }

  const [searchValue, setSearchValue] = useState('')
  const [lowPrice, setLowPrice] = useState(0)
  const [highPrice, setHignPrice] = useState(100000)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleSearch();
  }, [searchValue, lowPrice, highPrice])


  const setFilter = (minVal: number, maxVal: number) => {
    setHignPrice(maxVal);
    setLowPrice(minVal);
  }

  return (
    <div>
      <Navbar isAuthorized={false} />
      <div style={{ marginLeft: "10%", marginTop: "20px" }}>
        <Breadcrumbs pages={[]} />
      </div>
      <div className={`container ${loading && 'containerLoading'}`}>
        {loading && <div className="loadingBg"><Spinner animation="border" /></div>}
        <div className="site-body">
          <div className='filter'>
            <Filter min={1000} max={100000} setFilter={setFilter} />
          </div>
          <div className="cards-with-search">
            <InputField
              value={searchValue}
              setValue={(value) => setSearchValue(value)}
            />
            {!threats.length && <div>
              <h1>К сожалению, по вашему запросу ничего не найдено</h1>
            </div>}
            <div className="cards-list">
              {threats.map((item) => (
                <Link to={`/ThreatMonitoringAppReact/threats/${item.threatId}`} >
                  <Card className="card">
                    <Card.Body className="card__content">
                      <h3 className="card__name">{item.name}</h3>
                      <div className="card_description"> {item.summary}</div>
                      <h4 className='card_description'> от {item.price} руб</h4>
                    </Card.Body>
                    <Card.Img className="card__image" src={item.image} onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "default.jpeg";
                    }}></Card.Img>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Threats;
