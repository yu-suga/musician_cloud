import React from 'react';
import axios from '../axiosConfig';
import styles from '../components/EditProfile.module.css';
import {
  Grid,
  Button,
  Paper,
  TextField,
  IconButton,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { userInfo } from '../interface/userInfo';
import image from '../tmp/image/boy1.png';
import audio from '../tmp/image/boy1.png';

const EditProfile = () => {
  const useStyles: any = makeStyles({
    root: {
      height: '100vh',
    },
    inputPaper: {
      margin: 'auto',
      padding: 70,
      maxWidth: '70%',
      flexGrow: 1,
      textAlign: 'center',
    },
    label: {
      textAlign: 'left',
    },
  });

  const classes = useStyles();

  const { handleSubmit, control } = useForm<userInfo>();

  const user = useSelector(selectUser);

  const exitEdit: SubmitHandler<userInfo> = (data) => {
    console.log('data');
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Paper className={classes.inputPaper}>
          <form onSubmit={handleSubmit(exitEdit)}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={16}>
                <Grid item xs={6}>
                  <h1 className={styles.title}>Edit your Profile</h1>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid item>
                  <IconButton>
                    <Avatar
                      sx={{ width: 200, height: 200 }}
                      src={image}
                    ></Avatar>
                  </IconButton>
                </Grid>
                <Grid item sx={{ paddingBottom: 2 }}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        label="ユーザー名"
                        variant="standard"
                        {...field}
                      />
                    )}
                    name="name"
                    control={control}
                    defaultValue={user.name}
                  />
                  {user.id}
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Grid item sx={{ paddingBottom: 2 }}>
                  <InputLabel className={classes.label} id="city">
                    活動拠点
                  </InputLabel>
                  <Select id="city" labelId="city" sx={{ width: '100%' }}>
                    <MenuItem value={10}>Ten</MenuItem>
                  </Select>
                </Grid>
                <Grid item sx={{ paddingBottom: 2 }}>
                  <InputLabel className={classes.label} id="city">
                    ジャンル
                  </InputLabel>
                  <Select id="city" labelId="city" sx={{ width: '100%' }}>
                    <MenuItem value={10}>Ten</MenuItem>
                  </Select>
                </Grid>
                <Grid item sx={{ paddingBottom: 2 }}>
                  <InputLabel className={classes.label}>音源</InputLabel>
                  <div className={styles.audioInput}>
                    <input type="file"></input>
                  </div>
                </Grid>
                <Grid item sx={{ paddingBottom: 2 }}>
                  <InputLabel className={classes.label} id="city">
                    探しているパート
                  </InputLabel>
                  <Select id="city" labelId="city" sx={{ width: '100%' }}>
                    <MenuItem value={10}>Ten</MenuItem>
                  </Select>
                </Grid>
                <Grid item sx={{ paddingBottom: 2 }}>
                  <InputLabel className={classes.label} id="city">
                    プロフィール文
                  </InputLabel>
                  <TextField multiline rows={4} sx={{ width: '100%' }} />
                </Grid>
                <Grid item>
                  <div className={styles.submitBtn}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ width: '30%' }}
                    >
                      変更する
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default EditProfile;
