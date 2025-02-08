import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/register/RegisterPage';
import Home from './pages/home/Home';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
