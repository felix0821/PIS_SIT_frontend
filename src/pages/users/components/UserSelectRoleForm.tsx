import { Box } from "@mui/material"
import { useState } from "react"
import { useDataProvider, useNotify } from "react-admin"
import DriverForm from "./role-forms/DriverForm"
import OperatorForm from "./role-forms/OperatorForm"

interface UserSelectRoleFormProps {
    roleId: string,
    userId: string
}



export const UserSelectRoleForm = ({ roleId, userId }: UserSelectRoleFormProps) => {


    const role = roleId

    //Para el rol operador
    const [savedConcesionaryOperator, setSavedConcesionaryOperator] = useState([]);
    const [transportCompanyRegistered, setTransportCompanyRegistered] = useState(false)
    //console.log("--> " + transportCompanyRegistered)

    //Para el rol conductor
    const [driverTransportCompanyRegistered, setDriverTransportCompanyRegistered] = useState(false)

    return (
        <Box>
            {role == "1000002000001" && (//
                <p>*Todos los Permisos</p>
            )}

            {role == "1000002000002" && (
                <OperatorForm 
                    setTransportCompanyRegistered={setTransportCompanyRegistered}
                    transportCompanyRegistered={transportCompanyRegistered}
                    currentData={savedConcesionaryOperator}
                    updateData={setSavedConcesionaryOperator}
                    userId={userId} />
            )}

            {role == "1000002000003" && (
                <p>*Permisos de lectura</p>
            )}

            {role == "1000002000005" && (
                <DriverForm 
                    setDriverTransportCompanyRegistered={setDriverTransportCompanyRegistered}
                    driverTransportCompanyRegistered={driverTransportCompanyRegistered}
                    userId={userId}
                     />
            )}

        </Box>
    )
}
