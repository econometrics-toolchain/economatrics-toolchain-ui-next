import { Typography, Grid } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router'

export function Navigator() {
    const location = useRouter()
    const paths = location.pathname.split('/').filter(function (el) { return el.length !== 0 });;

    return (
        <Grid alignItems='center' container spacing={1}>

            {paths.map((item, index) => (
                <Grid key={index} item>
                    <Typography variant='h5' component='h2'>
                        {index === paths.length - 1 ?
                            <Link href={item}><a className='router-link'>{item}</a></Link> :
                            <Link href={`/${item}`}><a className='router-link'>{item}</a></Link>
                        }/
                    </Typography>
                </Grid>
            ))}

        </Grid>
    )
}

