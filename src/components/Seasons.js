import { useDispatch } from "react-redux";
import { getSeason } from "../stores/soccerSlice";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Season() {
  const year = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];
  const dispatch = useDispatch();

  function handleChange(event) {
    const selectedSeason = event.target.value;
    dispatch(getSeason({ season: selectedSeason }));
  }

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" >Season</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Season"
          onChange={handleChange}
        >
          {year.map((arr, idx) => (
            <MenuItem key={idx} value={arr}>{arr}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

/*
<div>
      <select onChange={seasonChangeHandler}>
        {year.map((arr, idx) => (
          <option key={idx} value={arr}>{arr}</option>
        ))}
      </select>
    </div>
*/