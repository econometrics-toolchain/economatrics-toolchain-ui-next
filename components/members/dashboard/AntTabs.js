import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import { Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

export const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
})(Tabs);

export function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component='div'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const AntTablePanel = ({ children, value, index }) => {
    return (
        <TabPanel value={value} index={index}>
            <Grid justify='center' container>
                {children}
            </Grid>
        </TabPanel>
    )
}