import { createSlice, getDefaultMiddleware } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { userInfo } from '../interface/userInfo';

const user: userInfo = {
  id: 0,
  name: '',
  email: '',
  password: '',
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

const middleware = getDefaultMiddleware({ serializableCheck: false });

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: user,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        id: 0,
        name: '',
        email: '',
        password: '',
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
    },
  },
});
export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
