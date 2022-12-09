import * as React from 'react';
import '../css/page/container.css';
import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";


function Container() {

    const { state: { web3,contractSBT,contractOPI ,accounts,owner ,sounder, surveyed} } = useEth();
    const [balance, setBalance] = useState('0');
              
    useEffect(() => {


        if (contractOPI && contractOPI?.methods) {

            (async function () {

                try {
                   const balance = await contractOPI.methods.balanceOf(accounts[0]).call({ from: accounts[0]} );
                 //  const wei = parseInt(balance);
                 //  const ether = web3.utils.fromWei(balance, "ether");
                   setBalance(balance);
                } catch (err) {
                    console.log(err);
                }


        })();

        }



    },[contractSBT,accounts,balance]);

    return (
        
        <div className="container">
  
        </div>
    );
}

export default Container;