import { FC, useEffect, useState } from "react"
import { Col, Container, Row } from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import OrderTable from '../../components/OrderTable/OrderTable';
import FilterOrderStatus from '../../components/FilterOrderStatus/FilterOrderStatus';
import Loader from '../../components/Loader/Loader.tsx';
import {api} from '../../api/index'
import DateFilter from "../../components/DateFilter/DateFilter";
import { ModelsMonitoringRequest } from "../../api/Api.ts";


export type Filter = {
    Canceled: boolean;
    Accepted: boolean;
    Closed  : boolean;
    Formated: boolean;
}


const MyRequestsPage: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)
    const { is_authenticated, resetUser } = useAuth()
    const [ response, setResponse ] = useState<ModelsMonitoringRequest[]> ()

    const [filter, setFilter] = useState<Filter> ({
        Canceled: false,
        Accepted: false,
        Closed  : false,
        Formated: false,
    });

    const [ startDate, setStartDate ] = useState<Date | undefined> ()
    const [ endDate, setEndDate ] = useState<Date | undefined> ()
    
    const handleFilterChange = (newFilter: Filter) => {
        setFilter(newFilter);
    };

    const getFilterStatusParams = () => {
        if (filter.Canceled) {
            return 'canceled'
        }
        if (filter.Accepted) {
            return 'accepted'
        }
        if (filter.Closed) {
            return 'closed'
        }
        if (filter.Formated) {
            return 'formated'
        }
        return ''
    }

    const getOrders = async () => {
        const response = await api.api.monitoringRequestsList({status: getFilterStatusParams(), start_date: startDate?.toISOString().replace(/T/, ' ').replace(/\..+/, ''), end_date: endDate?.toISOString().replace(/T/, ' ').replace(/\..+/, '')})
        if (response.status == 200) {
            setResponse(response.data)
        } 

        if (response.status == 403) {
            resetUser()
        }
    }

    useEffect(() => {
        getOrders().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [filter])

    if (!is_authenticated && !loading) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Войдите в аккаунт, чтобы посмотреть список заказов</h1>
            </Container>
        )
    }

    if (response && !loading && response.length == 0) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Вы не совершили ни одного заказа</h1>
            </Container>
        )
    }

    return (
        <> {loading ? <Loader /> :
        <div className="site-body">
        <Container  style={{width: "100%"}}>
            <Row>
                <Breadcrumbs pages={[ { link: `/orders`, title: `Мои заявки` } ]} />
            </Row>
            <Row style={{ display: "flex" , flexDirection: "row", marginTop: "20px"}}>
                <Col>
                <DateFilter
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    send={getOrders}
                />
                </Col>
                <Col>
                    <FilterOrderStatus state={filter} handleFilterChange={handleFilterChange} />
                </Col>
            </Row>
            <Row>
                <OrderTable orders={response}/>
            </Row>
        </Container>
        </div>
        }</>
    )
}

export default MyRequestsPage