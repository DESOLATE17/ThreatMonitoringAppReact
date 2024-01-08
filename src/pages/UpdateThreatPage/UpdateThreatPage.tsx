import { ChangeEvent, FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Loader from '../../components/Loader/Loader.tsx';
import { ModelsThreat } from "../../api/Api.ts";
import { api } from "../../api/index"
import './UpdateThreatPage.css'

const emptyThreat: ModelsThreat = {
    count: 0,
    description: "",
    image: "",
    isDeleted: false,
    name: "",
    price: 0,
    summary: "",
    threatId: 0,
}

interface formDataThreat {
    name: string;
    description: string | undefined;
    summary: string | undefined;
    count: string;
    price: string;
    image: File | undefined;
}

const convertToFormData = (values: ModelsThreat, image: File | undefined | null) => {
    if (image) {
        const data: formDataThreat = { name: (values.name ? "" + values.name : ""), description: values.description, count: (values.count ? "" + values.count : "0"), price: values.price ? "" + values.price : "0", image: image, summary: values.summary }
        return data
    }

    const data: formDataThreat = { name: (values.name ? "" + values.name : ""), description: values.description, count: (values.count ? "" + values.count : "0"), price: values.price ? "" + values.price : "0", summary: values.summary, image: undefined }
    return data
}

const UpdateThreatPage: FC = () => {
    const threatId = Number(useParams().threatId);
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const { is_moderator } = useAuth()
    const pageTitle = (threatId ? 'Изменение угрозы' : 'Добавление угрозы')
    const [values, setValues] = useState<ModelsThreat>(emptyThreat)
    const [image, setImage] = useState<File | null>(null);

    const [uploadedImage, setUploadedImage] = useState<string | undefined>()

    !is_moderator && navigate('/threats')

    const getThreatById = async () => {
        const response = await api.api.threatsDetail(threatId ? +threatId : 1)
        if (response.status == 200) {
            setValues(response.data)
            setUploadedImage(response.data.image)
        }
    }

    useEffect(() => {
        if (threatId) {

            getThreatById().then(() => {
                setLoading(false)
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            })

        }

        setLoading(false)
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (threatId) {
            try {
                const response = await api.api.threatsUpdate(threatId ? +threatId : 1, convertToFormData(values, image))
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await api.api.threatsCreate(convertToFormData(values, image))
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        navigate('/threats/table')

    };

    return (
        <> {loading ? <Loader /> :
            <div className="site-body">
                <Container style={{ width: "100%" }}>
                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Breadcrumbs pages={[{ link: '/threats/table', title: "Таблица угроз" }, { link: window.location.pathname, title: pageTitle }]} />
                        <button
                            style={{
                                width: "200px",
                                backgroundColor: "rgb(46, 44, 44, 0.6)",
                                fontSize: "1.25em",
                            }}
                            className="search-button cart-button"
                            onClick={async () => { 
                                await api.api.threatsDelete(threatId);
                                navigate('/threats/table') 
                             }}
                        >
                            Удалить услугу
                        </button>
                    </Row>
                    <form onSubmit={handleSubmit}>
                        <Container id="product-form" style={{ marginTop: "30px" }}>
                            <Row style={{ display: "flex", width: "100%" }}>
                                <Col id="product-form-main" style={{ width: "40%" }}>
                                    <Row>
                                        <h2>Основные данные</h2>
                                    </Row>
                                    <Row style={{alignItems: "center"}}>
                                        <div className="left-column"><label htmlFor="name">Название*</label></div>
                                        <textarea
                                            id="name"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            className="custom-text"
                                            required
                                        />
                                    </Row>
                                    <Row style={{alignItems: "center"}}>
                                        <div className="left-column"><label htmlFor="summary">Краткая информация</label></div>
                                        <textarea
                                            id="summary"
                                            name="summary"
                                            value={values.summary}
                                            onChange={handleChange}
                                            className="custom-text"
                                            style={{ height: "80px" }}

                                        />
                                    </Row>
                                    <Row style={{alignItems: "center"}}>
                                        <div className="left-column"><label htmlFor="description">Описание</label></div>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            className="custom-text"
                                            style={{ height: "150px" }}

                                        />
                                    </Row>
                                    <Row style={{alignItems: "center"}}>
                                        <div className="left-column"><label htmlFor="price">Цена*</label></div>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={values.price}
                                            className="custom-input"
                                            onChange={handleChange}
                                            required
                                        />
                                    </Row>
                                    <Row style={{alignItems: "center"}}>
                                        <div className="left-column"><label htmlFor="count">Количество обнаружений за год</label></div>
                                        <input
                                            type="number"
                                            id="count"
                                            name="count"
                                            value={values.count}
                                            className="custom-input"
                                            onChange={handleChange}

                                        />
                                    </Row>
                                    <Row>
                                        <div className="left-column"><label htmlFor="isDeleted">Статус</label></div>
                                        <div style={{ marginLeft: "-17%" }}>{values.isDeleted ? "Удалена" : "Доступна"}</div>
                                    </Row>
                                </Col>
                                <Col id="product-form-image" style={{ width: "28%" }}>
                                    <Row>
                                        <h2>Изображение</h2>
                                    </Row>
                                    <Row style={{ flexDirection: "column"}}>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={handleFileChange}
                                            className="image-picker"
                                            style={{ gap: "10px" }}
                                        />
                                        <div style={{ width: "80%" }}>
                                            <img src={uploadedImage} alt="" style={{ width: "100%", border: "1px solid grey", borderRadius: "10px", marginTop: "30px" }} />
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <button id="product-form-submit-button" type="submit">Сохранить</button>
                            </Row>
                        </Container>
                    </form>
                </Container>
            </div>
        }</>
    )
}

export default UpdateThreatPage