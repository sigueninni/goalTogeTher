import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async (artifactSBT , artifactOPI,artifactOpiDex) => {
      if (artifactSBT) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();

        const { abi } = artifactSBT;
        let addressSBT, contractSBT,owner,sounder,surveyed;
        try {
          addressSBT = artifactSBT.networks[networkID].address;
          contractSBT = new web3.eth.Contract(abi, addressSBT);
          owner = await contractSBT.methods.owner().call({ from: owner});
          sounder = await contractSBT.methods.isSounder(accounts[0]).call({ from: owner});
          surveyed = await contractSBT.methods.isSurveyed(accounts[0]).call({ from: owner});
        } catch (err) {
          console.error(err);
        }

        //Opi
        const abiOPI = artifactOPI.abi;
        let addressOPI, contractOPI;
        try {
          addressOPI = artifactOPI.networks[networkID].address;
          contractOPI = new web3.eth.Contract(abiOPI, addressOPI);
        } catch (err) {
          console.error(err);
        }

        //OpiDex
        const abiOpiDex = artifactOpiDex.abi;
        let addressOpiDex, contractOpiDex;
        try {
          addressOpiDex= artifactOpiDex.networks[networkID].address;
          contractOpiDex = new web3.eth.Contract(abiOpiDex, addressOpiDex);
        } catch (err) {
          console.error(err);
        }



        dispatch({
          type: actions.init,
          data: { artifactSBT, artifactOPI, artifactOpiDex, 
            web3, accounts, networkID, contractSBT,contractOPI , contractOpiDex ,owner,sounder,surveyed}
        });
      }

      
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifactSBT = require("../../contracts/OpiChainSBT.json");
        const artifactOPI = require("../../contracts/Opi.json");
        const artifactOpiDex = require("../../contracts/OpiDex.json");
        init(artifactSBT,artifactOPI,artifactOpiDex);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);




  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifactSBT,state.artifactOPI,state.artifactOpiDex);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifactSBT , state.artifactOPI, state.artifactOpiDex]);


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
