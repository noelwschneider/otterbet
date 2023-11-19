import { Route } from 'react-router-dom';
import LoginPage from '../Auth/LoginPage';
import useStore from '../../hooks/useStore'

// Return route to child component if user is logged in
// Otherwise return the login component
export default function ProtectedRoute({ component, children, ...props }) {
    const user = useStore("user");
    const ProtectedComponent = component || (() => children);
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