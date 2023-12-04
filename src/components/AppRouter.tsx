import { FC} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
            },
            {
                path: '*',
                element: <Threats />
            }
        ]
    )

    return (
        <RouterProvider router={router} />
    );
}

export default AppRouter;