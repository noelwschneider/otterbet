import { Route } from 'react-router-dom';
import LoginPage from '../LoginRegister/LoginPage';
import useStore from '../../hooks/useStore'

// Return route to child component if user is logged in
// Otherwise return the login component
export default function ProtectedRoute({ component, children, ...props }) {
  const user = useStore("user");

  // Component passed in as child
  const ProtectedComponent = () => children;

  return (
    <Route {...props}>
      {user.id ?
        <ProtectedComponent />
        :
        <LoginPage />
      }
    </Route>
  );
}