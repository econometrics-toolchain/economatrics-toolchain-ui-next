import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { WizardContext } from '../../../context/WizardContext';
import { apiUrl, deleteSpreadsheet, fetcher, getMySheets } from '../../../utils/services';
import { TableHeading } from './TableHeading';
import { MySheetsSkeleton } from '../../other/loaders';
import { ListTile } from './ListTile';
import { NewSheetContent } from '../../wizard/NewSheet';
import useSWR, { mutate } from 'swr';


export function MySheets({ initialSheets }) {
    const url = `${apiUrl}api/sheets/`;
    const { data: sheets } = useSWR(url, fetcher, { initialData: initialSheets });
    const [, setWizard] = useContext(WizardContext);

    const handleCheck = (index) => {
        const tmp = [...sheets];
        tmp[index].checked = !tmp[index].checked;
        mutate(url, [...tmp], false);
    }

    const handleCreate = () => {
        setWizard({
            open: true,
            content: <NewSheetContent />,
            fullScreen: true,
        })
    }
    const handleCheckAll = (checked) => {
        const tmp = [...sheets]
        tmp.forEach((sheet, index) => {
            sheet.checked = checked;
        });
        mutate(url, [...tmp], false);
    }

    const handleDelete = () => {
        let requests = []
        let tmp = []

        mutate(url, sheets.filter(el => el.checked !== true), false);

        sheets.forEach((sheet) => {
            if (sheet.checked) {
                requests.push(deleteSpreadsheet(sheet.name))
            } else {
                tmp.push(sheet)
            }
        });

        axios.all(requests);
    }

    return (
        <>
            <TableHeading checkedCallback={handleCheckAll} onDelete={handleDelete} onCreate={handleCreate} />
            <Grid container spacing={2}>
                {
                    sheets ?
                        sheets.map((item, index) => (
                            <ListTile
                                key={item.name}
                                pk={index}
                                item={item}
                                checked={item.checked}
                                onChange={handleCheck}
                            />
                        ))
                        :
                        (<MySheetsSkeleton />)
                }
            </Grid>
        </>
    )
}

