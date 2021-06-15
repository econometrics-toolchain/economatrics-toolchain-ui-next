import { Avatar, Grid } from "@material-ui/core";
import { Fragment } from "react";
import { useRouter } from 'next/router'

export const Post = ({ post, index }) => {

    const router = useRouter()

    return (
        <div className='post-item' onClick={() => {
            router.push(`/forum/posts/${post.pk}`)
        }}>
            <Grid alignItems='center' container style={{ marginTop: '10px' }}>
                <Avatar style={{ marginRight: '15px' }} />
                <div>
                    <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{post.author.first_name} {post.author.last_name}</div>
                    <div style={{ color: 'gray' }}>{post.author.bio} | since 2021</div>
                </div>
            </Grid>
            <Grid>
                <h3 className='link-post'>Title {index}</h3>
            </Grid>
            <Grid>
                <p className='link-post'>{post.content}</p>
            </Grid>
        </div>
    );
}