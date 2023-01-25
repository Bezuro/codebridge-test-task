import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

type ResultsProps = {
  length: number;
};

function Results(props: ResultsProps) {
  return (
    <div>
      <Typography
        variant="subtitle2"
        color="primary"
        sx={{ marginBottom: '5px' }}
      >
        Results: {props.length}
      </Typography>
      <Divider />
    </div>
  );
}

export default Results;
