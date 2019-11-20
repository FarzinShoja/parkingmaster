import React from 'react';

//Import Material-Ui API
import Paper from '@material-ui/core/Paper';
import { makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


// import PhoneIcon from '@material-ui/icons/Phone';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StorageIcon from '@material-ui/icons/Storage';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';


//Import Components
import SpotCounter from "./Counter.jsx";
import GetLog from "./GetLog.jsx";
import GetAllStudents from "./GetAllStudents.jsx";
import CreateStudentComp from "./CreateStudentComp.jsx";
import GetAllVehicles from "./GetAllVehicles.jsx";
import CreateVehicleComp from "./CreateVehicleComp.jsx";


const useStyles = makeStyles({
  root: {
    backgroundColor: '#333',
    color: 'white',
    flexGrow: 1,
  },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }


  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }


export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);



    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        TabIndicatorProps= {{style: {background:'green'}}}
        textColor="white"
        aria-label="icon label tabs example"
        centered
      >
        <Tab icon={<StorageIcon />} label="Data Log" {...a11yProps(0)} />
        <Tab icon={<PeopleAltIcon />} label="Student" {...a11yProps(1)} />
        <Tab icon={<DriveEtaIcon />} label="Vehicles" {...a11yProps(2)} />
        <Tab icon={<ScheduleIcon />} label="Space Counter" {...a11yProps(3)} />
      </Tabs>


      <TabPanel value={value} index={0}>
        <GetLog> </GetLog>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GetAllStudents></GetAllStudents>
        <CreateStudentComp></CreateStudentComp>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GetAllVehicles></GetAllVehicles>
        <CreateVehicleComp></CreateVehicleComp>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SpotCounter></SpotCounter>
      </TabPanel> 
      </Paper>     
  );
}
