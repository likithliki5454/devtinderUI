import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Prifile from "./Prifile";
import Login from "./Login";

function App() {
  return (
    <>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Prifile/>}/>
      </Route>
      </Routes>    
    </BrowserRouter>

    </>
  );
}

export default App;
