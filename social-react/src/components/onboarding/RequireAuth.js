import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../slices/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from '../common/Header';

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    return (
        token ? <><Header /><Outlet /></> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth