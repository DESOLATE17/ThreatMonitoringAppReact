import { FC } from 'react'
import {Container, Row} from 'react-bootstrap'
import './Breadcrumbs.css'

interface BreadcrumbsProps {
    link: string,
    title: string
}


const Breadcrumbs: FC<{ pages: BreadcrumbsProps[] }> = ({ pages }) =>  (
    <Container id="breadcrumbs">
        <Row>
            <a href={`/`} style={{ textDecoration: "None" }} className='breadcrumb-name'>Список угроз</a>
            {pages && pages.map((page) => (
                <a href={ page.link } style={{ textDecoration: "None"}} className='breadcrumb-name'>{ " / " + page.title }</a>
            ))}
        </Row>
    </Container>
)

export default Breadcrumbs