import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Card as MuiCard } from '@mui/material';
import Highlighter from 'react-highlight-words';

type ArticleProp = {
  imageUrl: string;
  title: string;
  summary: string;
  publishedAt: string;
  keywords: string[];
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
    <MuiCard
      sx={{
        maxWidth: 400,
        border: '1px solid #EAEAEA',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
        borderRadius: '5px',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="217"
          image={props.imageUrl}
          alt={props.imageUrl}
        />
        <CardContent sx={{ p: 2.5, height: '313px' }}>
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

          <Typography variant="h3" mt={3}>
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={props.keywords}
              autoEscape={true}
              textToHighlight={props.title}
            />
          </Typography>

          <Typography variant="body1" mt={2.5}>
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={props.keywords}
              autoEscape={true}
              textToHighlight={props.summary}
            />
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
