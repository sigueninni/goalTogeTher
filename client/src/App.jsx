import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import Sidebar from './components/SideBar'
import Topbar from "./components/TopBar";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import OpiDex from "./pages/OpiDex";
import NewSurvey from "./pages/NewSurvey";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  useEffect } from "react";
import { useHistory } from "react-router-dom";

function App() {
/*   let history = useHistory();

  useEffect(() => {
    history.push("/");
  }, []);
 */

  return (
    <EthProvider>
      <Router>
        <Topbar />
        <div className="container"> 
        {/* <Container> */}
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/opiDex" element={<OpiDex />} />
            <Route path="/NewSurvey" element={<NewSurvey />} />

            {/*   <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} /> */}
          </Routes>
        {/* </Container> */}
         </div> 
      </Router>
    </EthProvider>
  );
}

export default App;
{/* <div id="App" >
<div className="container">
  <OpiChainDashBoard />
</div>
</div> */}