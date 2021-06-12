import { createStyles, Fab, Grid, IconButton, makeStyles, Modal, TextField, Typography } from "@material-ui/core";

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

export const SelectSpreadsheet = () => {
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Include spreadsheet</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
    );
}