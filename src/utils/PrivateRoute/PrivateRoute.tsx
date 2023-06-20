import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';
import GlobalLoader from '../../components/loading/GlobalLoader';

interface IComponent {
  component: JSX.Element;
}
export default function PrivateRoute({ component }: IComponent) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <GlobalLoader />;
  }

  if (user.name) {
    return component;
  } else {
    return <Navigate to='login' />;
  }
}
