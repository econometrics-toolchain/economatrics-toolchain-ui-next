import { CircularProgress } from '@material-ui/core'
import React, { memo } from 'react'


const OutputComponent = ({ output }) => {
    return (
        <>
            {Object.keys(output).map((name, val) => (
                <h3 key={name}>{name}: {output[name]} </h3>
            ))}
        </>
    )
}

function WrappedOutput({ data }) {
    if (data.length > 0) {
        return (
            <div>
                {data.map((instance) => (
                    <React.Fragment key={instance.tool_handle}>
                        <h1>{instance.tool_handle}</h1>
                        <OutputComponent output={instance.output_data} />
                    </React.Fragment>
                ))}
            </div>
        )
    }

    return (
        <div className='center'><CircularProgress /></div>
    )

}
export const Output = memo(WrappedOutput);