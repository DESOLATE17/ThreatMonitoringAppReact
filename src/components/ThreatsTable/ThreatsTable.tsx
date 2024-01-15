import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import '../../../public/default.jpeg'
import "./ThreatsTable.css"
import ImageWrapper from '../ImageWrapper/ImageWrapper'


interface ThreatsTableItem {
    threatId: number,
    title: string,
    price: number,
    count: number,
    deleted: boolean,
    image: string
}

interface Props {
    products: ThreatsTableItem[]
}

const ThreatsTable: FC<Props> = ({ products }) => {
    const navigate = useNavigate()

    const getTextStatus = (product: ThreatsTableItem) => {
        return (product.deleted ? 'Удалена' : 'Доступна')
    }

    return (
        <Container id="product-table" style={{ marginTop: "30px", marginBottom: "50px", width: "100%" }}>
            <Row className="product-table-header" style={{ display: "flex", padding: "15px" }}>
                <Col className="product-table-head" style={{ width: "20%" }}><h2>Название</h2></Col>
                <Col className="product-table-head" style={{ width: "13%" }}><h2>Цена</h2></Col>
                <Col className="product-table-head" style={{ width: "13%" }}><h2>Кол-во обнаружений</h2></Col>
                <Col className="product-table-head" style={{ width: "13%" }}><h2>Статус</h2></Col>
                <Col className="product-table-head" style={{ width: "28%" }}><h2>Картинка</h2></Col>
                <Col className="product-table-head" style={{ width: "13%" }}><h2>Действия</h2></Col>
            </Row>
            {products.map((product, index) => (
                <Row className="product-table-row" key={index} style={{ display: "flex", padding: "15px", borderTop: "2px groove black" }}>
                    <Col className="product-table-col" style={{ width: "20%" }}><h2>{product.title}</h2></Col>
                    <Col className="product-table-col" style={{ width: "13%" }}><h2>{product.price} ₽</h2></Col>
                    <Col className="product-table-col" style={{ width: "13%" }}><h2>{product.count} </h2></Col>
                    <Col className="product-table-col" style={{ width: "13%", display: "flex", flexDirection: "column" }}>
                        <h2>{getTextStatus(product)}</h2>
                    </Col>
                    <Col className="product-table-col" style={{ width: "28%" }}><div><ImageWrapper className="product-table-image" src={product.image} based="/default.jpeg" /></div></Col>
                    <Col className="product-table-col" style={{ width: "13%", display: "flex", flexDirection: "column" }}>
                        {product.deleted ? <div></div> : <Link to={`/threats/${product.threatId}`}><h2>Посмотреть</h2></Link>}
                        <button className="search-button cart-button update-button"
                            onClick={() => navigate(`/threats/update/${product.threatId}`)}>Изменить</button>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default ThreatsTable;