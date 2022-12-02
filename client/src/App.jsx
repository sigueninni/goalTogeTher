import { EthProvider } from "./contexts/EthContext";
import OpiChainDashBoard from "./components/OpiChainDashBoard";
import "./App.css";
import Sidebar from './components/SideBar'
import Topbar from "./components/TopBar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <EthProvider>
 <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
  {/*         <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} /> */}
        </Routes>
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