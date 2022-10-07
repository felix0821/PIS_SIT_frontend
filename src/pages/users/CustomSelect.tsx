import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CustomSelect(props: any) {

  //const setValue = props.setValue
  const value = props.value
/*
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };*/
  const handleChange = props.handleChange
  const items: any[] = props.items
  const label: string = props.label

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={handleChange}
          
          label={label}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {items.map((item)=>
            <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
