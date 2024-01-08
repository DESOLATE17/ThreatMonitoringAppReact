import { FC, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { Container, Row } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductTable from "../../components/ThreatsTable/ThreatsTable";
import { useNavigate } from "react-router-dom";
import { ModelsThreat } from "../../api/Api";
import { api } from "../../api/index";

const ThreatsTablePage: FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const { is_moderator } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [threats, setThreats] = useState<ModelsThreat[]>([]);

    !is_moderator && navigate('/')

    const getAllThreats = async () => {
        setLoading(true);
        const response = await api.api.threatsList();

        setThreats(response.data.threats);;
        setLoading(false);
    };

    useEffect(() => {
        getAllThreats().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [dispatch])

    const getTransformedData = (threats: ModelsThreat[]) => {
        let result: any = []
        threats.map((threat) => {
            result.push({
                threatId: threat.threatId,
                title: threat.name,
                price: threat.price,
                count: threat.count,
                deleted: threat.isDeleted,
                image: threat.image
            })
        })
        return result
    }

    return (
        <> {loading ? <Loader /> :
            <div className="site-body">
                <Container>
                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Breadcrumbs pages={[{ link: `/threats/table`, title: "Таблица угроз" }]} />
                        <button
                            style={{
                                width: "200px",
                                backgroundColor: "rgb(46, 44, 44, 0.6)",
                                fontSize: "1.25em",
                            }}
                            className="search-button cart-button"
                            onClick={() => { navigate('/threats/update/0'); }}
                        >
                            Добавить услугу
                        </button>
                    </Row>
                    <Row style={{ display: "flex" }}>
                        <ProductTable
                            products={getTransformedData(threats)}
                        />
                    </Row>
                </Container>
            </div>
        }</>
    )
}

export default ThreatsTablePage;