import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "./Navbar.css"

interface Props {
    isAuthorized: boolean;
}


const Navbar: FC<Props> = ({isAuthorized}) => {
    return (
        <Container style={{borderBottom: "solid 0.5px rgb(46, 44, 44, 0.6)"}}>
            {isAuthorized ? <Row style={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
                <Col style={{ margin: "30px" }}>
                CyberThreats Monitoring
                </Col>
                <Col style={{ width: "70%", margin: "30px" }}>
                    Заявки
                </Col>
                <Col style={{ width: "70%", margin: "30px" }}>
                    Корзина
                </Col>
                <Col style={{ width: "70%", margin: "30px" }}>
                    Профиль
                </Col>
            </Row> : <Row style={{ display: "flex" , justifyContent: "space-between", backgroundImage: "background-image: linear-gradient(to bottom, #1a1b23, #1d1e26, #1f2028, #22232b, #25262e, #26272e, #26272e, #27282e, #26262b, #242427, #232324, #212121)"}}>
                <Col style={{ margin: "30px"}} className='navbar_title'>
                CyberThreats Monitoring
                </Col>
                <Col style={{ margin: "30px 10% 30px  30px" }} className="navbar_text">
                    Войти | Регистрация
                </Col>
            </Row>}
            
        </Container>
    )
}

export default Navbar;