import * as React from 'react';
import { Admin, CustomRoutes, ListGuesser, Resource, TranslationMessages } from 'react-admin';
import authProvider from './authProvider';  
import { Login, Layout } from './layout';

import { lightTheme } from './layout/themes';
import { dataProvider } from './dataProvider';
import users from './pages/users';
import routes from './pages/routes';
import reviews from './pages/reviews';
import vehicles from './pages/units';
import { Dashboard } from './pages/dashboard';
import { Route } from 'react-router';
import Configuration from './pages/configuration/Configuration';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import en from './i18n/en';
import fr from './i18n/fr';
import es from './i18n/es';

const translations = { 'en': en, 'es': es };

function getLocaleI(locale: string): TranslationMessages {
    if(locale === 'en') return en;
    return es
}

const i18nProvider = polyglotI18nProvider(
    locale => getLocaleI(locale),
    'es', // default locale
    { allowMissing: true }
    
);





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
            i18nProvider={i18nProvider}
            
        >
            <Resource name="users" {...users} />
            <Resource name="alerts" list={ListGuesser} />
            <Resource name="units" {...vehicles} />
            <Resource name="reviews" {...reviews} />
            <Resource name="routes" {...routes} />

            <CustomRoutes>
                <Route path="/configuration" element={<Configuration />} />
            </CustomRoutes>
        </Admin>
    );
};

export default App;
