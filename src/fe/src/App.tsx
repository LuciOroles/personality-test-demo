import React from "react";
import Questionaire from "./Questionaire";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";

import Results from "./Results";
import Intro from "./Intro";
import Debugger from "./Debugger";
import { AppContextProvider } from "./AppContext";

function App() {
  return (
    <SWRConfig>
      <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="results" element={<Results />} />
          <Route path="questions" element={<Questionaire />} />
          <Route path="debugger" element={<Debugger />} />
          <Route path="*" element={<Intro />} />
        </Routes>
      </BrowserRouter>
      </AppContextProvider>
    </SWRConfig>
  );
}

export default App;
