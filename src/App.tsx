import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/register/RegisterPage';
import Home from './pages/home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
