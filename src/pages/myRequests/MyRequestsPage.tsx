import { FC, useEffect, useState, useMemo } from "react"
import { Col, Container, Row } from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useStore } from "react-redux";
import InputField from "../../components/Search/Search";
import { useQuery } from "react-query";

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import OrderTable from '../../components/OrderTable/OrderTable';
import FilterOrderStatus from '../../components/FilterOrderStatus/FilterOrderStatus';
import Loader from '../../components/Loader/Loader.tsx';
import { api } from '../../api/index'
import DateFilter from "../../components/DateFilter/DateFilter";
import { ModelsMonitoringRequest, ModelsNewStatus } from "../../api/Api.ts";
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
    const { is_authenticated, resetUser, is_moderator } = useAuth()
    const [response, setResponse] = useState<ModelsMonitoringRequest[]>()
    const { canceled, formated, accepted, startDateState, endDateState } = useRequestFilter();
    const [filter, setFilter] = useState({ Accepted: accepted, Canceled: canceled, Formated: formated })
    //@ts-ignore
    const [ login, setLogin ] = useState<string> (useStore().getState().filterRequest.login)
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

    const filterByUsername = (orders: ModelsMonitoringRequest[], loginFilter: string) => {
        console.log('фильтрую по', loginFilter)
        if (loginFilter == undefined || loginFilter == "") {
            return orders
        }
        return orders.filter((order) => {
            return order.creator?.toLowerCase().includes(loginFilter.toLowerCase())
        })
    }

    const processStatusUpdate = async (requestId: number | undefined, newStatus: 'accepted' | 'canceled') => {
        try {
            const id: number = requestId ? requestId : 0
            const status: ModelsNewStatus = { status: newStatus }
            await api.api.monitoringRequestsAdminUpdate(id, status)
        } catch {
            console.log("Что-то пошло не так")
        }
    }

    const getRequests = async () => {
        const response = await api.api.monitoringRequestsList({ status: getFilterStatusParams(), start_date: startDateState ? startDateState.toISOString().replace(/T/, ' ').replace(/\..+/, '') : "", end_date: endDateState ? endDateState.toISOString().replace(/T/, ' ').replace(/\..+/, '') : "" })
        if (response.status == 200) {
            setResponse(filterByUsername(response.data, login))
        }

        if (response.status == 403) {
            resetUser()
        }
    }

        useQuery('monitoring-requests', getRequests, { refetchInterval: 3000 });

    useEffect(() => {
        getRequests().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [filter, login])

    if (!is_authenticated && !loading) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Войдите в аккаунт, чтобы посмотреть список заказов</h1>
            </Container>
        )
    }

    if (response && !loading && response.length == 0 && !filter.Accepted && !filter.Canceled && !filter.Formated && login == "" || login == undefined) {
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
                                send={getRequests}
                            />
                        </Col>
                        <Col>
                            <FilterOrderStatus state={filter} handleFilterChange={handleFilterChange} />
                        </Col>
                        <Col style={{marginLeft : "20px"}}>
                        <div>Логин пользователя</div>
                        <div>
                        <InputField
                            value={login}
                            setValue={(value) => {
                                console.log(login, value)
                                setLogin(value)
                            }}
                        />
                        </div>
                        </Col>
                    </Row>
                
                    <Row>
                        <OrderTable orders={response} is_moderator={is_moderator} processStatusUpdate={processStatusUpdate} />
                    </Row>
                </Container>
            </div>
        }</>
    )
}

export default MyRequestsPage