import * as React from 'react';
import { Create, required, CreateProps, email, minLength, maxLength } from 'react-admin';
import { Box, CardHeader, CardContent, Button, Stepper, Step, StepLabel, Grid, CircularProgress} from '@mui/material';
import { Person } from '../types';
import { Field, Form, Formik, FormikConfig, FormikValues} from 'formik';
import { TextField, Select} from 'formik-material-ui';
import axios from 'axios';

//import { ProductEditDetails } from './ProductEditDetails';
import { useState } from 'react';
import { object, string, ref } from 'yup';

//
import { fetchUtils } from 'react-admin';
import MenuItem from '@mui/material/MenuItem';

const apiUrl = 'https://sit-backend.herokuapp.com';
const httpClient = fetchUtils.fetchJson;

interface Props extends CreateProps<Person> {
    onCancel: () => void;
}


const UserCreate = ({ onCancel, ...props }: Props) => {
    interface LabeledValue {
        status: number; 
        headers: Headers; 
        body: string; 
        json: any; 
      }
    let userid: LabeledValue
    let t = 0
    return (
        <Create>
        <Box
        sx={{
            width: 800
          }}
            >
            <CardContent sx={{ margin: 2 }}>
                <FormikStepper
                    initialValues={{ 
                        username: '', 
                        gender: 'M',
                        personIdentification: {
                            documentId: '2000001000001',
                            identificationValue: ''
                        },
                        rol: '1000002000005'
                    }}
                    onSubmit={async(values)=>{
                        interface ojo{
                            personId: string;
                            roleId: string
                        }
                        let userid
   
                        let token = localStorage.getItem('token');
                        if (!token) token = ""

                        let options: fetchUtils.Options = {}
                        const headers = options?.headers ? new Headers(options.headers) : new Headers();
                        headers.set("Authorization", `Bearer ${token}`);

                        await httpClient(`${apiUrl}/person/register-web`, {
                            method: 'POST',
                            body: JSON.stringify(values),
                            headers: headers
                        })
                        .then( valor => {
                            let val = valor.body
                            let uno = val.indexOf(":")
                            let val1 = val.substring(uno+2,val.length-2)
                            let objeto:ojo = {
                                personId : val1,
                                roleId : values['rol']
                            }
                            return objeto
                        })
                        .then( valor => httpClient(`${apiUrl}/person/role/register`, {
                            method: 'POST',
                            body: JSON.stringify(valor),
                            headers: headers
                        }))

                        }}

             
                >
                    <FormikStep 
                        label="Datos Cuenta"
                        validationSchema={object({
                            username: string().email('Correo electrónico no valido').required('No puedes dejar este campo en blanco!')})}
                        >
                        <Box paddingBottom={2}>
                        <Field fullWidth type="email" name="username" component={TextField} label="Correo Electrónico"/>
                        </Box>
                    </FormikStep>
                    <FormikStep 
                        label="Datos Personales"
                        validationSchema={object({
                            name: string().required('No puedes dejar este campo en blanco!'),
                            lastnameFather: string().required('No puedes dejar este campo en blanco!'),
                            lastnameMother: string().required()
                          })}
                        >
                        <Box paddingBottom={2}>
                        <Field fullWidth type="text" name="name" component={TextField} label="Nombres"/>
                        </Box>
                        <Box paddingBottom={2}>
                        <Field fullWidth type="text" name="lastnameFather" component={TextField} label="Apellido Paterno" />
                        </Box>
                        <Box paddingBottom={2}>
                        <Field fullWidth type="text" name="lastnameMother" component={TextField} label="Apellido Materno" />
                        </Box>
                        <Box paddingBottom={2}>
                        <Field fullWidth type="text" name="dateBirth" component={TextField} label="Fecha de Nacimiento" />
                        </Box>
                        <Box paddingBottom={2} >
                        <Field fullWidth name="gender" component={Select} label="Género">
                            <MenuItem value="M">Masculino</MenuItem>
                            <MenuItem value="F">Femenino</MenuItem>
                        </Field>
                        </Box>
                        <Box paddingBottom={2}>
                        <Field fullWidth name="personIdentification.documentId" component={Select} label="Documento de Identidad">
                            <MenuItem value="2000001000001">Documento Nacional de Indentidad (DNI)</MenuItem>
                            <MenuItem value="2000001000002">Otros</MenuItem>
                        </Field>
                        </Box>
                        <Box paddingBottom={2}>
                        <Field fullWidth type="text" name="personIdentification.identificationValue" component={TextField} label="Numero de Documento de Identidad" />
                        </Box>
                        
                    </FormikStep>
                    <FormikStep
	                label="Asignar Rol"
                    validationSchema={object({
                            username: string().email('Correo electrónico no valido').required('No puedes dejar este campo en blanco!')})}
                        >
                        <Box padding={2} >
                        <Field fullWidth name="rol" component={Select} label="Seleccionar Rol">
                            <MenuItem value="1000002000001">Controlador sit</MenuItem>
                            <MenuItem value="1000002000002">Operador de transporte</MenuItem>
                            <MenuItem value="1000002000003">Fiscalizador</MenuItem>
                            <MenuItem value="1000002000005">Conductor</MenuItem>
                        </Field>
                        </Box>
                    </FormikStep>
                </FormikStepper>
            </CardContent>
        </Box>
            </Create>
    );
};



export default UserCreate;

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children'| 'validationSchema'>{
    label: string;
}

export function FormikStep({children}: FormikStepProps) {
    return <>{children}</>
}

export function FormikStepper({children, ...props}: FormikConfig<FormikValues>){
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;
    const [completed, setCompleted] = useState(false);
    function isLastStep() {
        return step === childrenArray.length-1
    }

    function isoneStep() {
        return step === 1
    }
    return (
        <Formik 
            {...props} 
            validationSchema={currentChild.props.validationSchema}
            onSubmit={ async (values, helpers)=>{
                if(isLastStep()){
                    await props.onSubmit(values, helpers);
                    setCompleted(true);
                    helpers.resetForm();
                }else {
                    setStep(s=>s+1);
                }
                }
            }
        >
            {({isSubmitting}) => (

                <Form autoComplete="off">
            <Stepper alternativeLabel activeStep={step}>
                {childrenArray.map((child, index) => (
                    <Step key={child.props.label} completed={step>index || completed}>
                        <StepLabel>{child.props.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
                {currentChild}
                <Grid container spacing={2} >
                    { step > 0 ? ( 
                    <Grid item>
                        <Button 
                            variant="contained"
                            disabled={isSubmitting} 
                            onClick={ () => setStep(s=>s-1 )}
                        >
                            Atras
                        </Button>
                    </Grid> ): null}

                    <Grid item>
                        <Button 
                            variant="contained"
                            startIcon={isSubmitting ? <CircularProgress size="1rem" />: null}
                            disabled={isSubmitting} 
                            type = "submit"
                            
                        >
                            { isSubmitting? 'Submitting' : isLastStep()? 'Confirmar': 'Siguiente'}
                        </Button> 
                    </Grid>
                </Grid>
            </Form>
                )}
        </Formik>
    )
}

