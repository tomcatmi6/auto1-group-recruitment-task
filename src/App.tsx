import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import PanelHost from './pages/PanelHost';
import ErrorPage from './pages/ErrorPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PanelHost />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App
