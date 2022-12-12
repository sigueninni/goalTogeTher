import * as React from 'react';
import '../css/page/marketPlace.css';
import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';

function MarketPlace() {

    const [refresh, setRefresh] = useState(false);
    const { state: { web3,accounts, contractOPI , contractOpiChainSurveyNFT, contractMarketPlace } } = useEth();
    const [listed, setListed] = useState([]);
    const [surveysData, setSurveysData] = useState([]);
    const [balance, setBalance] = useState('0');

    useEffect(() => {


        
        if (contractOPI && contractOPI?.methods) {

            (async function () {

                try {
                   const balance = await contractOPI.methods.balanceOf(accounts[0]).call({ from: accounts[0]} );
                   console.log(balance);
                   setBalance(balance);
                } catch (err) {
                    console.log(err);
                }


        })();

        }



        if (contractMarketPlace && contractMarketPlace?.methods) {
            (async function () {


                let listedSurvey = await contractMarketPlace.methods.getListedSurveysNfts().call({ from: accounts[0] });
                let surveysDataLclExt = [];

                for (let [index, s] of listedSurvey.entries()) {
                    let survey = await contractOpiChainSurveyNFT.methods.getSurveyById(s.id).call({ from: accounts[0] });
                    s = { ...s, ...survey };
                    surveysDataLclExt.push(s);
                    console.log(s);
                }
                setSurveysData(surveysDataLclExt);
                //  setSurveysData(surveysDataLclExt);
            })();
        }

    }, [contractMarketPlace, contractOpiChainSurveyNFT,accounts, refresh]);



    const buySurveyResultNft = async (_idSurvey) => {
        try {
            await contractMarketPlace.methods.buySurveyResultNft(_idSurvey).send({ from: accounts[0] , value: web3.utils.toWei('0.1', 'ether') })  ;
            await contractOpiChainSurveyNFT.methods.setSurveyOwner(_idSurvey,accounts[0]).send({ from: accounts[0] });
            
        } catch (err) {
            console.log(err);
        }
        let nextR = !refresh;
        setRefresh(nextR);
        // navigate('/');

    }



    return (

        <div className="marketPlace">
            <ImageList sx={{ width: 400, height: 300 }} cols={3} gap={8}>
                {surveysData.map((item) => (
                    <Box key={item.id}>
                    <ImageListItem key={item.id} >
                        <img
                            src={"https://gateway.pinata.cloud/ipfs/QmeTXNBq64vbUxCSvCRt8Ka5a966iEhKZNhLmGtVU5uywE/" + (item.id).toString() + ".png"} 
                           
                            alt={item.description}
                            loading="lazy"
                        />
                         <ImageListItemBar
                            title={item.description}
                            subtitle={<span>by: {item.owner}</span>}
                            position="below"
                        /> 
                    </ImageListItem>
                    <div id='buyContainerButt'>
                        
                      {item.owner !== accounts[0]  && balance != 0 &&  <button className="butMarketNotEdit" 
                       onClick={() => buySurveyResultNft(item.id)} 
                      >
                        Buy Survey Result</button>}  
                      {item.owner !== accounts[0]  &&  balance == 0 && <button className="userListNotEdit">Not enough Opis to buy Results!</button>}  
                      {item.owner === accounts[0]  &&  <button className="userListNotEdit">You are the seller!</button>}  

                    </div>
                    
                    </Box>
                    
                ))}
            </ImageList>
        </div>
    );
}

export default MarketPlace;