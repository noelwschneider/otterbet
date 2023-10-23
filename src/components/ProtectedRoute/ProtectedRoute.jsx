import { Route } from 'react-router-dom';
import LoginPage from '../LandingComponents/LoginPage/LoginPage';
import {useSelector} from 'react-redux';


// Return route to child component if user is logged in
// Otherwise return the login component
function ProtectedRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user);

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

export default ProtectedRoute;