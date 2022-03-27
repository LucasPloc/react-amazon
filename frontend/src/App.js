import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to='/'>amazon-react</Link>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/product/:slug' element={<ProductPage />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
