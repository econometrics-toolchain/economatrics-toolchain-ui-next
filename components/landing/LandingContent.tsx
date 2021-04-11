import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { SupportedToolsContext } from "../../context/ToolsContext";
import { Community } from "./Community";
import { Demo } from "./Demo";
import { GithubBlock } from "./GithubBlock";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 15%',
    },
    spacer: {
        margin: "3rem 0",
    },

}));

export const LandingContent = ({ regCallback }) => {
    const classes = useStyles();
    const [, setTools] = useContext(SupportedToolsContext);
    useEffect(() => {
        setTools([{ "name": "KMNK", "input": ["x", "y"] }, { "name": "GoldfeldQuandt", "input": ["x", "y"] }, { "name": "DurbinWatson", "input": ["x", "y"] }, { "name": "JarqueBer", "input": ["x", "y"] }, { "name": "HarrisonMcCabe", "input": ["x", "y"] }]);
    }, [])

    return (
        <>
            <Grid justify="space-between" container className={classes.container}>
                <Grid alignItems="center" direction="column" container>
                    <Typography component='h1' variant='h4'>
                        Try now
                </Typography>
                    <Typography component='p' variant='subtitle1'>
                        Make complex calculations without effort.
                </Typography>
                </Grid>
                <Grid className={classes.spacer} item>
                    <Demo regCallback={regCallback} />
                </Grid>
            </Grid>
            <Community />
            <GithubBlock />

        </>
    );
}

