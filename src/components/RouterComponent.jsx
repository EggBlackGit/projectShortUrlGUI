import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home'

function AppRouter() {
  return (
    // <div className="AppRouter">
      <Routes>
        <Route path="/" element= {<Home/>} />
      </Routes>
    // </div>
  );
};

export default AppRouter;
