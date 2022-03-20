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
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUserInfo } from '../features/userSlice';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { userInfo } from '../interface/userInfo';
import { updateUserInfo } from '../interface/updateUserInfo';
import { mst, fetchArea } from '../config/userInfoConfig';
import areaMst from '../config/areaConst.json';
import genreMaster from '../config/genreConst.json';
import musicPartMaster from '../config/musicPartConst.json';
import { SelectChangeEvent } from '@mui/material';

const EditProfile = () => {
  const useStyles: any = makeStyles({
    root: {
      height: '100vh',
    },
    inputPaper: {
      margin: 'auto',
      padding: 70,
      maxWidth: '80%',
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

  const [userInfo, setUserInfo] = React.useState<userInfo>(user);

  const imgFileName = 'logo192.png';
  const baseImagePath = `${process.env.PUBLIC_URL}/img/${imgFileName}`;

  const audioFileName = 'logo192.png';
  const baseAudioPath = `${process.env.PUBLIC_URL}/audio/${audioFileName}`;

  const exitEdit: SubmitHandler<userInfo> = (data) => {
    console.log('data');
  };

  const fetchAreaInfo = () => {
    // console.log('result', fetchArea(1));
    return fetchArea(userInfo.area);
  };

  const reqDate: updateUserInfo = {
    area: 1,
    genre: 1,
    audio_1: '',
    part: 1,
    profile_text: '',
    image: '',
    name: '',
    email: 'yu1996@outlook.jp',
  };
  /**
   * ユーザー情報更新api実行処理
   * @param email
   */
  const exeUpdateUserApi = async (reqDate: updateUserInfo) => {
    return await axios.put(`/v1/user/edit`);
  };

  const dispatch = useDispatch();

  const areaInfo: mst = areaMst.area;
  const genreInfo: mst = genreMaster.genre;
  const musicPartInfo: mst = musicPartMaster.part;

  const handleChangeArea = (e: SelectChangeEvent<number>) =>
    (user.area = Number(e.target.value));

  const handleChangeGenre = (e: SelectChangeEvent<number>) =>
    (user.genre = Number(e.target.value));

  const handleChangePart = (e: SelectChangeEvent<number>) =>
    (user.part = Number(e.target.value));

  const updateUser = async () => {
    const res = await exeUpdateUserApi(reqDate);
    if (res.status === 200) {
      dispatch(setUserInfo);
    }
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
                      src={baseImagePath}
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
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Grid item sx={{ paddingBottom: 2 }}>
                  <InputLabel className={classes.label} id="city">
                    活動拠点
                  </InputLabel>
                  <Select
                    id="city"
                    label={areaInfo[userInfo.area]}
                    sx={{ width: '100%' }}
                    onChange={handleChangeArea}
                  >
                    {Object.keys(areaInfo).map((key) => (
                      <MenuItem id="city" value={key}>
                        {areaInfo[Number(key)]}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item sx={{ paddingBottom: 2 }}>
                  <InputLabel className={classes.label} id="city">
                    ジャンル
                  </InputLabel>
                  <Select
                    id="genre"
                    labelId="genre"
                    sx={{ width: '100%' }}
                    onChange={handleChangeGenre}
                  >
                    {Object.keys(genreInfo).map((key) => (
                      <MenuItem id="genre" value={key}>
                        {genreInfo[Number(key)]}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item sx={{ paddingBottom: 2 }}>
                  <InputLabel className={classes.label}>音源</InputLabel>

                  <div className={styles.audioInput}>
                    <input type="file" value={user.audio_1}></input>
                  </div>
                </Grid>
                <Grid item sx={{ paddingBottom: 2 }}>
                  <InputLabel className={classes.label} id="city">
                    探しているパート
                  </InputLabel>
                  <Select
                    id="part"
                    labelId="part"
                    sx={{ width: '100%' }}
                    onChange={handleChangePart}
                  >
                    {Object.keys(musicPartInfo).map((key) => (
                      <MenuItem
                        id="part"
                        defaultValue={musicPartInfo[userInfo.part]}
                        value={key}
                      >
                        {musicPartInfo[Number(key)]}
                      </MenuItem>
                    ))}
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
                      onClick={updateUser}
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
