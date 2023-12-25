import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"

import { Container, Row, Col } from "react-bootstrap"
import "./RegisterPage.css"


const RegisterPage: FC = () => {
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleRegister = async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const response = await register(formData)
        if (response.status == 200) {
            navigate("/login")
        }
    }

    return (
        <div className="site-body">
        <Container>
            <Row>
                {<Breadcrumbs pages={[ { link: `/register`, title: "Регистрация" } ]} />}
            </Row>
            <Row>
                <Container style={{ marginLeft: "30px", marginTop: "30px", width: "360px"}}>
                    <Row style={{ display: "flex" }}>
                        <h1 style={{ fontSize: "36px", fontWeight: "500" }}>Регистрация</h1>
                    </Row>
                    <form onSubmit={ handleRegister } id="login-form" style={{ marginTop: "30px" }}>
                        <Row>
                            <Col className="left-col">
                                <h3>Логин пользователя</h3>
                            </Col>
                            <Col className="right-col">
                                <input type="text" className="input-form" name="username" placeholder="Введите логин пользователя" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="left-col">
                                <h3>Пароль</h3>
                            </Col>
                            <Col className="right-col">
                                <input type="password" className="input-form" name="password" placeholder="Введите пароль" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="left-col"></Col>
                            <Col className="right-col" style={{marginTop: "24px"}}>
                                <button id="register-button" className="login-button" type="submit">Зарегистрироваться</button>
                            </Col>
                        </Row>
                    </form>
                    <a href="/login" className="form-link"><h3>Вход в аккаунт</h3></a>

                </Container>
            </Row>
            
        </Container>
        </div>
    )
}

export default RegisterPage;