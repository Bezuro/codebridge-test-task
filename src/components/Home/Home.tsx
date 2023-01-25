import React from 'react';
import { useState, useEffect } from 'react';
import Filter from './Filter';
import Results from './Results';
import Card from './Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ArticleType } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import useFetch from './hooks/useFetch';

import { useAppSelector, useAppDispatch } from '../../store/hooks';

function Home() {
  const lastArticleId = useAppSelector((state) => state.lastArticleId.value);

  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState<ArticleType[]>([]);
  const [keywordsState, setKeywordsState] = useState<string[]>([]);

  const navigate = useNavigate();

  const [data] = useFetch('https://api.spaceflightnewsapi.net/v3/articles');

  const limitSentence = (str = '', limit = 0, separator = ' ') => {
    if (str.length < limit) return str;

    return `${str.substring(0, str.lastIndexOf(separator, limit))}...`;
  };

  const changeFilterHandler = (filterText: string) => {
    if (filterText.length <= 0) {
      setFilteredArticles(data);
      return;
    }

    const keywordsArr = filterText.replace(/\s+/g, ' ').trim().split(' ');

    setKeywordsState(keywordsArr);

    let resultsNames: ArticleType[] = [];
    let resultsDescriptions: ArticleType[] = [];

    data.forEach((article: ArticleType, index: number) => {
      var nameMatches = 0;
      var descMatches = 0;
      keywordsArr.forEach((keyword) => {
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

    setFilteredArticles(results);
  };

  useEffect(() => {
    setFilteredArticles(data);
    if (data && data.length > 0) {
      setIsLoaded(true);
    }
  }, [data]);

  return (
    <Box sx={{ paddingTop: 4, px: 2 }}>
      <Box>
        <Filter onChangeFilter={changeFilterHandler} />
      </Box>

      <Box sx={{ marginTop: '40px' }}>
        <Results
          length={filteredArticles?.length}
          lastArticleId={lastArticleId}
        />
      </Box>

      <Box sx={{ marginTop: '45px' }}>
        <Grid container spacing={4}>
          {isLoaded &&
            data &&
            filteredArticles?.map((article) => {
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
                      keywords={keywordsState}
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
