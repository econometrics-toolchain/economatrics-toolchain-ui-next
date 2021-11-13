import { createStyles, Fab, Grid, IconButton, makeStyles, Modal, TextField, Typography } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const useStyles = makeStyles((theme) =>
    createStyles({

        img: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            flex: 1,
        },
        votewrap: {
            display: 'inline-block',
            alignContent: 'center',
            marginTop: '10px',
            flex: 1,
            marginBottom: 'auto',
            maxWidth: '20px',
        },
        answrap: {
            marginLeft: '40px',

        }
    }),
);
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export const Comment = ({ body, user, created }) => {
    const classes = useStyles();

    return (
        <>
        <div style={{margin:'20px 0  10px 30px'}}>
            <Grid container spacing={2} >
                <Grid item xs="auto">
                    <img className={classes.img} src={`http://gretljestslaby.pythonanywhere.com/${user.avatar}`} alt="avatar" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{ fontWeight: 'bold' }}>{user.first_name} {user.last_name}</div>
                </Grid>
                <Grid item xs>
                    <div style={{ color: 'grey' }}>{created}</div>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs="auto" style={{ margin: '0 15px 0  10px' }}>
                    <ThumbUpIcon />
                    <div style={{ fontSize: '13px' }}>126</div>
                </Grid>
                <Grid xs="auto"><div style={{ borderLeft: '4px solid gray', height: '50px' }}></div></Grid>
                <Grid item xs={8}>
                    <div >{body}</div>

                </Grid>
            </Grid>
            </div>
        </>
        // <div className={classes.answrap}>
        //     <div style={{ display: 'flex', width: '400px', marginTop: '40px', alignItems: 'center' }}>
        //         <img className={classes.img} src={`http://gretljestslaby.pythonanywhere.com/${user.avatar}`} alt="avatar" />
        //         <div style={{ flex: 4, marginLeft: '20px', fontWeight: 'bold' }}>{user.first_name} {user.last_name}</div>
        //         <div style={{ flex: 5, color: 'grey' }}>{created}</div>
        //     </div>

        //     <div style={{ display: 'flex', marginLeft: '8px', alignItems: 'center' }}>
        //         <div className={classes.votewrap}>
        //             <ThumbUpIcon />
        //             <div style={{ fontSize: '13px' }}>126</div>
        //         </div>

        //         <div >{body}</div>
        //     </div>
        // </div >)
    )
}