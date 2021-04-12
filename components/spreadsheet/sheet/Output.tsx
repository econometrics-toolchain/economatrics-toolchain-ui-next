import { CircularProgress } from '@material-ui/core'


const OutputComponent = ({ output }) => {
    return (
        <>
            {
                Object.keys(output).map((name, val) => (
                    <h3 key={name}>{name}: {output[name]} </h3>
                ))
            }
        </>
    )
}

export const Output = ({ data }) => {
    if (data.length > 0) {
        return (
            <div>
                {
                    data.map((instance) => (
                        <>
                            <h1 key={"tool" + instance.tool_handle}>{instance.tool_handle}</h1>
                            <OutputComponent key={"output" + instance.tool_handle} output={instance.output_data} />
                        </>
                    ))
                }
            </div>
        )
    }

    return (
        <div className='center'><CircularProgress /></div>
    )

}