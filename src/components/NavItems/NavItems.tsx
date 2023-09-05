import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useLocation } from 'react-router-dom';
import '../../index.css';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';

const categories = [
  {
    id: 1,
    icon: <DashboardIcon />,
    routeName: 'Dashboard',
    route: '',
    permission: ['admin', 'ngo', 'fo'],
  },
  {
    id: 2,
    icon: <AccountCircleIcon />,
    routeName: 'ME',
    route: 'me',
    permission: ['admin', 'ngo', 'fo'],
  },
  {
    id: 3,
    icon: <CorporateFareIcon />,
    routeName: 'NGO',
    route: 'ngo',
    permission: ['admin'],
  },
  {
    id: 4,
    icon: <DirectionsBikeIcon />,
    routeName: 'Branch',
    route: 'branch',
    permission: ['admin', 'ngo'],
  },
  {
    id: 5,
    icon: <PersonAddIcon />,
    routeName: 'Add ME',
    route: 'add-me',
    permission: ['admin', 'ngo', 'fo'],
  },
  {
    id: 6,
    icon: <LocationOnIcon />,
    routeName: 'Area Id',
    route: 'address',
    permission: ['admin', 'ngo', 'fo'],
  },
];

export default function NavItems() {
  const { user } = useAuthContext();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];
  return (
    <>
      {categories.map((item) => {
        if (item.permission.includes(user.type || '')) {
          return (
            <NavLink
              className={currentPath === item.route ? 'activeSidebarLink' : ''}
              key={item.id}
              to={`${item.route}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon
                    className={
                      currentPath === item.route ? 'activeSidebarLink' : ''
                    }
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.routeName} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          );
        } else {
          return '';
        }
      })}
    </>
  );
}
