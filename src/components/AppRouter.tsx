import { FC} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Threats from '../pages/home/ThreatsPage'
import ThreatPage from '../pages/threat/ThreatPage'
import LoginPage from '../pages/login/LoginPage'
import RegisterPage from '../pages/register/RegisterPage'
import Navbar from '../components/Navbar/Navbar'
import MyRequestsPage from '../pages/myRequests/MyRequestsPage'


const AppRouter: FC = () => {
    const router = createBrowserRouter(
        [
            {
                // parent route component
                element: <Navbar />,
                // child route components
                children: [
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
                    },
                    {
                        path: '/login',
                        element: <LoginPage />
                    },
                    {
                        path: '/register',
                        element: <RegisterPage />
                    },
                    {
                        path: '/requests',
                        element: <MyRequestsPage/>
                    }
                ],
            },
        ]
    )

    return (
        <RouterProvider router={router} />
    );
}

export default AppRouter;