import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async (artifactSBT , artifactOPI) => {
      if (artifactSBT) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();

        const { abi } = artifactSBT;
        let addressSBT, contractSBT,owner,sounder,surveyed;
        try {
          addressSBT = artifactSBT.networks[networkID].address;
          contractSBT = new web3.eth.Contract(abi, addressSBT);
          owner = await contractSBT.methods.owner().call();
          console.log(owner);
          sounder = await contractSBT.methods.isSounder(accounts[0]).call();
          surveyed = await contractSBT.methods.isSurveyed(accounts[0]).call();
        } catch (err) {
          console.error(err);
        }

        const abiOPI = artifactOPI.abi;
        let addressOPI, contractOPI;
        try {
          addressOPI = artifactOPI.networks[networkID].address;
          contractOPI = new web3.eth.Contract(abiOPI, addressOPI);
        } catch (err) {
          console.error(err);
        }


        dispatch({
          type: actions.init,
          data: { artifactSBT, artifactOPI, web3, accounts, networkID, contractSBT,contractOPI ,owner}
        });
      }

      
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifactSBT = require("../../contracts/OpiChainSBT.json");
        const artifactOPI = require("../../contracts/Opi.json");
        init(artifactSBT,artifactOPI);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);




  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifactSBT,state.artifactOPI);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifactSBT , state.artifactOPI]);


  // useEffect(() => {
  //   const events = ["chainChanged", "accountsChanged"];
  //   const handleChange = () => {
  //     init(state.artifactOPI);
  //   };

  //   events.forEach(e => window.ethereum.on(e, handleChange));
  //   return () => {
  //     events.forEach(e => window.ethereum.removeListener(e, handleChange));
  //   };
  // }, [init, state.artifactOPI]);


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
