import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext/AuthContext';

interface IComponent {
  component: JSX.Element;
  permission: string[];
}

export default function PermissionRoute({ component, permission }: IComponent) {
  const { user } = useAuthContext();
  if (user.type === 'admin') {
    return component;
  }
  if (permission.includes(user.type || '')) {
    return component;
  } else {
    return <Navigate to='/404' />;
  }
}
