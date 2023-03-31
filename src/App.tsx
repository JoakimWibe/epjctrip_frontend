import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { TripContext } from './context/Context';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Plan from './pages/Plan';

export interface NewPlan {
  name: string;
  departure: string;
  destination: string;
  startDate: string;
  endDate: string;
  participants: number;
  cost: number;
  userId: number;
}

function App() {
  const [location, setLocation] = useState({});
  const [recommendedActivities, setRecommendedActivities] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('email') !== null);
  const [loading, setLoading] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState('');
  const [isInputSearched, setIsInputSearched] = useState(false);

  return (
    <TripContext.Provider
      value={{
        isInputSearched,
        setIsInputSearched,
        searchInputValue,
        setSearchInputValue,
        location,
        setLocation,
        recommendedActivities,
        setRecommendedActivities,
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myplan" element={<Plan />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </TripContext.Provider>
  );
}

export default App;
