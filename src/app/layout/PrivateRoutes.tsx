import { useAppSelector } from "../store/configureStore";
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoutes() {
    const { user } = useAppSelector(state => state.auth);

    return (
        user ? <Outlet /> : <Navigate to='/login'/>
    );
}