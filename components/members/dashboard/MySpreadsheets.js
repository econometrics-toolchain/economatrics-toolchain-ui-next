import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { WizardContext } from '../../../context/WizardContext';
import { deleteSpreadsheet } from '../../../utils/services';
import { TableHeading } from './TableHeading';
import { MySheetsSkeleton } from '../../other/loaders';
import { ListTile } from './ListTile';
import { useMySheets } from '../../../hooks/useMySheets';
import { NewSheetContent } from '../../wizard/NewSheet';

function WrappedMySheets() {

    const [, setWizard] = useContext(WizardContext);
    const [sheets, setSheets, isLoading] = useMySheets();

    const handleCheck = (index) => {
        let tmp = [...sheets]
        tmp[index].checked = !tmp[index].checked
        setSheets(tmp)
    }

    const handleCreate = () => {
        setWizard({
            open: true,
            content: <NewSheetContent />,
            fullScreen: true,
        })
    }
    const handleCheckAll = (checked) => {
        let tmp = [...sheets]
        sheets.forEach((sheet, index) => {
            tmp[index] = { data: sheet.data, checked: checked }
        });
        setSheets(tmp)
    }
    const handleDelete = () => {
        let requests = []
        let tmp = []

        sheets.forEach((sheet) => {
            if (sheet.checked) {
                requests.push(deleteSpreadsheet(sheet.data.name))
            } else {
                tmp.push(sheet)
            }
        });

        axios.all(requests).then(
            setSheets(tmp)
        );
    }

    return (
        <>
            <TableHeading checkedCallback={handleCheckAll} onDelete={handleDelete} onCreate={handleCreate} />
            <Grid container spacing={2}>
                {
                    !isLoading ?
                        sheets.map((item, index) => (
                            <ListTile
                                key={index}
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

export const MySheets = React.memo(WrappedMySheets);