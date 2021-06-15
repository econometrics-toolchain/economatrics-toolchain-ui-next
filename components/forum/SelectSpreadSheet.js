import { CircularProgress, ListItemIcon } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { List } from "@material-ui/core";
import { createStyles, Fab, Grid, IconButton, ListItem, makeStyles, Modal, TextField, Typography, ListItemText } from "@material-ui/core";
import GridOnIcon from '@material-ui/icons/GridOn';
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { WizardContext } from "../../context/WizardContext";
import { apiUrl, fetcher, httpClient } from "../../utils/services";
import { NewSheetContent } from '../../components/wizard/NewSheet';

const useStyles = makeStyles((theme) =>

    createStyles({
        paper: {
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            borderRadius: '8px',
        },
    }),
);

export const SelectSpreadsheet = ({ onChange }) => {
    const classes = useStyles();
    const url = `${apiUrl}api/sheets/`;
    const [sheets, setSheets] = useState([])
    // const { data: sheets } = useSWR(url, fetcher, { initialData: [] });
    const [, setWizard] = useContext(WizardContext);

    useEffect(() => {
        httpClient.get(url).then((res) => res.data).then(res => {
            setSheets(res)
        })
    }, []);

    const handleCreate = () => {
        setWizard({
            open: true,
            content: <NewSheetContent />,
            fullScreen: true,
        })
    }

    return (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Include spreadsheet</h2>
            <List>

                {sheets.map((sheet) => (
                    <ListItem onClick={() => { onChange(sheet) }}
                        button>
                        <ListItemIcon>
                            <GridOnIcon />
                        </ListItemIcon>
                        <ListItemText primary={sheet.name} />
                    </ListItem>
                ))}
            </List>
            <Button onClick={handleCreate} variant="contained" color='secondary'>Create new</Button>
        </div >
    );
}