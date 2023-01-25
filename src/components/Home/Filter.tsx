import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

type FilterProps = {
  onChangeFilter: Function;
};

function Filter(props: FilterProps) {
  const [filterText, setFilterText] = useState('');

  const filterTextChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(event.target.value);
  };

  useEffect(() => {
    props.onChangeFilter(filterText);
  }, [filterText]);

  return (
    <div>
      <Typography
        variant="subtitle1"
        color="primary"
        sx={{ marginBottom: '10px' }}
      >
        Filter by keywords
      </Typography>
      <TextField
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          input: { color: '575757' },
          width: { sm: 300, md: 600 },
          '& .MuiInputBase-root': {
            height: 50,
          },
        }}
        value={filterText}
        onChange={filterTextChangeHandler}
      />
    </div>
  );
}

export default Filter;
