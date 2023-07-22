import * as React from 'react';
import '../css/component/membercard.css';
import useEth from "../contexts/EthContext/useEth";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Savings , ShowChart } from '@mui/icons-material';

import { useState, useEffect } from "react";

function CardPerson({ address }) {

    const { state: { contractSBT,contractCHL ,accounts,owner ,sounder, Challengeed} } = useEth();
    const [balance, setBalance] = useState('0');
              
    useEffect(() => {


        if (contractCHL && contractCHL?.methods) {

            (async function () {

                try {
                   const balance = await contractCHL.methods.balanceOf(accounts[0]).call({ from: accounts[0]} );
                 //  const wei = parseInt(balance);
                 //  const ether = web3.utils.fromWei(balance, "ether");
                   setBalance(balance);
                } catch (err) {
                    console.log(err);
                }


        })();

        }

    },[contractSBT,contractCHL,accounts,balance]);

    return (
        
        <div key="{address}" id="CardPerson_main">
            {accounts && <pre> {sounder}  {Challengeed} </pre>} 
            <Card >
                <CardHeader
                    avatar={
                        <Avatar src="https://mui.com/static/images/avatar/2.jpg">
                        </Avatar>
                    }


                    title={address}
                    subheader={ accounts && owner === accounts[0] ? "ChlChain owner" : ( accounts && sounder ?  "Chlchain sounder" : ( accounts && Challengeed ?  "Chlchain Challengeed" : "not a member!")) 
                   }
                />

                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <div id="membercardWallet"><ShowChart fontSize="medium" /><span>Balance</span></div>
                        <div id="membercardBalance">{balance} CHL</div>
                      -
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <div id="membercardWallet"><Savings fontSize="medium" /><span>Stacked Amount</span></div>
                        <div id="membercardBalance">0 CHL</div>
                        -
                    </Stack>

                </CardContent>
            </Card>
        </div>
    );
}

export default CardPerson;