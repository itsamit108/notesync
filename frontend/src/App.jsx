import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import ErrorPage from './components/ErrorPage';
import Features from './components/Features';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Footer from './components/Footer';
import Profile from './components/Profile';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const [backgroundColor, setBackgroundColor] = useState(null);

  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 5) + 95; // 95-100%
    const lightness = Math.floor(Math.random() * 5) + 95; // 95-100%
    const alpha = Math.floor(Math.random() * 5) + 3; // 3-7%
    const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.${alpha})`;
    setBackgroundColor(color);
  };

  useEffect(() => {
    generateRandomColor();
  }, []);

  const backgroundStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <div style={backgroundStyle}>
            <Navbar></Navbar>
            <Alert alert={alert}></Alert>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/features" element={<Features />}></Route>
              <Route path="/contact" element={<Contact showAlert={showAlert} />}></Route>
              <Route path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route path="/signup" element={<Signup showAlert={showAlert} />}></Route>
              <Route path="/profile" element={<Profile showAlert={showAlert} />}></Route>
              <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
            <Footer></Footer>
          </div>
        </BrowserRouter>
      </NoteState >
    </>
  );
}

export default App;
