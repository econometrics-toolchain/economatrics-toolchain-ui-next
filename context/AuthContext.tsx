import { createContext, useEffect, useState } from "react";
import * as auth from '../utils/services';

const bootstrap = async () => {
    let user = null;
    let error = null;
    let status = 'pending';
    const token = await auth.getToken();

    if (token) {
        try {
            user = await auth.getCurrentUser();
            status = 'success'
        } catch (e) {
            status = 'error';
            error = 'error';
        }
    } else {
        status = 'error'
    }

    return [user, error, status];
}
export const AuthContext = createContext(null);

const AuthProvider = (props) => {
    const [state, setState] = useState({
        status: 'pending',
        error: null,
        user: null,
    })

    useEffect(() => {
        async function bootstrapApp() {
            const [user, error, status] = await bootstrap();
            setState({
                status: status,
                error: error,
                user: user,
            })
        }
        bootstrapApp();

    }, [])

    const login = async (email, password) => {
        setState({
            status: 'pending',
            error: null,
            user: null,
        })
        await auth.login(email, password);
        const [user, error, status] = await bootstrap();
        setState({
            status: status,
            error: error,
            user: user,
        })
    }

    const logout = async () => {
        await auth.logout();
        const [user, error, status] = await bootstrap();
        setState({
            status: status,
            error: error,
            user: user,
        })
    }

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export { AuthProvider }