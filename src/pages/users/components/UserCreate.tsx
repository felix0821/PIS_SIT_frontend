import { Box, Button, CardContent, CircularProgress, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Field, FormikValues } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import { CreateProps, useDataProvider, useListContext, useNotify } from 'react-admin';
import { Person, Role } from '../../../types';
import { useEffect, useState } from 'react';
import { object, string } from 'yup';
import { Close, Delete, Save } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import DatePickerField from './DatePickerField';
import { FormikStep, FormikStepper } from './form-stepper/FormikStepper';
import { UserSelectRoleForm } from './UserSelectRoleForm';
//import "./formik.css";

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

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const notify = useNotify();
    const dataProvider = useDataProvider();
    const { refetch } = useListContext()

    const [loading, setLoading] = useState(true);

    const [roles, setRoles] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);

    const [currentUserId, setCurrentUserId] = useState('')
    const [disableFieldBirth, setDisableFieldBirth] = useState(false)

    const [roleSelected, setRoleSelected] = useState<Role>({ id: '', name: '' });
    const [roleSelectedFieldValue, setRoleSelectedFieldValue] = useState<Role>({ id: '', name: '' });
    const [changueForm, setChangueForm] = useState(false)
    const [activeSelectRole, setActiveSelectRole] = useState(false)


    const step1Handle = async (email: string) => {
        //retorna si email está disponible
        let res = await dataProvider.verifyEmail('users', email)
            .then(({ data }: any) => {
                return data
            })
            .catch((error: any) => {
                notify('Error ' + error.status + ': ' + error.body.content, {
                    type: 'warning',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return {
                    status: error.status,
                    message: error.body.content
                }
            })
        console.log(JSON.stringify(res))
        let resp = (res.status == 200)

        return resp
    }

    const step2Handle = async (values: FormikValues) => {

        setDisableFieldBirth(true);
        //retorna si documento está disponible
        let documentId = values.personIdentification.documentId
        let value = values.personIdentification.identificationValue
        let res = await dataProvider.verifyDocument('users', { documentId, value })
            .then(({ data }: any) => {
                return data
            })
            .catch((error: any) => {
                notify('Error ' + error.status + ': ' + error.body.content, {
                    type: 'warning',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return {
                    status: error.status,
                    message: error.body.content
                }
            })
        if (!(res.status == 200)) {
            setDisableFieldBirth(false);
            return false;
        }

        setDisableFieldBirth(true)

        let createUserRes = await dataProvider.registerUser('users', { data: values })
            .then(({ data }: any) => {
                notify('Code ' + data.status + ': ' + 'Usuario creado con id ' + data.message, {
                    type: 'success',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return data
            })
            .catch((error: any) => {
                notify('Error ' + error.status + ': ' + error.body.content, {
                    type: 'warning',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return {
                    status: error.status,
                    message: error.body.content
                }
            })
        if (!(createUserRes.status == 201)) return false

        setCurrentUserId(createUserRes.message)
        console.log(currentUserId)

        return true
    }

    /*const handleChangeRole = (roleId: any) => {
        console.log("prueba: "+roleId)
        setRoleIdSelected(roleId);
        setRoleIdSelected(roleId);
        //if(!isRoleSelected) setIsRoleSelected(true);
        console.log("guardado"+roleIdSelected)
        setRoleIdSelected(roleId);
        console.log("guardado"+roleIdSelected)

    }*/

    const setRoleInUser = async (userId: any, roleId: any) => {
        let createUserInRole = await dataProvider.registerUserInRole('users', { data: { userId: userId, roleId: roleId } })
            .then(({ data }: any) => {
                notify('Code ' + data.status + ': ' + 'Rol asignado ' + data.message, {
                    type: 'success',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return data
            })
            .catch((error: any) => {
                notify('Error ' + error.status + ': ' + error.body.content, {
                    type: 'warning',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return {
                    status: error.status,
                    message: error.body.content
                }
            })
        if (createUserInRole.status == 201) return true
        return false
    }

    const removeRoleFromUser = async (userId: any, roleId: any) => {
        let createUserInRole = await dataProvider.removeRoleFromUser('users', { data: { userId: userId, roleId: roleId } })
            .then(({ data }: any) => {
                notify('Code ' + data.status + ': ' + 'Rol eliminado ' + data.message, {
                    type: 'success',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return data
            })
            .catch((error: any) => {
                notify('Error ' + error.status + ': ' + error.body.content, {
                    type: 'warning',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return {
                    status: error.status,
                    message: error.body.content
                }
            })
        if (createUserInRole.status == 200) return true
        return false
    }

    useEffect(() => {

        dataProvider.getAll('roles')
            .then(({ data }: any) => {
                setRoles(data);
            })
            .catch((error: any) => {
            })

        dataProvider.getAll('documents')
            .then(({ data }: any) => {
                setDocuments(data);
            })
            .catch((error: any) => {
            })
        setLoading(false);
    }, [])

    if (loading) return <Box sx={smDown ? styleMobile : mdDown ? styleTablet : style}
    >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress sx={{ marginY: 4 }} />
            <Typography variant="h5" component="h5" sx={{ marginY: 2 }}>
                Cargando
            </Typography>
        </Box>
    </Box>
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
                        notify('Listo', {
                            type: 'info',
                            messageArgs: { smart_count: 1 },
                            undoable: false,
                        });
                        onCancel()
                        refetch()
                    }}


                >
                    <FormikStep
                        label="Datos Cuenta"
                        validationSchema={object({
                            username: string().email('Correo electrónico no valido')
                                /*.test("unique_email", "Email already registered", async (email, values) => {
                                    const response = await debouncedApi(email);
                                    return response;
                                  })*/
                                .required('No puedes dejar este campo en blanco!')
                        })}
                        onNext={async (values: FormikValues) => {
                            const response = await step1Handle(values.username);
                            return response;
                        }}
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
                        onNext={async (values: FormikValues) => {
                            const response = await step2Handle(values);

                            return response;
                        }}

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
                                    <DatePickerField name="dateBirth" label="Fecha de Nacimiento" disable={disableFieldBirth} />
                                </Box>
                            </Box>

                            <Box flex={1}>
                                <Box paddingBottom={2} display="flex" >
                                    <Field name="gender" component={Select} label="Género" flex={1} innerRef={(e: any) => {console.log(e)}} >
                                        <MenuItem value="M">Masculino</MenuItem>
                                        <MenuItem value="F">Femenino</MenuItem>
                                    </Field>
                                </Box>
                                <Box paddingBottom={2} width='100%'>
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
                            {
                                !activeSelectRole ? (
                                    <>
                                        <Field
                                            fullWidth
                                            name="rol"
                                            component={Select}
                                            label="Seleccionar Rol"
                                            //value=''

                                            onChange={(e: any, { props }: FormikValues) => {
                                                setRoleSelectedFieldValue({ id: props.value, name: props.children });
                                            }}
                                    
                                        >
                                            <MenuItem value=''><em>None</em></MenuItem>
                                            {!loading && roles.map((rol) =>
                                                <MenuItem key={rol.value} value={rol.value}>{rol.text}</MenuItem>
                                            )}
                                        </Field>
                                        <Button
                                            color='secondary'
                                            size='small'
                                            variant='contained'
                                            sx={{ marginY: 2, marginX: 1 }}
                                            onClick={() => {
                                                if (roleSelectedFieldValue.id == '') return;

                                                if (!setRoleInUser(currentUserId, roleSelectedFieldValue.id)) return

                                                setRoleSelected({ id: roleSelectedFieldValue.id, name: roleSelectedFieldValue.name });
                                                setChangueForm(!changueForm)
                                                setActiveSelectRole(true)

                                            }}


                                        >Guardar rol</Button>
                                    </>
                                ) : (
                                    <Box display='flex' >
                                        <Typography variant="h6" component="h5" sx={{ marginY: 2 }}>
                                            Rol seleccionado: {roleSelected.name}
                                        </Typography>
                                        <IconButton
                                            size="large"
                                            onClick={async () => {
                                                if (await removeRoleFromUser(currentUserId, roleSelected.id)) {
                                                    setRoleSelected({ id: '', name: '' });
                                                    setChangueForm(!changueForm)
                                                    setActiveSelectRole(false)
                                                }
                                            }}
                                        >
                                            <Delete sx={{ color: 'red' }} fontSize="inherit" />
                                        </IconButton>
                                    </Box>
                                )
                            }


                            {(changueForm && (roleSelected.id != '')) && (
                                <UserSelectRoleForm roleId={roleSelected.id} userId={currentUserId}></UserSelectRoleForm>
                            )}

                            {(!changueForm && (roleSelected.id != '')) && (
                                <UserSelectRoleForm roleId={roleSelected.id} userId={currentUserId}></UserSelectRoleForm>
                            )}

                        </Box>
                    </FormikStep>
                </FormikStepper>
            </CardContent>
        </Box>
    );
};

export default UserCreate;

