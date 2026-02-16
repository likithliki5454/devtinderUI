import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Prifile from "./Prifile";
import Login from "./Components/Authpages/Login";
import { Provider } from "react-redux";
import appstore from "./Components/utils/appStore";
import FeedPage from "./Components/FeedPage";
import { ToastContainer } from "react-toastify";
import ChangePassword from "./Components/ChangePassword";
function App() {
  return (
    <><ToastContainer position="top-right" autoClose={3000} />
    <Provider store={appstore}>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/" element={<FeedPage/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Prifile/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      </Route>
      </Routes>    
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
