import React from 'react'
import { FormControl,InputLabel,Select,MenuItem , Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { filterTodos } from '../redux/actions';
export default function Filter() {
    const currentFilter = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    const handleFilter = (filter) => {
            dispatch(filterTodos(filter));
    };
  return (
   
    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">status</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={currentFilter}
      onChange={(e) => handleFilter(e.target.value)}
      label="Status"
    >
      <MenuItem value={'ALL'} >Default</MenuItem>
      <MenuItem value={'COMPLETED'}>Completed</MenuItem>
      <MenuItem value={'UNCOMPLETED'}>Uncompleted</MenuItem>
    </Select>
  </FormControl>
  
 
  )
}
