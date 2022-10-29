import * as React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ErrorMessage, useFormikContext } from 'formik';
import { AnyAaaaRecord } from 'dns';

interface DatePickerFieldProps {
  name: string,
  label: string,
  children?: React.ReactNode
  setFieldValue?: any
  disable: boolean
}


const DatePickerField = (props: DatePickerFieldProps) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);

  const { setFieldValue, values, errors } = useFormikContext<any>()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={props.label}
        value={values.dateBirth}
        onChange={(newValue: any) => {
          setValue(newValue);
          setFieldValue(props.name, newValue)
        }}
        renderInput={(params: any) => (
            <TextField {...params} name={props.name} sx={{ width: '100%' }} error={errors.dateBirth} helperText={errors.dateBirth} disabled={props.disable}/>
        )}
      />
    </LocalizationProvider>
  );
}

export default DatePickerField;