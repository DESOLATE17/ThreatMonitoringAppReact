import { FC } from 'react'
import {Container, Row} from 'react-bootstrap'
import './Breadcrumbs.css'
import { Link } from 'react-router-dom'

interface BreadcrumbsProps {
    link: string,
    title: string
}


const Breadcrumbs: FC<{ pages: BreadcrumbsProps[] }> = ({ pages }) =>  (
    <Container id="breadcrumbs">
        <Row>
            <Link to={`/ThreatMonitoringAppReact/`} style={{ textDecoration: "None" }} className='breadcrumb-name'>Список угроз</Link>
            {pages && pages.map((page) => (
                <Link to={ page.link } style={{ textDecoration: "None"}} className='breadcrumb-name'>{ " / " + page.title }</Link>
            ))}
        </Row>
    </Container>
)

export default Breadcrumbs