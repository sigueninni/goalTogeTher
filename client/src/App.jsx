import { EthProvider } from "./contexts/EthContext";
import OpiChainDashBoard from "./components/OpiChainDashBoard";
import "./App.css";

function App() {
  return (
    <EthProvider>
    <div id="App" >
      <div className="container">
        <OpiChainDashBoard />
      </div>
    </div>
  </EthProvider>
  );
}

export default App;
