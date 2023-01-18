import React from 'react'
import { Navigate } from 'react-router-dom'
import { store } from "./index";

function Protected({ children }) {
    let proname = store.getState().id;

    if (!proname) {
        return <Navigate to="/" replace />
    }
    return children
}
export default Protected