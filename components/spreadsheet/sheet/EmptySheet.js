import { Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
    paperWelcome: {
        backgroundColor: '#e9edf8',
        padding: '15px'
    },

}));

export const EmptySheetSheet = ({ onAddSpreadSheet }) => {
    const classes = useStyles();

    return (
        <div className='center' style={{ height: '100%' }}>
            <Paper className={classes.paperWelcome}>
                <div style={{ textAlign: 'center' }}>
                    <div>
                        <Image src="/assets/img2.jpg" alt="grats" width="400" height="250"/>
                    </div>
                    <Button onClick={onAddSpreadSheet} variant="contained" color='secondary'>add empty spreadsheet</Button>
                    <Typography variant='h6' component='h1'>
                        or
                </Typography>
                    <Button variant="contained" color='secondary'>use builder</Button>
                </div>
            </Paper>
        </div>
    )
}
