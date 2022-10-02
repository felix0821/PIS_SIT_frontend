import * as React from 'react';
import { Create, required, CreateProps, email, minLength, maxLength, useDataProvider, Loading, Error, useNotify, useListContext } from 'react-admin';
import { Box, CardHeader, CardContent, Button, Stepper, Step, StepLabel, Grid, CircularProgress, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { Person } from '../../types';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import axios from 'axios';
import "./formik.css"

//import { ProductEditDetails } from './ProductEditDetails';
import { useState, useEffect } from 'react';
import { object, string} from 'yup';

//
import { fetchUtils } from 'react-admin';
import MenuItem from '@mui/material/MenuItem';
import { Close, Height } from '@mui/icons-material';

import DatePickerField from './DatePickerField'
import { FormikStep, FormikStepper } from './FormikStepper';
import { useHeaderWithToken } from '../../custom-hooks';
const apiUrl = 'https://sit-backend.herokuapp.com';
const httpClient = fetchUtils.fetchJson;

interface Props extends CreateProps<Person> {
    onCancel: () => void;
}

const style = {
    position: "absolute",
    backgroundColor: "#FFF",
    padding: "15px",
    zIndex: "1000",
    borderRadius: ".5em",
    width: "70%",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const styleMobile = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: 'translate(-50%, -50%)',
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "rgba(0,0,0, .8)",
    zIndex: "1000",
    overflowY: "auto",
    bgcolor: 'background.paper',
    borderRadius: ".5em",
    '&::-webkit-scrollbar': {
        width: '0.4em',
        height: '0.4em'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'orange',
        borderRadius: ".5em"
    },
};

const styleTablet = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: 'translate(-50%, -50%)',
    width: "60%",
    maxHeight: "80%",
    backgroundColor: "rgba(0,0,0, .8)",
    zIndex: "1000",
    overflowY: "auto",
    bgcolor: 'background.paper',
    borderRadius: ".5em",
    '&::-webkit-scrollbar': {
        width: '0.4em',
        height: '0.4em'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'orange',
        borderRadius: ".5em"
    },
};


const UserCreate = ({ onCancel, ...props }: Props) => {
    interface LabeledValue {
        status: number;
        headers: Headers;
        body: string;
        json: any;
    }

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const notify = useNotify();

    const dataProvider = useDataProvider();
    const [roles, setRoles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const [documents, setDocuments] = useState<any[]>([]);

    const { refetch } = useListContext()


    async function debouncedApi(email: any){
        //retorna si email está disponible
        let res = await dataProvider.verifyEmail('users', email)
            .then(({ data }: any) => {
                return data
            })
            .catch((error: any) => {
                setError(error);
                setLoading(false);
                return "ERROR PAISAFwesf"
            })
        console.log(res.content)
        let resp = (res.content == "El nombre de usuario o correo electrónico está disponible.")
        return resp
    }


    useEffect(() => {


        dataProvider.getAll('roles')
            .then(({ data }: any) => {
                setRoles(data);
                setLoading(false);
                console.log(roles)

            })
            .catch((error: any) => {
                setError(error);
                setLoading(false);
            })

        dataProvider.getAll('documents')
            .then(({ data }: any) => {
                setDocuments(data);
                setLoading(false);

            })
            .catch((error: any) => {
                setError(error);
                setLoading(false);
            })
    }, [])

    if (loading) return <Loading />;
    if (!roles) return null;

    

    return (

        <Box
            sx={smDown ? styleMobile : mdDown ? styleTablet : style}
        >
            <IconButton
                sx={{
                    position: "fixed",
                    top: 1,
                    right: 0
                }}
                onClick={onCancel}
            >
                <Close />
            </IconButton>
            <CardContent sx={{ margin: 2 }}>
                <FormikStepper
                    initialValues={{
                        username: '',
                        name: '',
                        gender: 'M',
                        personIdentification: {
                            documentId: '2000001000001',
                            identificationValue: ''
                        },
                        rol: '',
                        dateBirth: null,
                        lastnameFather: '',
                        lastnameMother: ''

                    }}
                    onSubmit={async (values) => {

                        let { data } = await dataProvider.registerUserWithRole('users', values)

                        if(data[0]){
                            notify('ra.notification.created', {
                                type: 'info',
                                messageArgs: { smart_count: 1 },
                                undoable: true,
                            });
                            onCancel()
                            refetch()
                        } else {
                            notify('Ha ocurrido un error', {
                                type: 'info',
                                messageArgs: { smart_count: 1 },
                                undoable: true,
                            });
                            onCancel()
                        }

                        /*interface InterfaceUserRole {
                            personId: string;
                            roleId: string
                        }
                        
                        const { headers } = useHeaderWithToken()
                    
                        await httpClient(`${apiUrl}/person/register-web`, {
                            method: 'POST',
                            body: JSON.stringify(values),
                            headers: headers
                        })
                            .then(valor => {
                                let val = valor.body
                                let uno = val.indexOf(":")
                                let val1 = val.substring(uno + 2, val.length - 2)
                                let objeto: InterfaceUserRole = {
                                    personId: val1,
                                    roleId: values['rol']
                                }
                                return objeto
                            })
                            .then(valor => httpClient(`${apiUrl}/person/role/register`, {
                                method: 'POST',
                                body: JSON.stringify(valor),
                                headers: headers
                            })).then( res => {
                                notify('ra.notification.created', {
                                    type: 'info',
                                    messageArgs: { smart_count: 1 },
                                    undoable: true,
                                });
                                onCancel()
                            }).catch(error => {
                                notify('Ha ocurrido un error', {
                                    type: 'info',
                                    messageArgs: { smart_count: 1 },
                                    undoable: true,
                                });
                                onCancel()
                            })*/


                    }}


                >
                    <FormikStep
                        label="Datos Cuenta"
                        validationSchema={object({
                            username: string().email('Correo electrónico no valido')
                            .test("unique_email", "Email already registered", async (email, values) => {
                                const response = await debouncedApi(email);
                                return response;
                              }).required('No puedes dejar este campo en blanco!')
                        })}
                    >
                        <Box paddingBottom={2}>
                            <Field fullWidth type="email" name="username" component={TextField} label="Correo Electrónico" />
                        </Box>
                    </FormikStep>
                    <FormikStep
                        label="Datos Personales"
                        validationSchema={object({
                            name: string().required('No puedes dejar este campo en blanco!'),
                            lastnameFather: string().required('No puedes dejar este campo en blanco!'),
                            lastnameMother: string().required('No puedes dejar este campo en blanco!'),
                            dateBirth: string().nullable().required('No puedes dejar este campo en blanco!'),
                            personIdentification: object().shape({
                                identificationValue: string().required("No puedes dejar este campo en blanco!")
                            })

                        })}

                    >
                        <Box display="flex" flexDirection={mdDown ? "column" : "row"} gap={mdDown ? 0 : 3}>
                            <Box flex={1}>
                                <Box paddingBottom={2}>
                                    <Field fullWidth type="text" name="name" component={TextField} label="Nombres" />
                                </Box>
                                <Box paddingBottom={2}>
                                    <Field fullWidth type="text" name="lastnameFather" component={TextField} label="Apellido Paterno" />
                                </Box>
                                <Box paddingBottom={2}>
                                    <Field fullWidth type="text" name="lastnameMother" component={TextField} label="Apellido Materno" />
                                </Box>
                                <Box paddingBottom={2}>
                                    <DatePickerField name="dateBirth" label="Fecha de Nacimiento" />
                                </Box>
                            </Box>

                            <Box flex={1}>
                                <Box paddingBottom={2} display="flex" >
                                    <Field name="gender" component={Select} label="Género" flex={1} >
                                        <MenuItem value="M">Masculino</MenuItem>
                                        <MenuItem value="F">Femenino</MenuItem>
                                    </Field>
                                </Box>
                                <Box paddingBottom={2}>
                                    <Field name="personIdentification.documentId" component={Select} label="Documento de Identidad">
                                        {!loading && documents.map((doc) =>
                                            <MenuItem key={doc.value} value={doc.value}>{doc.text}</MenuItem>
                                        )}
                                    </Field>
                                </Box>
                                <Box paddingBottom={2}>
                                    <Field fullWidth type="text" name="personIdentification.identificationValue" component={TextField} label="Numero de Documento de Identidad" />
                                </Box>

                            </Box>

                        </Box>

                    </FormikStep>
                    <FormikStep
                        label="Asignar Rol"
                        validationSchema={object({
                            rol: string().required('No puedes dejar este campo en blanco!').min(1)
                        })}
                    >
                        <Box padding={2} >
                            <Field fullWidth name="rol" component={Select} label="Seleccionar Rol">
                                {!loading && roles.map((rol) =>
                                    <MenuItem key={rol.value} value={rol.value}>{rol.text}</MenuItem>
                                )}
                            </Field>
                        </Box>
                    </FormikStep>
                </FormikStepper>
            </CardContent>
        </Box>

    );
};



export default UserCreate;

