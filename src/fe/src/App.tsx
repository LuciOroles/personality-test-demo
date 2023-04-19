import React from "react";
import Questions from "./Questions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";

import Results from "./Results";
import Intro from "./Intro";
import Debugger from "./Debugger";

function App() {
  return (
    <SWRConfig>
      <BrowserRouter>
        <Routes>
          <Route path="results" element={<Results />} />
          <Route path="questions" element={<Questions />} />
          <Route path="debugger" element={<Debugger />} />
          <Route path="*" element={<Intro />} />
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  );
}

export default App;
