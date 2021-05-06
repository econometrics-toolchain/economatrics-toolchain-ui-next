import { Checkbox, Grid, IconButton } from '@material-ui/core';
import { MoreVertRounded } from '@material-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { truncate } from '../../../utils';

export const ListTile = ({ pk, item, onChange, checked }) => {
    // const history = useRouter();
    // const onClickCallback = () => history.push(`/sheets/${item.name}`);

    const handleChange = (event) => {
        onChange(pk)
    };

    return (
        <Grid justify='space-between' className="list-tile pointer" xs={12} item container >
            <Grid xs={8} md={6} item container>
                <Grid xs={4} item>
                    <div className='list-tile-leading'>
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="secondary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <Link href={`/sheets/${item.name}`}>
                            <div className='list-lite-item name'>
                                {truncate(item.name)}
                            </div>
                        </Link>
                    </div>
                </Grid>

                <Grid xs={4} className='list-lite-item' item>
                    {new Date(item.updated_at).toLocaleDateString()}
                </Grid>
                <Grid xs={4} className='list-lite-item' item>
                    {new Date(item.created_at).toLocaleDateString()}
                </Grid>
            </Grid>
            <Grid xs={4} md={6} className='list-lite-item' justify='flex-end' item container>
                <IconButton size='small'>
                    <MoreVertRounded />
                </IconButton>
            </Grid>
        </Grid>
    )
}

ListTile.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        inputs: PropTypes.array,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
    })
}