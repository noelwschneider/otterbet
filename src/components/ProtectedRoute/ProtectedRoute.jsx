import { Route } from 'react-router-dom';
import Auth from '../Auth/Auth';
import useStore from '../../hooks/useStore';

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
                <Auth />
            }
        </Route>
    );
}