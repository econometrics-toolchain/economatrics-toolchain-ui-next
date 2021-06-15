import { useRouter } from 'next/router'
import { memo, useRef, useState } from 'react';
import { Layout } from '../../components/members/layout';
import { FabMenu } from '../../components/spreadsheet/FabMenu';
import { EmptySheetSheet } from '../../components/spreadsheet/sheet/EmptySheet';
import { Sheet } from '../../components/spreadsheet/sheet/Sheet';
import { generateEmptySheetData } from '../../utils';
import { save } from '../../utils/services';
import html2canvas from 'html2canvas';
import jsPDF from 'jsPDF';
function WrappedHome({ data, supportedTools }) {
    const router = useRouter()
    const [sheets, setSheets] = useState(data.content);
    const defaultSheetContent = generateEmptySheetData(10);

    const handleAddSheet = () => {
        setSheets([...sheets, { data: defaultSheetContent, tools: [], outputs: [] }])
    }

    const handleDeleteSpreadsheet = (pk) => {
        const filteredAry = [...sheets]
        if (pk > -1) { filteredAry.splice(pk, 1) }

        setSheets(filteredAry)
    }

    const handleOnChange = (data, tools, outputs, pk) => {
        const ids = [...sheets];
        ids[pk] = { data: data, tools: tools, outputs: outputs };
        setSheets(ids);
    }

    const handleOnSave = async () => await save(data.name, sheets)


    const handleExport = () => {
        const input = document.getElementById('main-view');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("export.pdf");
            })
    }
    return <Layout>
        <FabMenu onAddSpreadSheet={handleAddSheet} onSave={handleOnSave} onExport={handleExport} />
        <div id='main-view'>
            {
                sheets.length === 0 ?
                    <EmptySheetSheet onAddSpreadSheet={handleAddSheet} />
                    :
                    sheets.map((spreadsheet, index) => (
                        <>
                            <Sheet
                                key={index}
                                pk={index}
                                data={spreadsheet.data}
                                tools={spreadsheet.tools || []}
                                supportedTools={supportedTools}
                                outputs={spreadsheet.outputs}
                                onDeleteSpreadsheet={handleDeleteSpreadsheet}
                                onChange={handleOnChange}
                            />
                            <div style={{ height: '25px', width: '100%' }}></div>
                        </>
                    )
                    )
            }
        </div>
    </Layout>
}

const Home = memo(WrappedHome);
export default Home;

export async function getServerSideProps({ req, params }) {

    const authToken = req.cookies.token;

    const responseData = await fetch(`http://gretljestslaby.pythonanywhere.com/api/sheets/${params.slug}`, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })
    const responseSupportedTools = await fetch(`http://gretljestslaby.pythonanywhere.com/api/tools/supported`, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })
    const data = await responseData.json();
    const supportedTools = await responseSupportedTools.json();

    if (!data || !authToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return { props: { data, supportedTools } }
}