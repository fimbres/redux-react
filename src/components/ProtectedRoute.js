import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const location = useLocation();
    const currentUser = useSelector(state => state.auth.currentUser);

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
}
