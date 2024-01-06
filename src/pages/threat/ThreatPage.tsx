import { FC, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Threat, mockThreats } from '../../models/Threats'
import { useParams } from 'react-router-dom'
import './ThreatPage.css'
import {api} from "../../api/index"
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { ModelsThreat } from '../../api/Api'

const ThreatPage: FC = () => {
    const params = useParams();
    const [card, setCard] = useState<ModelsThreat>(mockThreats[0]);

    const getThreatById = async () => {
        const response = await api.api.threatsDetail(params.threatId?+params.threatId:1)
        if (response.status == 200) {
            setCard(response.data)
        }
    }

    const handleClick = async () => {
        var threatId: string = params.threatId ? params.threatId : "1"
        const response = api.api.threatsRequestCreate(+threatId)
    }

    useEffect(() => {
        getThreatById();
    }, [])

    return (
        <div>
            <div style={{ marginLeft: "10%", marginTop: "20px" }}>
                <Breadcrumbs pages={[{ link: `/threats/${params.threatId}`, title: `${card.name}` }]} />
            </div>
            <div className="site-body" style={{ flexDirection: "column" }}>
                <Card className="card card-page card1">
                    <Card.Body className="card__content">
                        <h3 className="card__name" style={{ color: "#00A88E" }}><Card.Title>{card.name}</Card.Title></h3>
                        <div className="card_description" style={{ whiteSpace: "pre-wrap" }}> {card.description}</div>
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
                        currentTarget.src = "../../../dist/default.jpeg";
                    }} />
                </Card>
                <button style={{
                    width: "200px",
                    marginTop: "20px",
                    backgroundColor: "rgb(46, 44, 44, 0.6)",
                    color: "white", fontSize: "1.2em"
                }}
                    className='search-button' onClick={handleClick}>Добавить в корзину</button>

            </div>
        </div>
    );
}

export default ThreatPage;