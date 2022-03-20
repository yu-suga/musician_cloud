import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { userInfo } from '../interface/userInfo';
import axios from '../axiosConfig';

const user: userInfo = {
  id: 0,
  name: '',
  email: '',
  password: '',
  part: 0,
  area: 0,
  genre: 0,
  recruit: 0,
  profile_text: '',
  image: '',
  audio_1: '',
  audio_2: '',
  audio_3: '',
};

/**
 * 会員登録api実行処理
 * @param data
 */
export const fetchAsyncPostUser = createAsyncThunk(
  'user/get/user',
  async (reqData: userInfo) => {
    await axios.post('/v1/user/register', reqData);
    return reqData;
  }
);

/**
 * ユーザーID取得api実行処理
 * @param email
 */
export const FetchAsyncGetUserId = createAsyncThunk(
  'user/get/userId',
  async (email: string) => {
    const result = await axios.get<number>(`/v1/user/id/${email}`);
    console.log('result', result);
    return result;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: user,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUserInfo: (state, action: PayloadAction<userInfo>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        id: 0,
        name: '',
        email: '',
        password: '',
        part: 0,
        area: 0,
        genre: 0,
        recruit: 0,
        profile_text: '',
        image: '',
        audio_1: '',
        audio_2: '',
        audio_3: '',
      };
    },
    setUserId: (state, action: PayloadAction<number>) => {
      console.log('payload', state);
      state.user.id = state.user.id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncPostUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(FetchAsyncGetUserId.fulfilled, (state, action) => {
      console.log('payload', action.payload);
      if (!action.payload) {
        state.user.id = action.payload;
      }
    });
  },
});

export const { setUserInfo, logout, setUserId } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
