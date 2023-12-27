import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "./OrderTable.css"
import { ModelsMonitoringRequest } from '../../api/Api'

interface Props {
    orders: ModelsMonitoringRequest[] | undefined
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

const OrderTable: FC<Props> = ({ orders }) => {
    return (
        <Container id="order-table" style={{ marginTop: "20px", marginBottom: "50px", width: "100%", position: "relative"}}>
            <Row className="order-table-header" style={{ display: "flex", padding: "15px" }}>
                <Col className="order-table-head" style={{ width: "25%" }}><h2>Номер</h2></Col>
                <Col className="order-table-head" style={{ width: "25%" }}><h2>Дата и время отправки</h2></Col>
                <Col className="order-table-head" style={{ width: "25%" }}><h2>Статус</h2></Col>
                <Col className="order-table-head" style={{ width: "25%" }}><h2>Ссылка</h2></Col>
            </Row>
            {orders?.map((order) => (
                <Row className="order-table-row" key={order.requestId} style={{ display: "flex", padding: "15px", backgroundColor: "#212121", borderTop: "2px groove black" }}>
                    <Col className="order-table-col" style={{ width: "25%" }}><h2>{order.requestId}</h2></Col> 
                    <Col className="order-table-col" style={{ width: "25%" }}><h2>{order.formationDate}</h2></Col>
                    <Col className="order-table-col" style={{ width: "25%" }}><h2>{getStatus(order.status)}</h2></Col>
                    <Col className="order-table-col" style={{ width: "25%" }}><a href={`/orders/${order.requestId}`}><h2>посмотреть</h2></a></Col>
                </Row>
            ))}
        </Container>
    )
}

export default OrderTable;