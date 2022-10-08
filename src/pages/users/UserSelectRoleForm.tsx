import { Add, AddCircle, Delete } from "@mui/icons-material"
import { Box, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { Loading, useDataProvider, useNotify } from "react-admin"
import CustomSelect from "./CustomSelect"
import DriverForm from "./RoleForms/DriverForm"
import OperatorForm from "./RoleForms/OperatorForm"

interface UserSelectRoleFormProps {
    roleId: string,
    userId: string
}



export const UserSelectRoleForm = ({ roleId }: UserSelectRoleFormProps) => {


    const [role, setRole] = useState(roleId)

    const notify = useNotify();

    const dataProvider = useDataProvider();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    //Para el rol operador
    const [savedConcesionaryOperator, setSavedConcesionaryOperator] = useState([]);
    const [transportCompanyRegistered, setTransportCompanyRegistered] = useState(false)
    console.log("--> " + transportCompanyRegistered)

    //Para el rol conductor
    const [driverTransportCompanyRegistered, setDriverTransportCompanyRegistered] = useState(false)


    //if (loading) return <Loading />;
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
                    updateData={setSavedConcesionaryOperator} />
            )}

            {role == "1000002000003" && (
                <p>*Permisos de lectura</p>
            )}

            {role == "1000002000005" && (
                <DriverForm 
                    setDriverTransportCompanyRegistered={setDriverTransportCompanyRegistered}
                    driverTransportCompanyRegistered={driverTransportCompanyRegistered}
                     />
            )}


        </Box>
    )
}
