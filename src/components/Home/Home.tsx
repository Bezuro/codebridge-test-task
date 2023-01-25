import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import Results from './Results';
import Card from './Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Article } from '../../types/types';

function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

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
    let resultsNames: Article[] = [];
    let resultsDescriptions: Article[] = [];

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
    <>
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
                <Grid key={article.id} item xs={4}>
                  <Card
                    title={article.title}
                    summary={limitSentence(article.summary, 100)}
                    imageUrl={article.imageUrl}
                    publishedAt={article.publishedAt}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
