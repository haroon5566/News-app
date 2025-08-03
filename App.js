import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 5;
  const [progress, setProgress] = useState(0)


  return (
    <div>

      <Navbar />
      <LoadingBar
        height={3}
        color="#f11946"
        progress={progress}

      />
      <Routes>
        <Route excat path='/' element={<News setProgress={setProgress} key="general" pageSize={pageSize} country="us" category="general" />} />
        <Route excat path='/business' element={<News setProgress={setProgress} key="business" pageSize={pageSize} country="us" category="business" />} />
        <Route excat path='/entertainment' element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
        <Route excat path='/general' element={<News setProgress={setProgress} key="general" pageSize={pageSize} country="us" category="general" />} />
        <Route excat path='/health' element={<News setProgress={setProgress} key="health" pageSize={pageSize} country="us" category="health" />} />
        <Route excat path='/science' element={<News setProgress={setProgress} key="science" pageSize={pageSize} country="us" category="science" />} />
        <Route excat path='/sports' element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country="us" category="sports" />} />
        <Route excat path='/technology' element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country="us" category="technology" />} />
      </Routes>
    </div>
  );

}
export default App;