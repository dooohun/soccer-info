import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeason } from "../../stores/soccerSlice"

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Season() {
  const selectedSeason = useSelector((state) => state.soccerInfo.season);
  const [season, setSeason] = useState(selectedSeason);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  function handleChange(event) {
    const selectedSeason = event.target.value;
    setSeason(selectedSeason);
    dispatch(getSeason({ season: selectedSeason }));
  }

  const inputLabelStyles = {
    color: darkMode ? '#FFFFFF' : 'inherit',
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={inputLabelStyles}>Season</InputLabel>
        <Select
          sx={darkMode ? { backgroundColor: '#1565c0', color: "#FFFFFF" } : { }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Season"
          value={season}
          onChange={handleChange}
        >
          <MenuItem value={2023}>2024-2023</MenuItem>
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