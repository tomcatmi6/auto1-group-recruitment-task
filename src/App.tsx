import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import PanelHost from "./pages/PanelHost";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="xl" className="main-container" component={"main"}>
        <Router>
          <Routes>
            <Route path="/" element={<PanelHost />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </Container>
      <Footer />
    </>
  );
}

export default App;
