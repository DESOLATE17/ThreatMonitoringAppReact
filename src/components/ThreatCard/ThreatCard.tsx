import { FC, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import './ThreatCard.css'
import { useNavigate, useParams } from 'react-router-dom'
import { Threat } from '../../models/Threats'

interface Props {
    threatId: number
    name: string
    description: string
    image: string
    count: number
    price: number
}

const ThreatCard: FC<Props> = ({threatId, name, description, image, count, price}) => {
    return (
    <Card className="card">
        <Card.Body className="card__content">                
            <h3 className="card__name"><Card.Title>{name}</Card.Title></h3>
            <div className="card_description"> {description}</div>
            <div className="card__statistics">
                <div className="card__statistics__header">Статистика</div>
                <div className="card__statistics__item">
                    Количество обнаружений за последний год: {count}</div>
                <div className="card__statistics__item">
                    Средняя цена мониторинга(месяц): {price}
                </div>
            </div>
        </Card.Body>
        <Card.Img className="card__image" src={image} />
    </Card>
    );
    }

export default ThreatCard;