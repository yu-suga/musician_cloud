import React from 'react';
import axios from '../axiosConfig';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Grid, TextField, Button, Paper, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import styles from '../components/Auth.module.css';
import { useState } from 'react';
import { userInfo } from '../interface/userInfo';
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register: React.FC = () => {
  const useStyles: any = makeStyles({
    root: {
      height: '100vh',
    },
    inputPaper: {
      margin: 'auto',
      padding: 70,
      maxWidth: '30%',
      flexGrow: 3,
      textAlign: 'center',
    },
    label: {
      textAlign: 'left',
    },
  });

  const navigate = useNavigate();

  const classes = useStyles();

  const [errorMsgFlg, setErrorMsgFlg] = useState(false);

  const { handleSubmit, control } = useForm<userInfo>();

  //ログイン表示/非表示フラグ
  const [isLoginMode, setIsLoginMode] = useState(true);

  const dispatch = useDispatch();

  /**
   * 会員登録処理
   * @param data
   */
  const register: SubmitHandler<userInfo> = async (data) => {
    const reqData: userInfo = {
      id: 0,
      name: data.name,
      email: data.email,
      password: data.password,
      age: 0,
      area: 0,
      genre: 0,
      recruit: 0,
      profile_text: '',
      image: '',
      audio_1: '',
      audio_2: '',
      audio_3: '',
    };

    const result = await exeRegisterApi(reqData);
    console.log(result);
    if (result.status === 200) {
      const res = await exeFetchUserId(data.email);
      const result = res.data.map((val: userInfo) => val.id);
      console.log('resid', result[0]);
      reqData.id = result[0];
      console.log('dispatch', reqData);
      const assetData = Object.assign(reqData);
      dispatch(login(assetData));
      navigate('/home');
    } else {
      setErrorMsgFlg(true);
    }
  };

  /**
   * ログイン処理
   * @param reqData
   */
  const login: SubmitHandler<userInfo> = async (data) => {
    console.log('ログイン処理実行');
  };

  /**
   * 会員登録api実行処理
   * @param reqData
   * @returns
   */
  const exeRegisterApi = async (reqData: userInfo) => {
    return await axios.post(`/v1/user/register`, reqData);
  };

  /**
   * ログインapi実行処理
   * @param data
   */
  const exeloginApi = async (reqData: userInfo) => {
    return await axios.get('/v1/user');
  };

  /**
   * ユーザーID取得api実行処理
   * @param email
   */
  const exeFetchUserId = async (email: string) => {
    return await axios.get(`/v1/user/id/${email}`);
  };

  /**
   * 入力formにて会員登録/ログインのモード切り替え
   */
  const changeAuthMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <Grid container className={classes.root}>
      <Paper className={classes.inputPaper}>
        <h1 className={styles.title}>Sound Allies</h1>
        <h3 className={styles.subtitle}>音楽仲間を探そう！</h3>
        <form onSubmit={handleSubmit(isLoginMode ? login : register)}>
          {!isLoginMode && (
            <>
              <InputLabel className={classes.label} sx={{ paddingBottom: 2 }}>
                ユーザー名
              </InputLabel>
              <Controller
                render={({ field }) => (
                  <TextField sx={{ paddingBottom: 2 }} fullWidth {...field} />
                )}
                name="name"
                control={control}
                defaultValue=""
              />
            </>
          )}
          <InputLabel className={classes.label} sx={{ paddingBottom: 2 }}>
            メールアドレス
          </InputLabel>
          <Controller
            render={({ field }) => (
              <TextField sx={{ paddingBottom: 2 }} fullWidth {...field} />
            )}
            name="email"
            control={control}
            defaultValue=""
          />
          {errorMsgFlg && (
            <p className="error-msg">すでに登録されているメールアドレスです</p>
          )}
          <InputLabel
            className={classes.label}
            htmlFor="outlined-adornment-password"
            sx={{ paddingBottom: 2 }}
          >
            パスワード
          </InputLabel>
          <Controller
            render={({ field }) => <TextField fullWidth {...field} />}
            name="password"
            control={control}
            defaultValue=""
          />
          <Button sx={{ mt: 4 }} type="submit" variant="contained" fullWidth>
            {isLoginMode ? 'ログイン' : '登録'}
          </Button>
          <div>
            <Button onClick={changeAuthMode} sx={{ mt: 1 }}>
              {isLoginMode ? '登録する' : 'ログインする'}
            </Button>
          </div>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
