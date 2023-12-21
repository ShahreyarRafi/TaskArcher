import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Root from "../Layout/Root";
import Home from "../Pages/HomePage/Home";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import ContactUsPage from "../Pages/ContactUsPage/ContactUsPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AboutUsPage from "../Pages/AboutUsPage/AboutUsPage";
import UserDashboard from "../Dashboards/User/UserDashboard/UserDashboard";
import UserProfile from "../Dashboards/User/UserProfile/UserProfile";
import AdminDashboard from "../Dashboards/Admin/AdminDashboard/AdminDashboard";
import AdminProfile from "../Dashboards/Admin/AdminProfile/AdminProfile";
import Tasks from "../Dashboards/User/Tasks/Tasks";





const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('https://campus-cuisine.vercel.app/meals')
            },
            {
                path: 'register',
                element: <RegisterPage></RegisterPage>
            },
            {
                path: 'login',
                element: <LoginPage></LoginPage>
            },
            {
                path: 'contact-us',
                element: <ContactUsPage></ContactUsPage>
            },
            {
                path: 'about-us',
                element: <AboutUsPage></AboutUsPage>
            },
        ]
    },
    {
        path: 'dashboard',
        element: (
            <PrivateRoute>
                <UserDashboard></UserDashboard>
            </PrivateRoute>
        ),
        children: [
            {
                path: 'user/profile',
                element: (<PrivateRoute><UserProfile></UserProfile></PrivateRoute>)
            },
            {
                path: 'user/tasks',
                element: (<PrivateRoute><Tasks></Tasks></PrivateRoute>)
            },
        ]
    },
    {
        path: 'admin/dashboard',
        element: (
            <PrivateRoute>
                <AdminDashboard></AdminDashboard>
            </PrivateRoute>
        ),
        children: [
            {
                path: 'admin-profile',
                element: (<PrivateRoute><AdminProfile></AdminProfile></PrivateRoute>),
            },
        ]
    },
])

export default router