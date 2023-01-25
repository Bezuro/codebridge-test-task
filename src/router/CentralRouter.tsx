import { Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Home from '../components/Home/Home';
import Article from '../components/Article/Article';

function CentralRouter() {
  return (
    <Container>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default CentralRouter;
