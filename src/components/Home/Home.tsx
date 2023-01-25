import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import Results from './Results';
import Card from './Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ArticleType } from '../../types/types';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([]);

  const navigate = useNavigate();

  const limitSentence = (str = '', limit = 0, separator = ' ') => {
    if (str.length < limit) return str;

    return `${str.substring(0, str.lastIndexOf(separator, limit))}...`;
  };

  const changeFilterHandler = (filterText: string) => {
    if (filterText.length <= 0) {
      setFilteredArticles(articles);
      return;
    }

    const keywordsArr = filterText.trim().split(' ');
    let resultsNames: ArticleType[] = [];
    let resultsDescriptions: ArticleType[] = [];

    articles.forEach(function (article, index) {
      var nameMatches = 0;
      var descMatches = 0;
      keywordsArr.forEach(function (keyword) {
        if (article.title.toLowerCase().includes(keyword.toLowerCase())) {
          nameMatches++;
        }

        const limitedSummary = limitSentence(article.summary, 100);

        if (limitedSummary.toLowerCase().includes(keyword.toLowerCase())) {
          descMatches++;
        }
      });
      if (nameMatches > 0) {
        resultsNames.push(article);
      } else if (descMatches > 0) {
        resultsDescriptions.push(article);
      }
    });

    const results = [...resultsNames, ...resultsDescriptions];

    console.log('results :>> ', results);

    setFilteredArticles(results);
  };

  const fetchArticleData = () => {
    axios.get('https://api.spaceflightnewsapi.net/v3/articles').then((res) => {
      console.log('res.data :>> ', res.data);
      setArticles(res.data);
      setFilteredArticles(res.data);
      setIsLoaded(true);
    });
  };

  useEffect(() => {
    fetchArticleData();
  }, []);

  return (
    <Box sx={{ paddingTop: 4, px: 2 }}>
      <Box>
        <Filter onChangeFilter={changeFilterHandler} />
      </Box>

      <Box sx={{ marginTop: '40px' }}>
        <Results length={filteredArticles.length} />
      </Box>

      <Box sx={{ marginTop: '45px' }}>
        <Grid container spacing={4}>
          {isLoaded &&
            filteredArticles.map((article) => {
              return (
                <Grid
                  key={article.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box onClick={() => navigate(`/article/${article.id}`)}>
                    <Card
                      title={article.title}
                      summary={limitSentence(article.summary, 100)}
                      imageUrl={article.imageUrl}
                      publishedAt={article.publishedAt}
                    />
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;
