import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext)
    const isPending = context.state.status === 'pending'
    const isError = context.state.status === 'error'
    const isSuccess = context.state.status === 'success'
    const isAuthenticated = context.state.user && isSuccess

    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return {
        ...context,
        isPending,
        isError,
        isSuccess,
        isAuthenticated,
    }
}