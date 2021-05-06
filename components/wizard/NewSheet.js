import React, { useContext, useState } from 'react';
import { useMediaQuery, Grid, Typography, TextField, Button, LinearProgress } from '@material-ui/core';
import { WizardContext } from '../../context/WizardContext';
import { useRouter } from 'next/router'
import { addNewSheet, apiUrl } from '../../utils/services';
import Image from 'next/image'
import { trigger } from 'swr';

export const NewSheetContent = () => {
    const matches = useMediaQuery('(max-width:600px)');
    const router = useRouter()
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [, setWizard] = useContext(WizardContext);

    const onClickCallback = () => router.push(`/sheets/${name}`);

    const handleSubmit = async (event) => {
        const url = `${apiUrl}api/sheets/`;
        trigger(url);
        setIsLoading(true)
        event.preventDefault();
        let res = await addNewSheet(name);
        if (res.status === 201) {
            onClickCallback()
            setWizard({
                open: false,
            })
        }
    }

    return (
        <Grid container>
            <Grid xs={12} md={6} lg={6} item>
                <Grid spacing={4} container>
                    <Grid xs={12} item>
                        <Typography variant="h3" component="h1">
                            Create new data sheet
                        </Typography>
                    </Grid>
                    <Grid xs={12} item>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <Grid xs={12} md={6} item>
                                <Grid item>
                                    <TextField onInput={e => setName(e.target.value)} value={name} style={{ width: '100%' }} id="standard-basic" label="Project name" color='secondary' />
                                    {isLoading ? <LinearProgress color="secondary" /> : <></>}
                                </Grid>
                                <Grid item>
                                    <Button type='submit' style={{ marginTop: '25px' }} variant='contained' size='large' color='secondary'>Done</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
            {
                matches ? null :
                    <Grid xs={6} item>
                        <Image src="/assets/newSmall.png" alt="people" width="640" height="427" />
                    </Grid>
            }
        </Grid>
    )
}