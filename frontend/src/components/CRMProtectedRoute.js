import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useCRMState } from '../CrmContext';

function CRMProtectedRoute({ element: Element, ...rest }) {
    const { crmLoggedIn } = useCRMState();

    return (
        <Route
            {...rest}
            element={crmLoggedIn ? (
                <Element />
            ) : (
                <Navigate to="/crm/login" replace />
            )}
        />
    );
}

export default CRMProtectedRoute;