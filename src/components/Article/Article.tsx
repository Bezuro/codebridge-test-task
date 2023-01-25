import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ArticleType } from '../../types/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setLastArticleId } from '../../store/lastArticleIdSlice';

function Article() {
  const [article, setArticle] = useState<ArticleType>();
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  let { id } = useParams();

  const fetchArticleData = () => {
    axios
      .get(`https://api.spaceflightnewsapi.net/v3/articles/${id}`)
      .then((res) => {
        console.log('res.data :>> ', res.data);
        setArticle(res.data);
        setIsLoaded(true);

        dispatch(setLastArticleId(res.data.id));
      });
  };

  useEffect(() => {
    fetchArticleData();
  }, []);

  return (
    <div>
      {isLoaded && (
        <>
          <Box
            component="img"
            sx={{
              height: 245,
              width: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: '-999',
            }}
            alt="background image"
            src={article?.imageUrl}
          />

          <Box
            sx={{
              marginTop: '150px',
              backgroundColor: '#ffffff',
              padding: '35px 75px 50px 75px',
              border: '1px solid #EAEAEA',
              borderRadius: '5px',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              {article?.title}
            </Typography>
            <Typography sx={{ marginTop: '50px' }}>
              {article?.summary}
            </Typography>
          </Box>

          <Box
            sx={{
              marginTop: '35px',
              marginLeft: '75px',
              cursor: 'pointer',
            }}
            onClick={() => navigate(`/`)}
          >
            <Typography
              variant="subtitle2"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <img
                src="/arrow-left.svg"
                className="calendar"
                alt="arrow-left.svg"
              />
              <Typography component="span" variant="subtitle2" sx={{ ml: 1 }}>
                Back to homepage
              </Typography>
            </Typography>
          </Box>
        </>
      )}
    </div>
  );
}

export default Article;
