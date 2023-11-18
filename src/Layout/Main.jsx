import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
// import background from "../components/Background/background";
const Main = () => {
     

  return (
    <div className="dark:bg-black dark:text-white">
     
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
     
    </div>
  );
};

export default Main;
