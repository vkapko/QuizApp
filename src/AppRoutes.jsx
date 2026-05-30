import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:categoryId" element={<Quiz />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default AppRoutes;
