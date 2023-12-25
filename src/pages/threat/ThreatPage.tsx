import { FC, useEffect, useState } from 'react'
import {Card } from 'react-bootstrap'
import { Threat, mockThreats } from '../../models/Threats'
import { useParams } from 'react-router-dom'
import './ThreatPage.css'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'

const ThreatPage: FC = () => {
    const params = useParams();

    const [card, setCard] = useState<Threat>(mockThreats[0]);

    const getThreatById = async (id: string): Promise<Threat> =>{
        return fetch(`http://localhost:3000/api/threats/${id}`)
            .then((response) => response.json())
            .catch(()=> (+id < mockThreats.length ? mockThreats[+id] : mockThreats[0]))
    }

    const fetchThreat = async() => {
        var threatId:string = params.threatId ? params.threatId : "1"
        const threat = await getThreatById(threatId);
        setCard(threat);
        console.log(threat.description)
    }

    useEffect(() => {
       fetchThreat();
    }, [])

    return (
        <div>
        <div style={{marginLeft: "10%", marginTop: "20px"}}>
        <Breadcrumbs pages={[{link: `/threats/${params.threatId}`, title: `${card.name}`}]}/>
        </div>
        <div className="site-body">
            <Card className="card card-page">
                <Card.Body className="card__content">                
                    <h3 className="card__name" style={{color: "#00A88E"}}><Card.Title>{card.name}</Card.Title></h3>
                    <div className="card_description" style={{whiteSpace: "pre-wrap"}}> {card.description}</div>
                    <div className="card__statistics">
                        <div className="card__statistics__header">Статистика</div>
                        <div className="card__statistics__item">
                    Количество обнаружений за последний год: {card.count}</div>
                        <div className="card__statistics__item">
                    Средняя цена мониторинга(месяц): {card.price} руб
                        </div>
                    </div>
                </Card.Body>
            <Card.Img className="card__image" src={card.image} onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src="../../../dist/default.jpeg";
                        }}/>
            </Card>
        </div>
        </div>
    );
}

export default ThreatPage;