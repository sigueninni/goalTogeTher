import * as React from 'react';
import '../css/component/membercard.css';
import useEth from "../contexts/EthContext/useEth";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { ShowChart } from '@mui/icons-material';
import { useState, useEffect } from "react";

function CardPerson({ address }) {

    const { state: { contractSBT,contractOPI ,accounts,owner ,sounder, surveyed} } = useEth();
    const [balance, setBalance] = useState('0');
              
    useEffect(() => {


        if (contractOPI && contractOPI?.methods) {

            (async function () {

                try {
                   const balance = await contractOPI.methods.balanceOf(accounts[0]).call({ from: accounts[0]} );
                   console.log("Balance",balance);
                   setBalance(balance);
                } catch (err) {
                    console.log(err);
                }


        })();

        }



    },[contractSBT,accounts,balance]);

    return (
        
        <div key="{address}" id="CardPerson_main">
            {accounts && <pre> {sounder}  {surveyed} </pre>} 
            <Card >
                <CardHeader
                    avatar={
                        <Avatar src="https://mui.com/static/images/avatar/2.jpg">
                        </Avatar>
                    }


                    title={address}
                    subheader={ accounts && owner === accounts[0] ? "OpiChain owner" : ( accounts && sounder ?  "Opichain sounder" : ( accounts && surveyed ?  "Opichain surveyed" : "not a member!")) 
                   }
                />

                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <div id="membercardWallet"><ShowChart fontSize="large" /></div>
                        <div id="membercardBalance">{balance} OPI</div>
                    </Stack>

                </CardContent>
            </Card>
        </div>
    );
}

export default CardPerson;