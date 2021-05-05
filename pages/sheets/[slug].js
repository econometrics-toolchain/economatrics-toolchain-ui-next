import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Layout } from '../../components/members/layout';
import { EmptySheetSheet } from '../../components/spreadsheet/sheet/EmptySheet';
import { Sheet } from '../../components/spreadsheet/sheet/Sheet';
import NProgress from 'nprogress'; //nprogress module

export default function Home({ data }) {
    const router = useRouter()
    const [sheets, setSheets] = useState(data.content);


    const handleDeleteSpreadsheet = (pk) => {
        // var filteredAry = [...spreadsheets]
        // if (pk > -1) { filteredAry.splice(pk, 1) }

        // setSpreadsheets(filteredAry)
    }
    const handleOnChange = (...props) => {

    }

    return <Layout>
        {
            sheets.length === 0 ?
                <EmptySheetSheet />
                :
                sheets.map((spreadsheet, index) => (
                    <pre>
                        <Sheet
                            pk={index}
                            data={spreadsheet.data}
                            tools={spreadsheet.tools || []}
                            outputs={spreadsheet.outputs}
                            onDeleteSpreadsheet={handleDeleteSpreadsheet}
                            onChange={handleOnChange}
                        />
                        <div style={{ height: '25px', width: '100%' }}></div>
                    </pre>
                )
                )
        }
    </Layout>
}

export async function getServerSideProps({ req, params }) {

    const authToken = req.cookies.token;
    const response = await fetch(`http://gretljestslaby.pythonanywhere.com/api/sheets/${params.slug}`, {
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })
    const data = await response.json();

    if (!data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return { props: { data } }
}