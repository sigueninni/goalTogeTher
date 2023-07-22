
import '../css/page/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
//import { userRows } from "../dummyData";
import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

function ChallengeList() {


    let ChallengesDataLcl = [];
    let ChallengesDataLclExt = [];
    const [ChallengesData, setChallengesData] = useState([]);
    const [ChallengesDesc, setChallengesDesc] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const { state: { web3, accounts, contractChlChainChallengeNFT, contractMarketPlace } } = useEth();


    useEffect(() => {

        if (contractChlChainChallengeNFT && contractChlChainChallengeNFT?.methods) {
            (async function () {

                let oldEvents = await contractChlChainChallengeNFT.getPastEvents('ChallengeCreated', {
                    fromBlock: 0,
                    toBlock: 'latest'
                });

                oldEvents.forEach(event => {
                    debugger;
                    if (event.returnValues._ownerChallenge == accounts[0]) {
                        ChallengesDataLcl.push({
                            '_idChallenge': event.returnValues._idChallenge,
                            '_ownerChallenge': event.returnValues._ownerChallenge,
                        });

                    }

                });


                let oldEventsM = await contractMarketPlace.getPastEvents('ChallengeNFTSold', {
                    fromBlock: 0,
                    toBlock: 'latest'
                });
                debugger;
                oldEventsM.forEach(event => {
                
                    if (event.returnValues.owner == accounts[0]) {
                        ChallengesDataLcl.push({
                            '_idChallenge': event.returnValues.id,
                            '_ownerChallenge': event.returnValues.owner,
                        });

                    }

                });


                for (let [index, s] of ChallengesDataLcl.entries()) {
                    let Challenge = await contractChlChainChallengeNFT.methods.getChallengeById(s._idChallenge).call({ from: accounts[0] });
                    s = { ...s, ...Challenge };
                    ChallengesDataLclExt.push(s);
                    console.log(s);
                }
                setChallengesData(ChallengesDataLclExt);

              
              // let test =  await contractChlChainChallengeNFT.methods.getMyChallenges().call({ from: accounts[0] });

            })();
        }

    }, [contractChlChainChallengeNFT, contractMarketPlace, accounts, refresh]);


    const getStatusById = (status) => {
        return (status === "0" ? 'Ongoing' : 'Terminated');
    };

    const getChallengeDetails = async () => {
        let ChallengesDescLcl = [];
        for (let i = 0; i < ChallengesData.length; i++) {
            let Challenge = await contractChlChainChallengeNFT.methods.getChallengeById(ChallengesData[i]._idChallenge).call({ from: accounts[0] });
        }
        setChallengesDesc(ChallengesDescLcl);
    }

    const mintChallenge = async (_idChallenge) => {
        try {
            await contractChlChainChallengeNFT.methods.mintChallenge(contractMarketPlace._address, _idChallenge).send({ from: accounts[0] });
        } catch (err) {
            console.log(err);
        }
        let nextR = !refresh;
        setRefresh(nextR);
        // navigate('/');

    }


    const listChallengeNft = async (_idChallenge, _price) => {
        debugger;
        try {
            // await contractChlChainChallengeNFT.methods.approve(contractMarketPlace._address, _idChallenge).send({ from: accounts[0] });
            await contractMarketPlace.methods.listChallengeNft(_idChallenge, parseInt(_price)).send({ from: accounts[0] , value: web3.utils.toWei('0.0001', 'ether') })
            await contractChlChainChallengeNFT.methods.setChallengeListed(_idChallenge).send({ from: accounts[0] });
            // .then(result => { throw Error('Error') })
            //  .catch(revertReason => console.log({ revertReason }));
        } catch (err) {
            console.log(err);
        }
        let nextR = !refresh;
        setRefresh(nextR);
        // navigate('/');

    }

    const setChallengeTerminated = async (_idChallenge) => {
        try {
            await contractChlChainChallengeNFT.methods.terminateChallenge(_idChallenge).send({ from: accounts[0] });
        } catch (err) {
            console.log(err);
        }
        let nextR = !refresh;
        setRefresh(nextR);
        // navigate('/');

    }


    const handleDelete = (id) => {
        setChallengesData(ChallengesData.filter((item) => item.idChallenge !== id));
    };

    const columns = [
        { field: "idChallenge", headerName: "Challenge Id", width: 90 },
        {
            field: "Challenge",
            headerName: "Description",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {!params.row.minted && <img className="userListImg" src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="" />}
                        {params.row.minted && <img className="userListImg" src={"https://gateway.pinata.cloud/ipfs/QmeTXNBq64vbUxCSvCRt8Ka5a966iEhKZNhLmGtVU5uywE/" + (params.row.idChallenge).toString() + ".png"} alt="" />}
                        {params.row.description}
                    </div>
                );
            },
        },
        {
            field: "ChallengeStatus",
            headerName: "Status",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {getStatusById(params.row.ChallengeStatus)}
                    </div>
                );
            },
        },
        {
            field: "nb", headerName: "Number of questions", width: 90,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        1
                    </div>
                );
            },
        },
        /*         {
                    field: "gender",
                    headerName: "Gender",
                    width: 100,
                    renderCell: (params) => {
                        return (
                            <div className="userListUser">
                                {getGenderById(params.row.gender)}
                            </div>
                        );
                    },
                },
                { field: "age", headerName: "Age", width: 90 },
                { field: "balance", headerName: "Balance", width: 90 },
                { field: "location", headerName: "Location", width: 90 },
                { field: "isChlIdGranted", headerName: "Chl Id Granted", width: 90 }, */
        {
            field: "action",
            headerName: "Action",
            width: 650,
            renderCell: (params) => {
                return (
                    <>
                        {!params.row.minted &&  <button className="userListEdit">Edit</button> }
                        {params.row.ChallengeStatus == '0' && <button className="userListEdit"
                            onClick={() => setChallengeTerminated(params.row.idChallenge)}
                        >Terminate Challenge</button>}
                        {params.row.ChallengeStatus == '1' && !params.row.minted && !params.row.listed && <button className="userListEdit"
                            onClick={() => mintChallenge(params.row.idChallenge)}>Mint NFT results</button>}
                        {params.row.minted && !params.row.listed && <button className="userListEdit">Stack Challenge</button>}
                        {params.row.minted && !params.row.listed && <button className="userListEdit"
                            onClick={() => listChallengeNft(params.row.idChallenge, "50")}
                        >List Challenge on Marketplace</button>}

                        {!params.row.minted && <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.idChallenge)}  />}

                        {params.row.listed &&  <button className="userListNotEdit">Challenge Listed on Marketplace</button> }

                    </>
                );
            },
        },
    ];

    return (

        <div className="userList">
            {/*     <div className="userListTitleContainer">
                <h1 className="userListTitle">Create a new GoalTogether Member</h1>
                <Link to="/newUser">
                    <button className="userListAddButton">Create</button>
                </Link>
            </div> */}
            <DataGrid
                rows={ChallengesData}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                getRowId={(row) => row.idChallenge}
            />
        </div>
    );
}

export default ChallengeList;