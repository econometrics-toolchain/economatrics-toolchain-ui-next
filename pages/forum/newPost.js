
import { createStyles, Fab, Grid, IconButton, makeStyles, Modal, TextField, Typography } from "@material-ui/core";
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

    const handleOpen = () => {
        setOpen(prev => !prev);
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
                <SelectSpreadsheet />
            </Modal>
            <Layout>

                <h1>New post</h1>
                <div className={styles.container}>
                    <div style={{ width: '100%' }}>
                        <Typography variant='subtitle1' component='h2'>Title</Typography>
                        <TextField className={styles.title} id="standard-basic" label="" />
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
                            <textarea className={styles.body} />
                        </div>
                        <Fab variant="extended" color="secondary">
                            <SendIcon />
                            send
                        </Fab>
                    </div>
                    <div className={styles.info}>

                    </div>
                </div>
            </Layout>
        </>
    )
}
