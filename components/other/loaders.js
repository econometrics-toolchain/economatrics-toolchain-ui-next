import { CircularProgress } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

export const MySheetsSkeleton = () => {
    return (
        <div style={{ width: '100%' }}>
            <Skeleton animation="wave" variant="text" height={50} />
            <Skeleton animation="wave" variant="text" height={50} />
            <Skeleton animation="wave" variant="text" height={50} />
            <Skeleton animation="wave" variant="text" height={50} />
            <Skeleton animation="wave" variant="text" height={50} />
            <Skeleton animation="wave" variant="text" height={50} />
            <Skeleton animation="wave" variant="text" height={50} />
            <Skeleton animation="wave" variant="text" height={50} />
        </div>
    )
}

export const SplashScreen = () => {
    return (
        <div className='center' style={{ width: '100%', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 className='logo' style={{ color: 'black' }}>GEST</h1>
                <CircularProgress color="secondary" />
            </div>

        </div>
    )
}