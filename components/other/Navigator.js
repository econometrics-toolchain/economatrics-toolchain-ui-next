import { Typography, Grid } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react';

export const Navigator = React.memo(function WrappedNavigator() {
    const location = useRouter()
    // const paths = location.pathname.split('/').filter(function (el) { return el.length !== 0 });
    const router = useRouter()
    const paths = location.pathname.split('/')[1]
    const { slug } = router.query

    return (
        <Grid alignItems='center' container spacing={1}>
            <Grid item>
                <Typography variant='h5' component='h2'>
                    <Link href='/'><a className='router-link'>{paths}</a></Link>/
                    <a className='router-link'>{slug}</a>
                </Typography>
            </Grid>
        </Grid>
    )
})

