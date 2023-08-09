import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSeason } from "../../stores/soccerSlice"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Season() {
  const [season, setSeason] = useState("")
  const dispatch = useDispatch();

  function handleChange(event) {
    const selectedSeason = event.target.value;
    setSeason(selectedSeason);
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
          defaultValue={2022}
          value={season}
          onChange={handleChange}
        >
          <MenuItem value={2022}>2023-2022</MenuItem>
          <MenuItem value={2021}>2022-2021</MenuItem>
          <MenuItem value={2020}>2021-2020</MenuItem>
          <MenuItem value={2019}>2020-2019</MenuItem>
          <MenuItem value={2018}>2019-2018</MenuItem>
          <MenuItem value={2017}>2018-2017</MenuItem>
          <MenuItem value={2016}>2017-2016</MenuItem>
          <MenuItem value={2015}>2016-2015</MenuItem>
          <MenuItem value={2014}>2015-2014</MenuItem>
          <MenuItem value={2013}>2014-2013</MenuItem>
          <MenuItem value={2012}>2013-2012</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}