import { Route, Routes } from 'react-router-dom';
import { Link } from '@mui/material';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Home from '../components/Home/Home';
import Article from '../components/Article/Article';

function CentralRouter() {
  return (
    <Container sx={{ paddingTop: 4, px: 2 }}>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route element={<Article />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default CentralRouter;
