import { combineDataProviders } from "react-admin";
import { alertDataProvider } from "./alertDataProvider";
import { documentDataProvider } from "./documentDataProvider";
import { personDataProvider } from "./personDataProvider";
import { reviewDataProvider } from "./reviewDataProvider";
import { roleDataProvider } from "./roleDataProvider";
import { routeDataProvider } from "./routeDataProvider";



export const dataProvider = combineDataProviders((resource) => {
    switch (resource) {
        case 'users':
            return personDataProvider
        case 'reviews':
            return reviewDataProvider;
        case 'roles':
            return roleDataProvider
        case 'documents':
            return documentDataProvider
        case 'alerts':
            return alertDataProvider
        case 'routes':
            return routeDataProvider
        default:
            throw new Error(`Unknown resource: ${resource}`);
    }
});


