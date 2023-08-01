import ForgetPassword from '../pages/ForgetPassword/ForgetPassword';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import AddME from '../pages/AddME/AddME';
import Sidebar from '../components/Sidebar/Sidebar';
import Me from '../pages/ME/Me';
import Ngo from '../pages/Ngo/Ngo';
import NotFound from '../pages/NotFound/NotFound';
import Profile from '../pages/Profile/Profile';
import FieldOffice from '../pages/FieldOffice/FieldOffice';
import SingleMe from '../pages/ME/SingleMe/SingleMe';
import SingleNgo from '../pages/Ngo/SingleNgo/SingleNgo';
import SingleFieldOffice from '../pages/FieldOffice/SingleFieldOffice/SingleFieldOffice';
import Login from '../pages/Login/Login';
import AllMeOfNgo from '../pages/AllMeOfNgo/AllMeOfNgo';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PermissionRoute from './PrivateRoute/PermissionRoute';
import Address from '../pages/Address/Address';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute component={<Sidebar />} />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'me', element: <Me /> },
      { path: 'me/:id', element: <SingleMe /> },
      {
        path: 'ngo',
        element: <PermissionRoute component={<Ngo />} permission={['admin']} />,
      },
      {
        path: 'ngo/:id',
        element: (
          <PermissionRoute component={<SingleNgo />} permission={['admin']} />
        ),
      },
      { path: 'ngo/:id/all-me-ngo', element: <AllMeOfNgo /> },
      { path: 'add-me', element: <AddME /> },
      { path: 'address', element: <Address /> },
      { path: 'profile', element: <Profile /> },
      {
        path: 'branch',
        element: (
          <PermissionRoute
            component={<FieldOffice />}
            permission={['admin', 'ngo']}
          />
        ),
      },

      {
        path: 'branch/:id',
        element: (
          <PermissionRoute
            component={<SingleFieldOffice />}
            permission={['admin', 'ngo']}
          />
        ),
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'forget-password',
    element: <ForgetPassword />,
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
