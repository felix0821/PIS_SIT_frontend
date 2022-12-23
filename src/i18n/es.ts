import { TranslationMessages } from 'react-admin';
import englishMessages from 'ra-language-english';
import spanishMessages from './spanishMessages';

const customSpanishMessages: TranslationMessages = {
    ...spanishMessages,
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Idioma',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        dashboard: {
            monthly_revenue: 'Monthly Revenue',
            month_history: '30 Day Revenue History',
            new_orders: 'New Orders',
            pending_reviews: 'Pending Reviews',
            all_reviews: 'See all reviews',
            new_customers: 'New Customers',
            all_customers: 'See all customers',
            pending_orders: 'Pending Orders',
            order: {
                items:
                    'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
            },
            welcome: {
                title: 'Welcome to the react-admin e-commerce demo',
                subtitle:
                    "This is the admin of an imaginary poster shop. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
                ra_button: 'react-admin site',
                demo_button: 'Source for this demo',
            },
        },
        menu: {
            sales: 'Sales',
            catalog: 'Catalog',
            customers: 'Customers',
        },
    },
    resources: {
        users: {
            name: 'Persona |||| Personas',
        },
        alerts: {
            name: 'Alerta |||| Alertas',
        },
        reviews: {
            name: 'Calificación |||| Calificaciones',
        },
        manageSIT:{
            name: 'Gestion SIT',
            routes: {
                name: 'Ruta |||| Rutas',
            },
            units: {
                name: 'Unidad |||| Unidades',
            }
        }
       
    },
    system: {
        name: "Sistema Integrado de Transporte de Arequipa"
    }
};

export default customSpanishMessages;
