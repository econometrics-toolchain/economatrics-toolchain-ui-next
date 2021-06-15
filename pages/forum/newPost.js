
import { createStyles, Fab, Grid, IconButton, makeStyles, Modal, TextField, Typography, Paper, ListItem, ListItemText, List } from "@material-ui/core";
import { Layout } from "../../components/forum/layout";
import styles from '../../styles/NewPost.module.css'
import SendIcon from '@material-ui/icons/Send';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import Divider from '@material-ui/core/Divider';
import GridOnIcon from '@material-ui/icons/GridOn';
import { useState } from "react";
import { SelectSpreadsheet } from "../../components/forum/SelectSpreadSheet";
import Tilt from 'react-parallax-tilt';
import { httpClient } from "../../utils/services";
import Chip from '@material-ui/core/Chip';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: 'fit-content',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            '& svg': {
            },
            '& hr': {
                margin: theme.spacing(0, 0.5),
            },
        },
        paper: {
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            borderRadius: '8px',
        },
    }),
);

export default function NewPost() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedSheet, setSelectedSheet] = useState(null);
    const router = useRouter()

    const [[title, body], setForm] = useState(['', '']);

    const handleOpen = () => {
        setOpen(prev => !prev);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title !== '' && body !== '') {
            httpClient.post('https://gretljestslaby.pythonanywhere.com/api/posts/', {
                content: body,
                image: null,
                liked: []
            }).then(resp => {
                router.push(`/forum/posts/${resp.data.pk}`)
            })
        }
    }

    const handleTitleChange = (event) => {
        setForm([event.target.value, body]);
    }

    const handleBodyChange = (event) => {
        setForm([title, event.target.value]);
    }

    const handleSheetChange = (sheet) => {
        setSelectedSheet(sheet)
        handleOpen()
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <SelectSpreadsheet onChange={handleSheetChange} />
            </Modal>
            <Layout>
                <h1>New post</h1>
                <div className={styles.container}>
                    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <Typography variant='subtitle1' component='h2'>Title</Typography>
                        <TextField onChange={handleTitleChange} value={title} className={styles.title} id="standard-basic" label="" />
                        <Typography style={{ marginTop: '20px' }} variant='subtitle1' component='h2'>Body</Typography>
                        <div>
                            <Grid container alignItems="center" className={classes.root}>
                                <IconButton>
                                    <FormatAlignLeftIcon />
                                </IconButton>
                                <IconButton>
                                    <FormatAlignCenterIcon />
                                </IconButton>
                                <IconButton>
                                    <FormatAlignRightIcon />
                                </IconButton>
                                <Divider orientation="vertical" flexItem />
                                <IconButton>
                                    <FormatBoldIcon />
                                </IconButton>
                                <IconButton>
                                    <FormatItalicIcon />
                                </IconButton>
                                <IconButton>
                                    <FormatUnderlinedIcon />
                                </IconButton>
                                <Divider orientation="vertical" flexItem />
                                <IconButton onClick={handleOpen}>
                                    <GridOnIcon />
                                </IconButton>
                            </Grid>
                        </div>
                        <div>
                            <textarea onChange={handleBodyChange} value={body} className={styles.body} />
                        </div>
                        {selectedSheet ?
                            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                                <p>Pinned spreadsheet:&nbsp;</p>
                                <Chip
                                    label={selectedSheet.name}
                                    onDelete={() => { }}
                                />
                            </div>
                            : <></>
                        }
                        <Fab variant="extended" color="secondary" type='submit'>
                            <SendIcon />
                            send
                        </Fab>
                    </form>
                    <div className={styles.info}>
                        <Tilt>
                            <img src="https://img.icons8.com/dusk/512/000000/question--v2.png" />
                        </Tilt>
                        <Info />
                    </div>
                </div>
            </Layout>
        </>
    )
}


const Info = ({ onClick }) => {
    return (
        <Paper style={{ padding: '10px' }} onClick={onClick}>
            <Typography variant='h6' component='p'>Tips</Typography>
            <Divider orientation="horizontal" />
            <List>
                <ListItem>
                    <img src="https://img.icons8.com/emoji/48/000000/backhand-index-pointing-right-medium-light-skin-tone.png" />
                    <Typography variant='subtitle1' component='p' style={{ marginLeft: '10px' }}>Summarize the problem</Typography>
                </ListItem>
                <ListItem>
                    <img src="https://img.icons8.com/emoji/48/000000/backhand-index-pointing-right-medium-light-skin-tone.png" />
                    <Typography variant='subtitle1' component='p' style={{ marginLeft: '10px' }}>Describe what you’ve tried</Typography>
                </ListItem>
                <ListItem>
                    <img src="https://img.icons8.com/emoji/48/000000/backhand-index-pointing-right-medium-light-skin-tone.png" />
                    <Typography variant='subtitle1' component='p' style={{ marginLeft: '10px' }}>Include spreadsheet</Typography>
                </ListItem>
            </List>
        </Paper>
    );
}