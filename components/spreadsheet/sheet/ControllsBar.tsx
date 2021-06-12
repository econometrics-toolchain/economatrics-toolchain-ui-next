import ButtonGroup from '@material-ui/core/ButtonGroup';
import PlayArrowSharpIcon from '@material-ui/icons/PlayArrowSharp';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import { Button, IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    controlsBar: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(2)
    },
}));

export const ControllsBar = ({ onAdd, onClear, onDelete, onRun, onUndo, onRedo, onTools }) => {
    const classes = useStyles();
    return (
        <div className={classes.controlsBar}>
            <ButtonGroup size='small' color="primary" aria-label="outlined button group">
                <Button onClick={onRun}><PlayArrowSharpIcon style={{ color: 'green' }} /></Button>
                <Button onClick={onTools}>tools</Button>
                <Button onClick={onClear}>clear</Button>
                <Button onClick={onAdd}>add row</Button>
                <Button><UndoIcon /></Button>
                <Button><RedoIcon /></Button>
            </ButtonGroup>

            <IconButton onClick={onDelete} size='small'><CloseRoundedIcon /></IconButton>
        </div>
    )
}
