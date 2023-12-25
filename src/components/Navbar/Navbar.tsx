import { FC, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "./Navbar.css"
import { useAuth } from '../../hooks/useAuth';
import { Outlet, useNavigate } from 'react-router-dom';
import { api } from '../../api';

const Navbar: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)
    const { is_authenticated, auth, resetUser } = useAuth()
    const navigate = useNavigate()

    const getData = async () => {
        await auth()
    }

    const handleClick = async (e: any) => {
        e.preventDefault()
        const response = await api.api.logoutCreate();

        if (response.status == 200) {
            resetUser();
            navigate("/")
        }
    }

    useEffect(() => {
        getData().then(() => {
            console.log(is_authenticated)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            resetUser();
            setLoading(false)
        })
    }, []);

    return (
        <div>
        <Container style={{borderBottom: "solid 0.5px rgb(46, 44, 44, 0.6)"}}>
            {is_authenticated ? <Row style={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
                <Col style={{ width: "30%", marginTop: "30px"}} className='navbar_title'>
                CyberThreats Monitoring
                </Col>
                <Col style={{ width: "20%", margin: "30px", display: "flex", justifyContent: "space-between", marginRight: "10%" }} className="navbar_text">
                    <a className="navbar_text" href="/requests">Заявки</a>
                    <button className="navbar_text" style={{backgroundColor: " #212121", border: 0}} onClick={handleClick}>Выйти</button>
                </Col>
            </Row> : <Row style={{ display: "flex" , justifyContent: "space-between", backgroundImage: "background-image: linear-gradient(to bottom, #1a1b23, #1d1e26, #1f2028, #22232b, #25262e, #26272e, #26272e, #27282e, #26262b, #242427, #232324, #212121)"}}>
                <Col style={{ margin: "30px"}} className='navbar_title'>
                CyberThreats Monitoring
                </Col>
                <Col style={{ margin: "30px 10% 30px  30px" }} className="navbar_text">
                    <a className="navbar_text" href="/login">Войти | Регистрация</a>
                </Col>
            </Row>}
        </Container>
        <Outlet />
        </div>
    )
}

export default Navbar;
