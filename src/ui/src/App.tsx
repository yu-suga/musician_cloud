import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './features/userSlice';
import routes from './router/route';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import styles from './App.module.css';

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <html className={styles.html}>
      <BrowserRouter>
        <Header></Header>
        {routes}
      </BrowserRouter>
    </html>
  );
};

export default App;
