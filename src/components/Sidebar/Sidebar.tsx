import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, Button, Menu, MenuItem } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import NavItems from '../NavItems/NavItems';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import { AUTH_USER_FAILED, ImgUrl } from '../../utils/Helpers/Constant';
import logo from '../../assets/medb.png';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Sidebar(props: Props) {
  const { window } = props;
  const { dispatch, user } = useAuthContext();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Link to={'/'}>
          <img
            src={logo}
            width={200}
            height={50}
            style={{ objectFit: 'contain', padding: '8px 0px' }}
          />
        </Link>
      </Toolbar>
      <Divider />
      {/* dashboard all navLinks  */}
      <List>
        <NavItems />
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: { xs: 'unset', sm: 'flex' } }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#0e87a3',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div'>
            Welcome to ME Database
          </Typography>

          <div>
            <Button
              id='fade-button'
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              variant='text'
              sx={{ color: 'white' }}
            >
              <Avatar
                alt=''
                src={
                  user.image
                    ? `${ImgUrl}/ngo_files/${user.image}`
                    : '/src/assets/MaleAvatar.jpg'
                }
                sx={{ width: 35, height: 35 }}
              />
            </Button>

            <Menu
              id='fade-menu'
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              // TransitionComponent="Fade"
            >
              <MenuItem onClick={handleClose}>
                <Button
                  style={{ textDecoration: 'none', color: 'black' }}
                  onClick={() => {
                    navigate('/profile');
                  }}
                >
                  Profile
                </Button>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch?.({ type: AUTH_USER_FAILED });
                  handleClose();
                }}
              >
                <Button style={{ textDecoration: 'none', color: 'black' }}>
                  Log Out
                </Button>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
