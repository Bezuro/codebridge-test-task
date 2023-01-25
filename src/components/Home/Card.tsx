import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Card as MuiCard } from '@mui/material';

type ArticleProp = {
  imageUrl: string;
  title: string;
  summary: string;
  publishedAt: string;
};

function Card(props: ArticleProp) {
  const date = new Date(props.publishedAt);
  const [month, day, year] = [
    date.toLocaleString('default', { month: 'long' }),
    date.getDate(),
    date.getFullYear(),
  ];
  const dateOutput = `${month} ${day}, ${year}`;

  return (
    <MuiCard sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="217"
          image={props.imageUrl}
          alt={props.imageUrl}
        />
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            variant="caption"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
            mt={0.5}
          >
            <img src="/calendar.svg" className="calendar" alt="calendar.svg" />
            <Typography component="span" variant="caption" sx={{ ml: 1 }}>
              {dateOutput}
            </Typography>
          </Typography>

          <Typography variant="h3" component="div" mt={3}>
            {props.title}
          </Typography>

          <Typography variant="body1" mt={2.5}>
            {props.summary}
          </Typography>

          <Typography
            variant="subtitle2"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
            mt={2.5}
          >
            <Typography component="span" variant="subtitle2" sx={{ mr: 1 }}>
              Read more
            </Typography>
            <img
              src="/arrow-right.svg"
              className="calendar"
              alt="arrow-right.svg"
            />
          </Typography>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
}

export default Card;
