import { CircularProgress } from '@material-ui/core'
import React, { memo } from 'react'
import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
    createMuiTheme,
    MuiThemeProvider,
    withStyles
} from "@material-ui/core/styles";
import Divider from '@mui/material/Divider';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { lightBlue } from '@mui/material/colors';
const ApexChart = dynamic(() => import("./Chart"), { ssr: false });



const CustomTooltip = withStyles({
    tooltip: {
        color: "lightblue",
        backgroundColor: "transparent",

    }
})(Tooltip);



const OutputComponent = ({ output }) => {
    return (
        <>
            <Box sx={{ mx: 'auto', my: '20px', borderRadius: '16px' }}>
                {Object.keys(output).map((name, val) => {
                    if (name === 'graph') {
                        return <ApexChart data={output['graph']} />
                    }
                    return <Typography variant="h6" key={name}>{name}: {output[name]} </Typography>
                }
                )}
            </Box>
        </>
    )
}

function WrappedOutput({ data, grid }) {
    if (data.length > 0) {
        return (
            <div>

                {data.map((instance) => (

                    <Box sx={{
                        mx: 'auto', my: '20px'
                    }}>

                        <React.Fragment key={instance.tool_handle}>
                            <CssBaseline />

                            <Grid container direction="row" justifyContent="flex-start">
                                <Grid >
                                    <Typography variant="h2">{instance.tool_handle}</Typography>
                                </Grid>
                                <Grid >

                                    <CustomTooltip
                                        title={<div style={{ boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)" }}><Card sx={{ maxWidth: 550 }}>
                                            <CardActionArea>

                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        Test {instance.tool_handle}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {instance.tool_handle} to zajebiste narzędzie do identyfikacji hipotetycznych błędów istotności parametrów modelu. Aby mieć pewność, że test został dobrze wykonany należy wykonać algorytm dla danych z przedziału czasowego(X1)
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    Zobacz przykłady
                                                </Button>
                                            </CardActions>
                                        </Card> </div>}>
                                        <IconButton>
                                            <HelpIcon />
                                        </IconButton>
                                    </CustomTooltip>
                                </Grid>

                            </Grid>
                            <OutputComponent output={instance.output_data} />
                            <Divider />


                        </React.Fragment>
                    </Box>

                ))}
            </div>
        )
    }

    return (
        <div className='center'><CircularProgress /></div>
    )

}
export const Output = memo(WrappedOutput);