import { useAuth } from '../../hooks/useAuth';
import { SplashScreen } from './loaders';
import { Landing } from '../landing/Landing';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const ProtectRoute = ({ children }) => {
    const { isPending, isAuthenticated } = useAuth();


    if (isPending) {
        return <SplashScreen />
    }

    return children;

}