import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';

export default function SelectVehicleAutocomplete() {

    const [options, setOptions] = useState<any[]>([])

    useEffect(() => {



    }, [])

    const dataProvider = useDataProvider()


    const searchOptions = async (key: string) => {

        setOptions([])
        if (key == '') return


        let result = await dataProvider.searchVehicle('routes', { key: key })
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
            onChange={() => console.log("valor guardado")}
            renderInput={(params) => <TextField {...params} label="Placa" onChange={(v) => searchOptions(v.target.value)} />}
        />
    );
}