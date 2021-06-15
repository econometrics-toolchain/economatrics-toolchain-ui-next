import { memo, useContext, useState } from 'react'
import { Output } from './Output';
import ReactDataSheet from 'react-datasheet';
import { addRows } from '../../../utils';
import { useSheetControls } from '../../../hooks/useSheetControls';
import { Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ControllsBar } from './ControllsBar';
import { SelectSolution } from './SelectSolution';

const useStyles = makeStyles((theme) => ({
    exampleWrapper: {
        position: 'relative',
        marginTop: theme.spacing(3),

    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: 0,
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(1),
        },
    },
    paperView: {
        padding: theme.spacing(2)
    },
    controlsBar: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: '100%',
    },
    chip: {
        margin: 2,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paperWelcome: {
        backgroundColor: '#e9edf8',
        padding: '15px'
    },
    coeffs: {
        backgroundColor: '#ef535033',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold'
    }
}));




export const WrappedSheet = ({ pk, data, tools, outputs, onDeleteSpreadsheet, supportedTools = [], onChange }) => {
    const classes = useStyles();
    const [showOutput, setShowOutput] = useState(outputs.length > 0 ? true : false)
    const [handleAddRow, handleOnRun, handleOnDelete, handleOnTools, handleClear]
        = useSheetControls(onChange, data, tools, outputs, pk, supportedTools, onDeleteSpreadsheet)

    const cellChangedCommand = (changes, additions) => {
        let grid = [...data];

        changes.forEach(({ cell, row, col, value }) => {
            grid[row][col] = { ...grid[row][col], value };
        });
        if (additions) {
            additions.forEach(({ row, col, value }) => {
                try {
                    grid[row][col] = { ...grid[row][col], value };
                } catch {
                    grid = addRows(grid, 1)
                    grid[row][col] = { ...grid[row][col], value };
                }
            });
        }
        onChange(grid, tools, outputs, pk)
    }

    const handleSelectedToolChange = (selectedTools) => {
        let grid = [...data];
        grid[0][1] = { value: 'y', readOnly: true }
        grid[0][2] = { value: 'x', readOnly: true }

        onChange(grid, selectedTools, outputs, pk)
    }
    
    const onContextMenu = (e, cell, i, j) =>
        cell.readOnly ? e.preventDefault() : null;


    return (
        <Paper key={pk} className={classes.paperView}>
            <ControllsBar
                onAdd={handleAddRow}
                onClear={() => {
                    handleClear()
                    setShowOutput(false)
                }}
                onDelete={handleOnDelete}
                onRun={() => { setShowOutput(true); handleOnRun() }}
                onTools={handleOnTools}
                onUndo={() => { }}
                onRedo={() => { }}
            />

            <div style={{ width: '100%' }}>
                <ReactDataSheet
                    className={'spreadsheet'}
                    data={data}
                    valueRenderer={(cell: any) => cell.value}
                    onContextMenu={onContextMenu}
                    onCellsChanged={(changes, additions) =>
                        cellChangedCommand(changes, additions)
                    } />
            </div>
            <SelectSolution
                onChange={handleSelectedToolChange}
                tools={tools}
                supportedTools={supportedTools}
            />

            {
                showOutput ? <Output data={outputs} grid={data} /> : <></>
            }
        </Paper>
    )
}

export const Sheet = memo(WrappedSheet);