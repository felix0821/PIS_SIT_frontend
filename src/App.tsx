import * as React from 'react';
import { Admin, ListGuesser, Resource } from 'react-admin';
import authProvider from './authProvider';  
import { Login, Layout } from './layout';

import { lightTheme } from './layout/themes';
import { dataProvider } from './dataProvider';
import users from './pages/users';
import routes from './pages/routes';
import reviews from './pages/reviews';
import vehicles from './pages/units';
import { Dashboard } from './pages/dashboard';
//

const App = () => {
    return (
        <Admin 
            title="SIT ADMIN"
            dataProvider={dataProvider}
            authProvider={authProvider}
            loginPage={Login}
            layout={Layout}
            dashboard={Dashboard}
            disableTelemetry
            theme={lightTheme}
            
        >
            <Resource name="users" {...users} />
            <Resource name="alerts" list={ListGuesser} />
            <Resource name="units" {...vehicles} />
            <Resource name="reviews" {...reviews} />
            <Resource name="routes" {...routes} />
        </Admin>
    );
};

export default App;
