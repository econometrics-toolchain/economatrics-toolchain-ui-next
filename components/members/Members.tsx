import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Layout } from "../../components/members/layout";
import { a11yProps, AntTablePanel, AntTabs } from '../../components/members/dashboard/AntTabs';
import { MySheets } from '../../components/members/dashboard/MySpreadsheets';
import Tab from '@material-ui/core/Tab';
import { CachedSheetsProvider } from "../../context/CachedSheetsContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));

export function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <div className={classes.root}>
        <AntTabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="My sheets" {...a11yProps(0)} />
          <Tab label="payments" {...a11yProps(2)} />
        </AntTabs>
        <AntTablePanel value={value} index={0}>         
            <MySheets />
        </AntTablePanel>
        <AntTablePanel value={value} index={1}>
          {/* <Payments /> */}
        </AntTablePanel>
      </div>
    </Layout>);
}
