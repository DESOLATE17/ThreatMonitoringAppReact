import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "./OrderTable.css"
import { ModelsMonitoringRequest } from '../../api/Api'

interface Props {
    orders: ModelsMonitoringRequest[] | undefined
    is_moderator: boolean
    processStatusUpdate: (requestId: number | undefined, newStatus: 'accepted' | 'canceled') => Promise<any>
}

const getStatus = (status: string | undefined) => {
    if (status === "closed") {
        return "завершена"
    }
    if (status === "canceled") {
        return "отклонена"
    }
    if (status === "accepted") {
        return "принята"
    }
    return "сформирована"
}

const getDate = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.toLocaleDateString('ru')} ${dateObj.toLocaleTimeString('ru')}`;
}

const getStatusColor = (status: string | undefined) => {
    if (status == 'accepted') {
        return "rgb(165, 255, 145)"
    } else if (status == 'canceled') {
        return "rgb(237, 104, 137)"
    } else if (status == 'formated') {
        return "rgb(250, 246, 136)"
    } else {
        return "white"
    }
}

const OrderTable: FC<Props> = ({ orders, is_moderator, processStatusUpdate }) => {
    return (
        <div>
            {is_moderator ? <Container id="order-table" style={{ marginTop: "20px", marginBottom: "50px", width: "100%" }}>
                <Row className="order-table-header" style={{ display: "flex", padding: "15px" }}>
                    <Col className="order-table-head" style={{ width: "12%" }}><h2>Номер</h2></Col>
                    <Col className="order-table-head" style={{ width: "20%" }}><h2>Пользователь</h2></Col>
                    <Col className="order-table-head" style={{ width: "24%" }}><h2>Дата и время отправки</h2></Col>
                    <Col className="order-table-head" style={{ width: "12%" }}><h2>Статус</h2></Col>
                    <Col className="order-table-head" style={{ width: "12%" }}><h2>Оплата</h2></Col>
                    <Col className="order-table-head" style={{ width: "20%" }}><h2>Действия</h2></Col>
                </Row>
                {orders?.map((order, index) => (
                    <Row className="order-table-row" key={index} style={{ display: "flex", padding: "15px",  borderTop: "2px groove black" }}>
                        <Col className="order-table-col" style={{ width: "12%" }}><h2>{order.requestId}</h2></Col>
                        <Col className="order-table-col" style={{ width: "20%" }}><h2>{order.creator}</h2></Col>
                        <Col className="order-table-col" style={{ width: "24%" }}><h2>{getDate(order.formationDate ? order.formationDate : "")}</h2></Col>
                        <Col className="order-table-col" style={{ width: "12%" }}><h2>{getStatus(order.status)}</h2></Col>
                        <Col className="order-table-col" style={{ width: "12%" }}><h2>{order.receipt}</h2></Col>
                        <Col className="order-table-col" style={{ width: "20%", display: "flex", flexDirection: "column" }}>
                            <a href={`/orders/${order.requestId}`}><h2>Посмотреть</h2></a>  
                            {order.status == 'formated' &&
                                <div style={{ display: "flex" }}>
                                    <button className="accept-button" onClick={() => processStatusUpdate(order.requestId, 'accepted')}>Принять</button>
                                    <button className="reject-button" onClick={() => processStatusUpdate(order.requestId, 'canceled')}>Отклонить</button>
                                </div>}
                        </Col>  
                    </Row>
                ))}
            </Container> : <Container id="order-table" style={{ marginTop: "20px", marginBottom: "50px", width: "100%", position: "relative" }}>
                <Row className="order-table-header" style={{ display: "flex", padding: "15px" }}>
                    <Col className="order-table-head" style={{ width: "25%" }}><h2>Номер</h2></Col>
                    <Col className="order-table-head" style={{ width: "25%" }}><h2>Дата и время отправки</h2></Col>
                    <Col className="order-table-head" style={{ width: "25%" }}><h2>Статус</h2></Col>
                    <Col className="order-table-head" style={{ width: "25%" }}><h2>Ссылка</h2></Col>
                </Row>
                {orders?.map((order) => (
                    <Row className="order-table-row" key={order.requestId} style={{ display: "flex", padding: "15px", backgroundColor: "#212121", borderTop: "2px groove black" }}>
                        <Col className="order-table-col" style={{ width: "25%" }}><h2>{order.requestId}</h2></Col>
                        <Col className="order-table-col" style={{ width: "25%" }}><h2>{getDate(order.formationDate ? order.formationDate : "")}</h2></Col>
                        <Col className="order-table-col" style={{ width: "25%" }}><h2>{getStatus(order.status)}</h2></Col>
                        <Col className="order-table-col" style={{ width: "25%" }}><a href={`/requests/${order.requestId}`}><h2>Посмотреть</h2></a></Col>
                    </Row>
                ))}
            </Container>
            }
        </div>

    )
}

export default OrderTable;