import React from "react";
import Questions from "./Questions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Results from "./Results";
import Intro from "./Intro";

function App() {


  return (
      <BrowserRouter>
          <Routes>
            <Route path="results" element={<Results />} />
            <Route path="questions" element={<Questions />} />
            <Route path="*" element={<Intro />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
