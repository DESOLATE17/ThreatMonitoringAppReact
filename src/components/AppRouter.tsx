import { FC} from 'react'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import Threats from '../pages/home/ThreatsPage'
import ThreatPage from '../pages/threat/ThreatPage'


const AppRouter: FC = () => {
    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: <Threats />
            },
            {
                path: '/threats',
                element: <Threats />
            },
            {
                path: '/threats/:threatId',
                element: <ThreatPage />
            }
        ]
    )

    return (
        <RouterProvider router={router} />
    );
}

export default AppRouter;