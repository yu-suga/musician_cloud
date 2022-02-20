import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../components/Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const moveEditProfile = () => {
    navigate('/editProfile');
  };

  return (
    <AppBar>
      <Toolbar>
        <div style={{ width: '100%' }}>
          <Box sx={{ display: 'flex', paddingRight: '5%', paddingLeft: '5%' }}>
            <h2 className={styles.headerTitle}>Sound Allies</h2>
            <IconButton
              size="large"
              color="inherit"
              sx={{ flexShrink: 1 }}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={moveEditProfile}>Edit Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
