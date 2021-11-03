
import { createStyles, Fab, Grid, IconButton, makeStyles, Modal, TextField, Typography, Paper, ListItem, ListItemText, List } from "@material-ui/core";
import { Layout } from "../../components/forum/layout";
import { useAuth } from "../../hooks/useAuth";
import Divider from '@material-ui/core/Divider';
import LockIcon from '@mui/icons-material/Lock';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router'


export default function MyProfile() {
    const { state, isAuthenticated } = useAuth();
    const [user, setUser] = useState(1);

    const [openpass, setOpenpass] = useState(false);
    const [openmail, setOpenmail] = useState(false);

    const handleClickOpenpass = () => {
        setOpenpass(true);
    };
    const handleClickOpenmail = () => {
        setOpenmail(true);
    };

    const handleClosepass = () => {
        setOpenpass(false);
    };
    const handleClosemail = () => {
        setOpenmail(false);
    };



    useEffect(async () => {
        const response = await fetch(`https://gretljestslaby.pythonanywhere.com/api/profiles/${state.user.email}/`)
        const data = await response.json();
        setUser(data);
        
    }, [])

    return (
        <>

            <Layout>
               
                <div style={{ textAlign: 'center', maxWidth: '1000px', margin: 'auto auto 50px' }}>
                <Paper elevation={3}>
                    <Typography style={{ margin: '50px 550px auto auto', padding:'20px' }} variant="h2"> Your profile </Typography>
                    <Divider />

                    <div style={{ padding: ' 20px' }}>


                        <img style={{
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                            transition: '0.3s', borderRadius: '50%', width: '256px', height: '256px', margin: 'auto', padding: '5px'
                        }} src={`${user[0]?.avatar}`} />
                    </div>

                    <Divider />


                    <Typography style={{ margin: 'auto', padding: '20px', fontWeight: 'bold' }} variant="h3"> {user[0]?.first_name} {user[0]?.last_name}</Typography>
                    <Typography style={{ margin: 'auto', padding: '10px', fontWeight: 'medium', color: 'grey' }} variant="h6"> {state.user.email}</Typography>
                    <Typography style={{ margin: 'auto', padding: '20px' }} variant="h5"> {user[0]?.bio}</Typography>



                    <Grid container spacing={1} style={{ margin: 'auto', maxWidth: '800px', padding: '60px' }} >
                        <Grid item xs={4}>
                            <Fab onClick={handleClickOpenpass} variant="extended" color="primary" aria-label="add">
                                <LockIcon />
                                Change password
                            </Fab>
                        </Grid>
                        <Grid item xs={4}>
                            <Fab onClick={handleClickOpenmail} variant="extended" color="primary" aria-label="add">
                                <AlternateEmailIcon sx={{ mr: 1 }} />
                                Change email
                            </Fab>
                        </Grid>
                        <Grid item xs={4}>
                            <Fab variant="extended" color="secondary" aria-label="add">
                                <DeleteIcon sx={{ mr: 1 }} />
                                Delete account
                            </Fab>
                        </Grid>
                    </Grid>
                    <Divider />

                    </Paper>

                </div>
              
            </Layout>
        
            {openpass ? <ChangeDialog type={"pass"} handleClose={handleClosepass} /> : <></>}
            {openmail ? <ChangeDialog type={"email"} handleClose={handleClosemail} /> : <></>}
            {/* <ChangeDialog open={open} handleClose={handleClose} /> */}

        </>
    )
}

const ChangeDialog = ({ type, handleClose }) => {
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                {type === "pass" ? <>
                    <DialogTitle>Change password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Remember to do not share your new password with others
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="passwordrep"
                            label="Confirm password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Save</Button>
                    </DialogActions>
                </>
                    : <>    <DialogTitle>Change email</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Remember that if you will lost access to new email there is no way to retrieve your account
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="New Email"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                           
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleClose}>Save</Button>
                        </DialogActions>
                    </>}
        </Dialog>
    

        </>
    )
}