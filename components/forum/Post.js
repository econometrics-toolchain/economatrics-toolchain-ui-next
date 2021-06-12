import { Avatar, Grid } from "@material-ui/core";
import { Fragment } from "react";

export const Post = ({ post }) => {
    return (
        <Fragment>
            <Grid alignItems='center' container>
                <Avatar style={{ marginRight: '15px' }} />
                <h4>{post.name}</h4>
            </Grid>
            <Grid>
                <h3>{post.question}</h3>
            </Grid>
            <Grid>
                <p>{post.content}</p>
            </Grid>
        </Fragment>
    );
}