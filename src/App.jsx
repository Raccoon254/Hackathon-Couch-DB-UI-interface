import { Login, DisplayData } from "./index.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/display" element={<DisplayData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
