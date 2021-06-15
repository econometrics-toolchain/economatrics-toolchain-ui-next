import { createStyles, Fab, Grid, IconButton, makeStyles, Modal, TextField, Typography } from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

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
export const Comment = ({ body, user, created }) => {
    const classes = useStyles();

    return (
        <div className={classes.answrap}>
            <div style={{ display: 'flex', width: '400px', marginTop: '40px', alignItems: 'center' }}>
                <img className={classes.img} src={`http://gretljestslaby.pythonanywhere.com/${user.avatar}`} alt="avatar" />
                <div style={{ flex: 4, marginLeft: '20px', fontWeight: 'bold' }}>{user.first_name} {user.last_name}</div>
                <div style={{ flex: 5, color: 'grey' }}>{created}</div>
            </div>

            <div style={{ display: 'flex', marginLeft: '8px', alignItems: 'center' }}>
                <div className={classes.votewrap}>
                    <ThumbUpIcon />
                    <div style={{ fontSize: '13px' }}>126</div>
                </div>
                <div style={{ borderLeft: '4px solid gray', height: '50px', marginLeft: '30px', marginRight: '5px', marginBottom: 'auto' }}></div>
                <div >{body}</div>
            </div>
        </div >)
}