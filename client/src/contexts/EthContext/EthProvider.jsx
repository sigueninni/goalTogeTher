import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async (artifactGoalTogeTherHandling) => {
      if (artifactGoalTogeTherHandling) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        web3.eth.handleRevert = true;
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();

/*         const { abi } = artifactSBT;
        let addressSBT, contractSBT, owner, sounder, Challengeed;
        try {
          addressSBT = artifactSBT.networks[networkID].address;
          contractSBT = new web3.eth.Contract(abi, addressSBT);
          owner = await contractSBT.methods.owner().call({ from: owner });
          sounder = await contractSBT.methods.isSounder(accounts[0]).call({ from: owner });
          Challengeed = await contractSBT.methods.isChallengeed(accounts[0]).call({ from: owner });
        } catch (err) {
          console.error(err);
        }

        //Chl
        const abiCHL = artifactCHL.abi;
        let addressCHL, contractCHL;
        try {
          addressCHL = artifactCHL.networks[networkID].address;
          contractCHL = new web3.eth.Contract(abiCHL, addressCHL);
        } catch (err) {
          console.error(err);
        }

        //ChlDex
        const abiChlDex = artifactChlDex.abi;
        let addressChlDex, contractChlDex;
        try {
          addressChlDex = artifactChlDex.networks[networkID].address;
          contractChlDex = new web3.eth.Contract(abiChlDex, addressChlDex);
        } catch (err) {
          console.error(err);
        } */

        // //ChlChainChallengeNFT
        // const abiChlChainChallengeNFT = artifactChlChainChallengeNFT.abi;
        // let addressChlChainChallengeNFT, contractChlChainChallengeNFT;
        // try {
        //   addressChlChainChallengeNFT = artifactChlChainChallengeNFT.networks[networkID].address;
        //   contractChlChainChallengeNFT = new web3.eth.Contract(abiChlChainChallengeNFT, addressChlChainChallengeNFT);
        // } catch (err) {
        //   console.error(err);
        // }

        //GoalTogeTherHandling -> artifactGoalTogeTherHandling
        debugger;
        const abiGoalTogeTherHandling = artifactGoalTogeTherHandling.abi;
        let addressGoalTogeTherHandling, contractGoalTogeTherHandling;
        try {
          addressGoalTogeTherHandling = artifactGoalTogeTherHandling.networks[networkID].address;
          contractGoalTogeTherHandling = new web3.eth.Contract(abiGoalTogeTherHandling, addressGoalTogeTherHandling);
        } catch (err) {
          console.error(err);
        }




        // //ChlMarketPlace
        // const abiMarketPlace = artifactMarketPlace.abi;
        // let addressMarketPlace, contractMarketPlace;
        // try {
        //   addressMarketPlace = artifactMarketPlace.networks[networkID].address;
        //   contractMarketPlace = new web3.eth.Contract(abiMarketPlace, addressMarketPlace);
        // } catch (err) {
        //   console.error(err);
        // }

        dispatch({
          type: actions.init,
          data: {
             artifactGoalTogeTherHandling,
            web3, accounts, networkID,  contractGoalTogeTherHandling 
          }
        });
      }


    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
      /*   const artifactSBT = require("../../contracts/ChlChainSBT.json");
        const artifactCHL = require("../../contracts/Chl.json");
        const artifactChlDex = require("../../contracts/ChlDex.json");
        const artifactChlChainChallengeNFT = require("../../contracts/ChlChainChallengeNFT.json");
        const artifactMarketPlace =  require("../../contracts/ChlChallengesMarketPlace.json"); */
        const artifactGoalTogeTherHandling = require("../../contracts/GoalTogeTherHandling.json");
        init(artifactGoalTogeTherHandling);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);




  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifactGoalTogeTherHandling);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init,state.artifactGoalTogeTherHandling]);


  // useEffect(() => {
  //   const events = ["chainChanged", "accountsChanged"];
  //   const handleChange = () => {
  //     init(state.artifactCHL);
  //   };

  //   events.forEach(e => window.ethereum.on(e, handleChange));
  //   return () => {
  //     events.forEach(e => window.ethereum.removeListener(e, handleChange));
  //   };
  // }, [init, state.artifactCHL]);


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
