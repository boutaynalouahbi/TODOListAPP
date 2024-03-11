import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearchTerm } from '../redux/actions'
export default function SearchByTitle() {
    const tasks=useSelector(state=>state.todos)
    const [searchTerm,setSearchTerm]=useState("")
    const dispatch=useDispatch()
    function handleChange(e) {
        const value = e.target.value;
        setSearchTerm(value);
        dispatch(updateSearchTerm(value));
    }
    const handleOptionSelect = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        dispatch(updateSearchTerm(value));
      };
    console.log(searchTerm);
  return (
    <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={tasks.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Task"
            InputProps={{
                ...params.InputProps,
                type: 'search',
            }}
            value={searchTerm}
            onChange={handleChange}
            
          />
          )}
          onSelect={(e)=>handleOptionSelect(e)}
      />
  )
}
