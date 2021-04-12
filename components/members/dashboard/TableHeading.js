import { Button, Checkbox, Grid, IconButton, Typography } from "@material-ui/core";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import { useState } from "react";

export const TableHeading = ({ checkedCallback, onDelete, onCreate }) => {
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        checkedCallback(event.target.checked);
    };

    return (
        <Grid style={{ paddingBottom: '20px' }} justify='space-between' container>
            <Grid xs={8} md={6} item container>
                <Grid xs={4} item>
                    <div className='list-tile-leading'>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="secondary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <Typography className='list-lite-item' component='h1' variant='subtitle2'>
                            Name
                    </Typography>
                    </div>
                </Grid>
                <Grid xs={4} className='list-lite-item' item>
                    <Typography component='h1' variant='subtitle2'>
                        Last edit
                    </Typography>
                </Grid>
                <Grid xs={4} className='list-lite-item' item>
                    <Typography component='h1' variant='subtitle2'>
                        Created at
                    </Typography>
                </Grid>
            </Grid>
            <Grid className='list-lite-item' item>
                <IconButton onClick={onDelete}><DeleteOutlineOutlined /></IconButton>
                <Button onClick={onCreate} color='secondary' variant='contained'>
                    New sheet
                </Button>
            </Grid>
        </Grid>
    )
}