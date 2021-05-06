import { memo, useContext, useState } from 'react'

import { Chip, FormControl, IconButton, Input, InputLabel, MenuItem, Paper, Select } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';


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

const WrappedSelectSolution = ({ onChange, tools, supportedTools }) => {
    const classes = useStyles();
    const theme = useTheme();

    const handleChange = (event) => {
        onChange(event.target.value)
    };

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 48 * 4.5 + 8,
                minWidth: 250,
                maxWidth: 350,
            },
        },
    };

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-multiple-chip-label">Select tools</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={tools}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {supportedTools.map(({ name }) => (
                    <MenuItem key={name} value={name} style={getStyles(name, tools, theme)}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export const SelectSolution = memo(WrappedSelectSolution)