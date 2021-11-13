
import {Fab, Grid,TextField, Typography, Paper } from "@material-ui/core";
import { Layout } from "../../components/forum/layout"
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
import { useState, useEffect, useRef } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import { httpClient } from "../../utils/services";


export default function MyProfile() {
    const { state, isAuthenticated } = useAuth();
    const [user, setUser] = useState(1);

    const [openpass, setOpenpass] = useState(false);
    const [openname, setOpenname] = useState(false);

    const handleClickOpenpass = () => {
        setOpenpass(true);
    };
    const handleClickOpenname = () => {
        setOpenname(true);
    };

    const handleClosepass = () => {
        setOpenpass(false);
    };
    const handleClosename = () => {
        setOpenname(false);
    };
 
    useEffect(async () => {
        const response = await fetch(`https://gretljestslaby.pythonanywhere.com/api/profiles/${state.user.email}/`)
        const data = await response.json();
        setUser(data);

    }, [])

    return (
        <>

            <Layout>

                <div style={{ textAlign: 'center', maxWidth: '1000px', maxHeight: '800px', margin: 'auto auto 50px' }}>
                    <Paper elevation={3}>
                        <Typography style={{ margin: '30px 550px auto auto', padding: '10px' }} variant="h3"> Your profile </Typography>
                        <Divider />

                        <div style={{ padding: ' 20px' }}>


                            <img style={{
                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                transition: '0.3s', borderRadius: '50%', width: '256px', height: '256px', margin: 'auto', padding: '5px'
                            }} src={`${user[0]?.avatar}`} />
                        </div>

                        <Divider />


                        <Typography style={{ margin: 'auto', padding: '20px', fontWeight: 'bold' }} variant="h4"> {user[0]?.first_name} {user[0]?.last_name}</Typography>
                        <Typography style={{ margin: 'auto', padding: '10px', fontWeight: 'medium', color: 'grey' }} variant="h7"> {state.user?.email}</Typography>
                        <Typography style={{ margin: 'auto', padding: '20px' }} variant="h6"> {user[0]?.bio}</Typography>



                        <Grid container spacing={1} style={{ margin: 'auto', maxWidth: '800px', padding: '20px' }} >
                            <Grid item xs={4}>
                                <Fab onClick={handleClickOpenpass} variant="extended" color="primary" aria-label="add">
                                    <LockIcon />
                                    Change password
                                </Fab>
                            </Grid>
                            <Grid item xs={4}>
                                <Fab onClick={handleClickOpenname} variant="extended" color="primary" aria-label="add">
                                    <AlternateEmailIcon sx={{ mr: 1 }} />
                                    Change username
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
            {openname ? <ChangeDialog type={"email"} handleClose={handleClosename} /> : <></>}
            {/* <ChangeDialog open={open} handleClose={handleClose} /> */}

        </>
    )
}

const ChangeDialog = ({ type, handleClose }) => {

    const passRef = useRef('')
    const passConfRef = useRef('')
    const usernameRef = useRef('')
    const [error, setError] = useState(false);
    const [helper, setHelper] = useState('');

    const handleSubmitPass = () => {
        event.preventDefault();

        if (passRef.current.value === passConfRef.current.value && passRef.current.value.length >= 8) {

            httpClient.post('https://gretljestslaby.pythonanywhere.com/users/auth/password/change/', {

                new_password1: passRef.current.value,
                new_password2: passConfRef.current.value,

            }).then(resp => {
                // setHelper('Password succesfully changed')
                handleClose()
            })
        }
        else {
            setError(true)
            setHelper('Password is too short or doesnt match')
            setTimeout(() => {
                setError(false)
                setHelper(' ')
            }, 3000);

        }
    }
    const handleSubmitUsername = () => {
        event.preventDefault();

        if (usernameRef.current.value.length > 0) {

            httpClient.put('https://gretljestslaby.pythonanywhere.com/users/auth/user/', {

                username: usernameRef.current.value

            }).then(resp => {
                // setHelper('Password succesfully changed')
                handleClose()
            })
        }
        else {
            setError(true)
            setHelper('You have to specify new name')
            setTimeout(() => {
                setError(false)
                setHelper(' ')
            }, 3000);

        }
    }
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
                            inputRef={passRef}
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            error={error}
                            margin="dense"
                            inputRef={passConfRef}
                            id="passwordconf"
                            label="Confirm password"
                            helperText={helper}
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => { handleClose, handleSubmitPass() }}>Save</Button>
                    </DialogActions>
                </>
                    : <>    <DialogTitle>Change username</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You can change your username everytime and as many times as you want!
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="username"
                                inputRef={usernameRef}
                                label="New username"
                                type="email"
                                fullWidth
                                variant="standard"
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => { handleClose, handleSubmitUsername() }}>Save</Button>
                        </DialogActions>
                    </>}
            </Dialog>


        </>
    )
}
// export async function getServerSideProps({ req}) {

//     const authToken = req.cookies.token;

//     if (!authToken) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             },
//         }
//     }
//         else{
//             return 
//         }
    
// }