import React, { useEffect } from 'react';
// import '../components/Home.module.css';
import { Box, Grid, Input, Button, Paper } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { NoEncryptionTwoTone } from '@mui/icons-material';

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

  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  const columns: GridColDef[] = [
    { field: 'col1', headerName: '', width: 150 },
    { field: 'col2', headerName: '', width: 150 },
    { field: 'col3', headerName: '', width: 150 },
  ];

  return (
    <Box sx={{ height: '100vh' }}>
      <Paper className={classes.paper}>
        {/* <DataGrid
          className={classes.dataTable}
          rows={rows}
          columns={columns}
          hideFooter
          disableColumnMenu
        /> */}
        <div>
          <table>
            <tbody>
              <tr>
                <td>内容1</td>
                <td>内容2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Paper>
    </Box>
  );
};

export default Home;
