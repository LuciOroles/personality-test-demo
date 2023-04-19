import React from "react";
import Questionaire from "./routes/Questionaire";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";

import Results from "./routes/Results";
import Intro from "./routes/Intro";
 
import { AppContextProvider } from "./AppContext";

function App() {
  return (
    <SWRConfig>
      <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="results" element={<Results />} />
          <Route path="questions" element={<Questionaire />} />
          <Route path="*" element={<Intro />} />
        </Routes>
      </BrowserRouter>
      </AppContextProvider>
    </SWRConfig>
  );
}

export default App;
