import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifactSBT => {
      if (artifactSBT) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifactSBT;
        let addressSBT, contractSBT;
        try {
          addressSBT = artifactSBT.networks[networkID].address;
          contractSBT = new web3.eth.Contract(abi, addressSBT);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifactSBT, web3, accounts, networkID, contractSBT }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifactSBT = require("../../contracts/OpiChainSBT.json");
        init(artifactSBT);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifactSBT);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifactSBT]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
