import React, { createContext, useReducer, useContext } from 'react';

const CRMStateContext = createContext();
const CRMDispatchContext = createContext();

const initialState = {
    crmLoggedIn: false,
    crmToken: null,
    crmUser: null,
};

function crmReducer(state, action) {
    switch (action.type) {
        case 'crmLogin':
            return {
                ...state,
                crmLoggedIn: true,
                crmToken: action.payload.token,
                crmUser: action.payload.user,
            };
        case 'crmLogout':
            return {
                ...state,
                crmLoggedIn: false,
                crmToken: null,
                crmUser: null,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function CRMProvider({ children }) {
    const [state, dispatch] = useReducer(crmReducer, initialState);

    return (
        <CRMStateContext.Provider value={state}>
            <CRMDispatchContext.Provider value={dispatch}>
                {children}
            </CRMDispatchContext.Provider>
        </CRMStateContext.Provider>
    );
}

function useCRMState() {
    const context = useContext(CRMStateContext);
    if (context === undefined) {
        throw new Error('useCRMState must be used within a CRMProvider');
    }
    return context;
}

function useCRMDispatch() {
    const context = useContext(CRMDispatchContext);
    if (context === undefined) {
        throw new Error('useCRMDispatch must be used within a CRMProvider');
    }
    return context;
}

export { CRMProvider, useCRMState, useCRMDispatch };