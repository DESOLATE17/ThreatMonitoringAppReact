import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import "./ThreatsTable.css"
import ImageWrapper from '../ImageWrapper/ImageWrapper'


interface ThreatsTableItem {
    threatId: number,
    title: string,
    price: number,
    count: number,
    status: string,
    image: string
}

interface Props {
    products: ThreatsTableItem[]
    deleteProduct: (id: number) => Promise<any>
}

const ThreatsTable: FC<Props> = ({ products, deleteProduct }) => {
    const navigate = useNavigate()

    const getTextStatus = (product: ThreatsTableItem) => {
        return (product.status == 'deleted' ? 'удалён' : 'активен')
    }

    return (
        <Container id="product-table" style={{ marginTop: "30px", marginBottom: "50px", width: "95%", marginLeft: "1%" }}>
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
                    <Col className="product-table-col" style={{ width: "13%" }}><h2>{product.count} шт.</h2></Col>
                    <Col className="product-table-col" style={{ width: "13%", display: "flex", flexDirection: "column" }}>
                        <h2>{getTextStatus(product)}</h2>
                        {product.status == 'N' ?
                            <button className="activate-product-button" onClick={() => deleteProduct(product.threatId)}>Вернуть</button> :
                            <button className="delete-product-button" onClick={() => deleteProduct(product.threatId)}>Удалить</button>}
                    </Col>
                    <Col className="product-table-col" style={{ width: "28%" }}><div><ImageWrapper className="product-table-image" src={product.image} based="/default.jpg" /></div></Col>
                    <Col className="product-table-col" style={{ width: "13%", display: "flex", flexDirection: "column" }}>
                        <a href={`/products/${product.threatId}`}><h2>посмотреть</h2></a>
                        <button className="update-product-button" onClick={() => navigate(`/products/${product.threatId}/update`)}>Изменить</button>
                    </Col>
                </Row>
            ))}
        </Container>
    )
}

export default ThreatsTable;