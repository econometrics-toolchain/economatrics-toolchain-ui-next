import { useRouter } from 'next/router'
import { createStyles, Fab, Grid, IconButton, makeStyles, Modal, TextField, Typography, Avatar } from "@material-ui/core";
import { memo, useRef, useState, useEffect } from 'react';
import { Layout } from "../../../components/forum/layout";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import styles from '../../../styles/NewPost.module.css'
import SendIcon from '@material-ui/icons/Send';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import Divider from '@material-ui/core/Divider';
import GridOnIcon from '@material-ui/icons/GridOn';
import { useAuth } from "../../../hooks/useAuth";
import { Comment } from '../../../components/forum/Comment';
import { Demo } from '../../../components/landing/Demo';

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
        disp: {
            marginTop: '40px',
            display: 'flex',
            alignItems: 'center',
        },
        img: {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            flex: 1,
        },
        title: {
            flex: 21,
            marginLeft: '20px',
            fontSize: '18px',
            fontWeight: 'bold',
        },
        votewrap: {
            marginTop: '10px',
            // flex: 1,
            marginBottom: 'auto',
        },
        answrap: {
            marginLeft: '40px',

        }
    }),
);

export default function Post(post) {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [comments, setComments] = useState(post.comments);
    const { state, isAuthenticated } = useAuth();
    const [user, setUser] = useState(1);
    const commentsEndRef = useRef(null)

    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(async () => {
        const response = await fetch(`https://gretljestslaby.pythonanywhere.com/api/profiles/${state.user.email}/`)
        const data = await response.json();
        setUser(data);
    }, [])



    const postComment = ({ post }) => {
        if (value !== '') {
            fetch(`https://gretljestslaby.pythonanywhere.com/api/posts/${post.post.pk}/comments/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    body: value,
                    post: post.post.pk,
                    user: user[0].pk,
                })
            })
                .then((res) => {
                    let av = user[0].avatar.replace("https://gretljestslaby.pythonanywhere.com/", '')
                    user[0].avatar = av
                    setComments([...comments, { body: value, post: post, user: user[0] }])
                    setValue('')
                    scrollToBottom()
                })

        }
    }

    const title = post.post.content.slice(0, 120);

    return (
        <>
            <Layout>
                <div style={{ maxWidth: '800px', margin: 'auto auto 50px auto' }}>
                    <div className={classes.disp}>
                        <div className={classes.votewrap}>
                            <ThumbUpIcon />
                            <div style={{ fontSize: '13px' }}>126</div>
                        </div>
                        <Avatar style={{ marginLeft: '10px' }} />
                        <div style={{ marginLeft: '10px' }}>
                            <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{post.post.author.first_name} {post.post.author.last_name}</div>
                            <div style={{ color: 'gray' }}>{post.post.author.bio} | since 2021</div>
                        </div>

                    </div>
                    <hr></hr>

                    <div style={{ marginTop: '40px' }}>{post.post.content}</div>
                    {(post.post.pk % 2) === 0 ?
                        <Demo /> : <></>
                    }

                    <Typography style={{ marginTop: '20px', fontWeight: 'bold' }} variant='subtitle1' component='h2'>Your answer</Typography>
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
                        </Grid>
                    </div>
                    <div>
                        <textarea value={value} className={styles.body} onChange={v => setValue(v.target.value)} />
                    </div>
                    <Fab variant="extended" color="secondary" onClick={() => postComment({ post })}>
                        <SendIcon />
                        Comment
                    </Fab>

                    <div style={{ fontWeight: 'bold', marginTop: '40px' }}>Answers</div>

                    {comments.map((comment) => (
                        <>
                            <Comment body={comment.body} user={comment.user} created={comment.created} />
                            <Divider />
                        </>
                    ))}
                    <div ref={commentsEndRef} />
                </div>
            </Layout>

        </>)
}

export async function getServerSideProps({ req, params }) {

    const authToken = req.cookies.token;

    const responsePost = await fetch(`http://gretljestslaby.pythonanywhere.com/api/posts/${params.slug}`, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })
    const responseComments = await fetch(`http://gretljestslaby.pythonanywhere.com/api/posts/${params.slug}/comments`, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })
    const post = await responsePost.json();
    const comments = await responseComments.json();

    if (!post || !authToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return { props: { post, comments } }
}