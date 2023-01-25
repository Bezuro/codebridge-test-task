import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

type ResultsProps = {
  length: number;
  lastArticleId: number;
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
      <Typography
        variant="subtitle2"
        color="primary"
        sx={{ marginBottom: '5px' }}
      >
        {props.lastArticleId && props.lastArticleId > 0
          ? `lastArticleId: ${props.lastArticleId}`
          : null}
      </Typography>
      <Divider />
    </div>
  );
}

export default Results;
