
import axios from 'axios';
import { useContext } from 'react';
import { WizardContext } from '../context/WizardContext';
import { addRows } from '../utils';
import { solve } from '../utils/services';
import { Builder } from '../components/wizard/Builder';
export const useSheetControls = (onChange, data, tools, outputs, pk, supportedTools, onDeleteSpreadsheet) => {
    const [, setWizard] = useContext(WizardContext);

    const handleSelectedToolChange = (selectedTools) => {
        let grid = [...data];
        grid[0][1] = { value: 'y', readOnly: true }
        grid[0][2] = { value: 'x', readOnly: true }

        onChange(grid, selectedTools, outputs, pk)
    }

    const handleAddRow = () => {
        const grid = addRows(data, 1)
        onChange(grid, tools, outputs, pk)
    }

    const handleOnRun = () => {
        let grid = [...data];
        let payload = { X: [], Y: [] }
        let requests = []
        let output = []

        data.slice(1, data.length).forEach((val) => {
            if (val[1].value && val[2].value) {
                payload.X.push(parseFloat(val[1].value))
                payload.Y.push(parseFloat(val[2].value))
            }
        })

        tools.forEach((tool) => {
            requests.push(solve(tool, payload))
            output.push({ tool_handle: tool })
        })

        axios.all(requests).then(axios.spread((...responses) => {
            responses.forEach((resp, index) => {
                output[index].output_data = resp
            })
            onChange(grid, tools, output, pk)
        }))
    }

    const handleOnDelete = () => {
        onDeleteSpreadsheet(pk)
    }

    const handleOnTools = () => {
        setWizard({
            open: true,
            content: <Builder onChange={handleSelectedToolChange}
                tools={tools}
                supportedTools={supportedTools} />,
            fullScreen: false,
        })

    }

    const handleClear = () => {
        onChange([[
            { readOnly: true, value: '' },
            { value: 'A', readOnly: true },
            { value: 'B', readOnly: true },
            { value: 'C', readOnly: true },
            { value: 'D', readOnly: true },
            { value: 'E', readOnly: true },
            { value: 'F', readOnly: true },
            { value: 'G', readOnly: true },
            { value: 'H', readOnly: true },
            { value: 'I', readOnly: true },
        ],
        [
            { readOnly: true, value: 1 },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
        ],], [], [], pk)

    }

    return [handleAddRow, handleOnRun, handleOnDelete, handleOnTools, handleClear];
}