import React, { useEffect } from 'react';
// import '../components/Home.module.css';
import axios from '../axiosConfig';
import { Box, Grid, Input, Button, Paper } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { NoEncryptionTwoTone } from '@mui/icons-material';
import { userInfo } from '../interface/userInfo';
import { setUserInfo } from '../features/userSlice';

const Home: React.FC = () => {
  const useStyles: any = makeStyles({
    paper: {
      height: '100vh',
      width: '90%',
      margin: 'auto',
      paddingTop: 200,
    },
    dataTable: {
      // borderRadius: none,
      marginTop: 100,
      marginBottom: 50,
    },
  });

  const classes = useStyles();

  const user = useSelector(selectUser);

  const [users, setUsers] = React.useState<userInfo[]>([]);

  useEffect(() => {
    const exeFetchUsers = async () => {
      const result = await axios.get('v1/users');
      const usersInfo: userInfo[] = result.data.map((v: userInfo) => {
        users.push(v);
      });
      setUsers(usersInfo);
      console.log('result', users);
    };
    exeFetchUsers();
  }, []);

  return (
    <Box sx={{ height: '100vh' }}>
      <Paper className={classes.paper}>
        <div>
          <table>
            <tbody>
              {users.map((v) => (
                <tr>
                  <td>{v.area}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Paper>
    </Box>
  );
};

export default Home;
