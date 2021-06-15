import { Checkbox, createStyles, Fab, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, makeStyles, MenuItem, Select, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import PlayArrowSharpIcon from '@material-ui/icons/PlayArrowSharp';

const useStyles = makeStyles((theme) =>
    createStyles({
        formControl: {
            minWidth: 200,
            marginBottom: 20,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export const Builder = ({ onChange, tools, supportedTools }) => {
    const classes = useStyles();
    const [toolchain, setToolchain] = useState('')

    const [toolsTO, setTools] = useState(supportedTools);


    const handleChange = (event) => {
        setToolchain(event.target.value);
    };

    const handleToolsChange = (index) => {
        const tmp = [...toolsTO];
        tmp[index].checked = !tmp[index].checked;
        setTools(tmp);
        onChange(grid, tmp, outputs, pk)
    };

    return (
        <>
            <Typography variant='h5'>
                Select Tools
            </Typography>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Toolchain</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={toolchain}
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>econometrics</MenuItem>
                        <MenuItem value={2}>accountancy</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Tools</FormLabel>
                <FormGroup>
                    {toolsTO.map((tool, index) => (
                        <CheckboxTile checked={tool.checked} tool={tool} onChange={handleToolsChange} index={index} />
                    ))}
                </FormGroup>
            </FormControl>

            <Fab variant="extended" color="secondary" style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <PlayArrowSharpIcon />
                Run
            </Fab>
        </>
    );

}

const CheckboxTile = ({ checked, tool, onChange, index }) => {
    const handleOnChange = () => {
        onChange(index)
    }
    return (
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleOnChange} tool={tool} />}
            label={tool.name}
        />
    );
}