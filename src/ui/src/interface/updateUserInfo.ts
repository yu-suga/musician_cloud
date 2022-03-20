import { userInfo } from '../interface/userInfo';

export type updateUserInfo = Omit<
  userInfo,
  'recruit' | 'audio_2' | 'audio_3' | 'password'
>;
