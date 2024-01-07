import { FC, useEffect, useState, useMemo } from "react"
import { Col, Container, Row } from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from "react-redux";


import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import OrderTable from '../../components/OrderTable/OrderTable';
import FilterOrderStatus from '../../components/FilterOrderStatus/FilterOrderStatus';
import Loader from '../../components/Loader/Loader.tsx';
import { api } from '../../api/index'
import DateFilter from "../../components/DateFilter/DateFilter";
import { ModelsMonitoringRequest } from "../../api/Api.ts";
import {
    setEndDate,
    setStartDate,
    setStatusFilter
} from "../../store/filterRequest.ts";
import { useRequestFilter } from "../../hooks/useRequestFilter.ts";


export type Filter = {
    Canceled: boolean;
    Accepted: boolean;
    Formated: boolean;
}


const MyRequestsPage: FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const { is_authenticated, resetUser } = useAuth()
    const [response, setResponse] = useState<ModelsMonitoringRequest[]>()
    const { canceled, formated, accepted, startDateState, endDateState } = useRequestFilter();
    const [filter, setFilter] = useState({ Accepted: accepted, Canceled: canceled, Formated: formated })
    const dispatch = useDispatch();

    const handleFilterChange = (newFilter: Filter) => {
        setFilter(newFilter)
        dispatch(setStatusFilter(newFilter));
    };

    const handleStartDateChange = (date: Date) => {
        dispatch(setStartDate(date));
    }

    const handleEndDateChange = (date: Date) => {
        dispatch(setEndDate(date));
    }


    const getFilterStatusParams = () => {
        if (filter.Canceled) {
            return 'canceled'
        }
        if (filter.Accepted) {
            return 'accepted'
        }
        if (filter.Formated) {
            return 'formated'
        }
        return ''
    }

    const getOrders = async () => {
        const response = await api.api.monitoringRequestsList({ status: getFilterStatusParams(), start_date: startDateState ? startDateState.toISOString().replace(/T/, ' ').replace(/\..+/, '') : "", end_date: endDateState ? endDateState.toISOString().replace(/T/, ' ').replace(/\..+/, '') : "" })
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

    if (response && !loading && response.length == 0 && !filter.Accepted && !filter.Canceled && !filter.Formated) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Вы не совершили ни одного заказа</h1>
            </Container>
        )
    }

    return (
        <> {loading ? <Loader /> :
            <div className="site-body">
                <Container style={{ width: "100%" }}>
                    <Row>
                        <Breadcrumbs pages={[{ link: `/orders`, title: `Мои заявки` }]} />
                    </Row>
                    <Row style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
                        <Col>
                            <DateFilter
                                startDate={startDateState}
                                setStartDate={handleStartDateChange}
                                endDate={endDateState}
                                setEndDate={handleEndDateChange}
                                send={getOrders}
                            />
                        </Col>
                        <Col>
                            <FilterOrderStatus state={filter} handleFilterChange={handleFilterChange} />
                        </Col>
                    </Row>
                    <Row>
                        <OrderTable orders={response} />
                    </Row>
                </Container>
            </div>
        }</>
    )
}

export default MyRequestsPage