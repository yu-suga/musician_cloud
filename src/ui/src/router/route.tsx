import { Route, Routes } from 'react-router-dom';
import { VFC } from 'react';
import Home from '../components/Home';
import Auth from '../components/Auth';
import EditProfile from '../components/EditProfile';

const routes: VFC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/editProfile" element={<EditProfile />} />
    </Routes>
  );
};

export default routes({});
