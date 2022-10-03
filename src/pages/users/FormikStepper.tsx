import { Button, CircularProgress, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { useState } from "react";

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    label: string;
}

export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;
    const [completed, setCompleted] = useState(false);
    function isLastStep() {
        return step === childrenArray.length - 1
    }

    function isoneStep() {
        return step === 1
    }
    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                    setCompleted(true);
                    helpers.resetForm();
                } else {
                    setStep(s => s + 1);
                }
            }
            }

        >
            {({ isSubmitting, setFieldValue }) => (

                <Form autoComplete="off">
                    <Stepper alternativeLabel activeStep={step}>
                        {childrenArray.map((child, index) => (
                            <Step key={child.props.label} completed={step > index || completed}>
                                <StepLabel>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {currentChild}
                    <Grid container spacing={2} paddingBottom={4}>
                        {step > 0 ? (
                            <Grid item>
                                <Button
                                    variant="contained"
                                    disabled={isSubmitting}
                                    onClick={() => setStep(s => s - 1)}
                                >
                                    Atras
                                </Button>
                            </Grid>) : null}

                        <Grid item>
                            <Button
                                variant="contained"
                                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                                disabled={isSubmitting}
                                type="submit"

                            >
                                {isSubmitting ? 'Submitting' : isLastStep() ? 'Confirmar' : 'Siguiente'}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

