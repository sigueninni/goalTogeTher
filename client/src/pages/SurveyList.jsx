
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

function SurveyList() {


    let surveysDataLcl = [];
    let surveysDataLclExt = [];
    const [surveysData, setSurveysData] = useState([]);
    const [surveysDesc, setSurveysDesc] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const { state: { web3, accounts, contractOpiChainSurveyNFT, contractMarketPlace } } = useEth();


    useEffect(() => {

        if (contractOpiChainSurveyNFT && contractOpiChainSurveyNFT?.methods) {
            (async function () {

                let oldEvents = await contractOpiChainSurveyNFT.getPastEvents('surveyCreated', {
                    fromBlock: 0,
                    toBlock: 'latest'
                });

                oldEvents.forEach(event => {
                    debugger;
                    if (event.returnValues._ownerSurvey == accounts[0]) {
                        surveysDataLcl.push({
                            '_idSurvey': event.returnValues._idSurvey,
                            '_ownerSurvey': event.returnValues._ownerSurvey,
                        });

                    }

                });

                for (let [index, s] of surveysDataLcl.entries()) {
                    let survey = await contractOpiChainSurveyNFT.methods.getSurveyById(s._idSurvey).call({ from: accounts[0] });
                    s = { ...s, ...survey };
                    surveysDataLclExt.push(s);
                    console.log(s);
                }
                setSurveysData(surveysDataLclExt);
            })();
        }

    }, [contractOpiChainSurveyNFT, contractMarketPlace, accounts, refresh]);


    const getStatusById = (status) => {
        return (status === "0" ? 'Ongoing' : 'Terminated');
    };

    const getSurveyDetails = async () => {
        let surveysDescLcl = [];
        for (let i = 0; i < surveysData.length; i++) {
            let survey = await contractOpiChainSurveyNFT.methods.getSurveyById(surveysData[i]._idSurvey).call({ from: accounts[0] });
        }
        setSurveysDesc(surveysDescLcl);
    }

    const mintSurvey = async (_idSurvey) => {
        try {
            await contractOpiChainSurveyNFT.methods.mintSurvey(_idSurvey).send({ from: accounts[0] });
        } catch (err) {
            console.log(err);
        }
        let nextR = !refresh;
        setRefresh(nextR);
        // navigate('/');

    }


    const listSurveyNft = async (_idSurvey, _price) => {
        debugger;
        try {
           // await contractOpiChainSurveyNFT.methods.approve(contractMarketPlace._address, _idSurvey).send({ from: accounts[0] });
            await contractMarketPlace.methods.listSurveyNft(_idSurvey, parseInt(_price)).send({ from: contractOpiChainSurveyNFT._address,  value: web3.utils.toWei('0.0001', 'ether')})
           // .then(result => { throw Error('Error') })
          //  .catch(revertReason => console.log({ revertReason }));
        } catch (err) {
            console.log(err);
        }
        let nextR = !refresh;
        setRefresh(nextR);
        // navigate('/');

    }

    const setSurveyTerminated = async (_idSurvey) => {
        try {
            await contractOpiChainSurveyNFT.methods.terminateSurvey(_idSurvey).send({ from: accounts[0] });
        } catch (err) {
            console.log(err);
        }
        let nextR = !refresh;
        setRefresh(nextR);
        // navigate('/');

    }


    const handleDelete = (id) => {
        setSurveysData(surveysData.filter((item) => item.idSurvey !== id));
    };

    const columns = [
        { field: "idSurvey", headerName: "Survey Id", width: 90 },
        {
            field: "Survey",
            headerName: "Description",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {!params.row.minted && <img className="userListImg" src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="" />}
                        {params.row.minted && <img className="userListImg" src={"https://gateway.pinata.cloud/ipfs/QmeTXNBq64vbUxCSvCRt8Ka5a966iEhKZNhLmGtVU5uywE/" + (params.row.idSurvey).toString() + ".png"} alt="" />}
                        {params.row.description}
                    </div>
                );
            },
        },
        {
            field: "surveyStatus",
            headerName: "Status",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {getStatusById(params.row.surveyStatus)}
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
                { field: "isOpiIdGranted", headerName: "Opi Id Granted", width: 90 }, */
        {
            field: "action",
            headerName: "Action",
            width: 650,
            renderCell: (params) => {
                return (
                    <>
                        <button className="userListEdit">Edit</button>
                        {params.row.surveyStatus == '0' && <button className="userListEdit"
                            onClick={() => setSurveyTerminated(params.row.idSurvey)}
                        >Terminate survey</button>}
                        {params.row.surveyStatus == '1' && !params.row.minted && <button className="userListEdit"
                            onClick={() => mintSurvey(params.row.idSurvey)}>Mint NFT results</button>}
                        {params.row.minted && <button className="userListEdit">Stack survey</button>}
                        {params.row.minted && <button className="userListEdit"
                            onClick={() => listSurveyNft(params.row.idSurvey, "50")}
                        >List survey on Marketplace</button>}

                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.idSurvey)}
                        />
                    </>
                );
            },
        },
    ];

    return (

        <div className="userList">
            {/*     <div className="userListTitleContainer">
                <h1 className="userListTitle">Create a new OPI member</h1>
                <Link to="/newUser">
                    <button className="userListAddButton">Create</button>
                </Link>
            </div> */}
            <DataGrid
                rows={surveysData}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                getRowId={(row) => row.idSurvey}
            />
        </div>
    );
}

export default SurveyList;