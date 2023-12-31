import '../css/component/featuredInfo.css';
import ChallengeCard from '../components/ChallengeCard';
import Typography from '@mui/material/Typography';
import { AddCircle } from '@mui/icons-material';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

function FeaturedInfo() {

  const { state: { accounts, contractGoalTogeTherHandling } } = useEth();

  const navigate = useNavigate();
  useEffect(() => {

    debugger;
    if (contractGoalTogeTherHandling && contractGoalTogeTherHandling?.methods) {
      (async function () {

        setChallengesData([]);
        let oldEvents = await contractGoalTogeTherHandling.getPastEvents('challengeCreated', {
          fromBlock: 0,
          toBlock: 'latest'
        });
        debugger;
        oldEvents.forEach(event => {
          debugger;
          console.log(event.returnValues);
          ChallengesData.push(

            /*      {
                     'ChlIdCounter': event.returnValues._newChlProfile.ChlIdCounter,
                     'role': event.returnValues._newChlProfile.role,
                     'gender': event.returnValues._newChlProfile.gender,
                     'age': event.returnValues._newChlProfile.age,
                     'isChlIdGranted': event.returnValues._newChlProfile.isChlIdGranted,
                     'balance': '0 CHL',
                     'location': 'Paris,France'

                 } */
            event.returnValues._challenge,
          );

        });
        setChallengesData(ChallengesData);

      })();
    }

  }, [contractGoalTogeTherHandling, accounts]);




  const [ChallengesData, setChallengesData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };


  const newChallenge = async (_challengeObject) => {
    debugger;
    try {

      await contractGoalTogeTherHandling.methods.createChallenge('Web3 coding Challenge', 2).send({ from: accounts[0] });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const getChallenges = () => {
    debugger;
    let challenges = [...ChallengesData];
    debugger;
    return challenges.map((c, i) => {
      return (

        <div key={i} className="featuredItem">
          <ChallengeCard type='D' challenge={c} />
        </div>
      );
    });
  };





  const onCreateChallenge = (event) => {
    newChallenge(event);
  };

  const onJoinChallenge = (event) => {
    debugger;
  };



  return (
    <div className='newChallDialog'>

      {/* DIALOG to create a challenge */}
      <Dialog open={open} onClose={handleClose} className='newChallDialog'>
        <DialogTitle>New Challenge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Complete below information, so your challenge can be listed!
          </DialogContentText>

          <TextField
            style={{ margin: 8 }}
            autoFocus
            required
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            style={{ margin: 8 }}

            label="Commitment description"
            multiline
            rows={2}
            fullWidth
            defaultValue="Commitment description"
          />

          <TextField
            style={{ margin: 8 }}

            label="Amount to deposit"
            type="number"
            fullWidth
            defaultValue="Commitment description"
          />

          <TextField
            style={{ margin: 8 }}

            label="Proof mecanism description"
            type="text"
            fullWidth
            defaultValue="Proof mecanism description"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onCreateChallenge}>Create</Button>
        </DialogActions>
      </Dialog>




      {/* DIALOG to create a challenge */}
      {/*      <Dialog open={openD} onClose={handleCloseD} className='newChallDialog'>
        <DialogTitle>New Challenge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To join this Challenge, you need to deposit! 
            Your deposit will be stacked for the whole duration of the challenge!
            Commit & earn! don't forget to give your proofs!
          </DialogContentText>
          <TextField
            style={{ margin: 8 }}

            label="Amount to deposit"
            type="number"
            fullWidth
            defaultValue="Commitment description"
          />

       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseD}>Cancel</Button>
          <Button onClick={onJoinChallenge}>Deposit to Join!</Button>
        </DialogActions>
      </Dialog> */}




      <h3 className="featuredTitle">My Challenges</h3>
      <div className="featured">
        <div className="featuredItem">
          <ChallengeCard type='P' />
        </div>
      </div>

      <div className='featuredtitle'> <div className='act'><h3 className="featuredTitle">Challenges</h3> </div>  <div className='tit'><AddCircle onClick={handleClickOpen} /></div>  </div>
      <div className="featured">
        {getChallenges()}
        {/*     <div className="featuredItem">
          <ChallengeCard type='D' />
        </div>

        <div className="featuredItem">
          <ChallengeCard type='D' onClick={onJoinChallenge}/>
        </div>
        <div className="featuredItem">
          <ChallengeCard type='D' />
        </div>
        <div className="featuredItem">
          <ChallengeCard type='D' />
        </div> */}
      </div>


      {/*  <div className="featuredItem">
        <span className="featuredTitle">CHL value</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">0,415€</span>
          <span className="featuredMoneyRate">
            -1.4% <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">CHL Volume</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">23678€</span>
          <span className="featuredMoneyRate">
            5.4% <ArrowUpward  className="featuredIcon"/>
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">New Challenges</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">9</span>
          <span className="featuredMoneyRate">
            -20% <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last week</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">New Join Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">32</span>
          <span className="featuredMoneyRate">
            +2% <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div> */}

    </div>
  );
}

export default FeaturedInfo;