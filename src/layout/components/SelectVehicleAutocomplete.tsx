import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';
import { SelectChangeEvent } from '@mui/material';

interface SelectVehicleInRouteAutocompleteProps {
    handleChangue: any,
    route: any
}

export default function SelectVehicleInRouteAutocomplete({handleChangue, route}: SelectVehicleInRouteAutocompleteProps) {

    const [options, setOptions] = useState<any[]>([])

    useEffect(() => {



    }, [])

    const dataProvider = useDataProvider()


    const searchOptions = async (key: string) => {

        setOptions([])
        if (key == '') return


        let result = await dataProvider.searchVehicleInRoute('routes', { key: key, routeId: route })
            .then(({ data }: any) => {
                return data
            })
            .catch((error: any) => {
                return []
            })

        console.log(result)
        setOptions(result)
    }


    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: '100%' }}
            onChange={(e: any) => {
                console.log("fws");
                handleChangue(e.target.innerText);
            }}
            renderInput={(params) => <TextField {...params} label="Placa" onChange={(v) => searchOptions(v.target.value)} />}
        />
    );
}