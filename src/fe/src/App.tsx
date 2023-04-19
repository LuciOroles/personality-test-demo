import React from "react";
import Questions from "./Questions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Results from "./Results";
import Debugger from "./Debugger";

function App() {


  return (
      <BrowserRouter>
          <Routes>
            <Route path="results" element={<Results />} />
            <Route path="questions" element={<Questions />} />
            <Route path="*" element={<Debugger />} />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
