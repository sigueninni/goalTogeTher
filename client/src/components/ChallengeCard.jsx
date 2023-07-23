import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

//import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";



import '../css/component/ChallengeCard.css';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({type  , challenge} ) {


  const { state: { accounts,contractSBT,contractGoalTogeTherHandling,} } = useEth();


  useEffect(() => {

    
    if (contractGoalTogeTherHandling && contractGoalTogeTherHandling?.methods) {

  /*       (async function () {

            try {
               const balance = await contractCHL.methods.balanceOf(accounts[0]).call({ from: accounts[0]} );
             //  const wei = parseInt(balance);
             //  const ether = web3.utils.fromWei(balance, "ether");
               setBalance(balance);
            } catch (err) {
                console.log(err);
            }


    })(); */

    }

},[contractGoalTogeTherHandling,accounts]);







/* createChallenge(
  string memory _title,
  uint256 _amountDeposit */


  const [expanded, setExpanded] = React.useState(false);
  const [openP, setOpenP] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);



  const joinChallenge = (event) => {
    debugger;
   
  };


  const   proove = (event) => {
    /* debugger;

    const eas = new EAS(EASContractAddress);
    eas.connect(signer);

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
    const encodedData = schemaEncoder.encodeData([
      { name: "eventId", value: 1, type: "uint256" },
      { name: "voteIndex", value: 1, type: "uint8" },
    ]);

    const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";

    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
        expirationTime: 0,
        revocable: true,
        data: encodedData,
      },
    });

    const newAttestationUID = await tx.wait();

    console.log("New attestation UID:", newAttestationUID);
 */

  };


  const onDepositJoin = (event) => {
    debugger;
    handleClickOpenD();
  };


  const onPROOF = (event) => {
    handleClickOpenP();
  };




  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


const getTitle = ()=>{
if(challenge && challenge.title ) { return challenge.title } else  return 'Cding';
};

  const handleClickOpenP = () => {
    setOpenP(true);
  };

  const handleCloseP = () => {
    setOpenP(false);
  };


  const handleClickOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };

  return (

    <>


      {/*     <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button> */}


      {/* DIALOG to proov */}
      <Dialog open={openP} onClose={handleCloseP} className='newChallDialog'>
        <DialogTitle>Give your proofs!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You need to give a proof, we believe in you!
          </DialogContentText>
          <Button
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              hidden
            />
          </Button>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseP}>Cancel</Button>
          <Button onClick={joinChallenge}>Send your proof!</Button>
        </DialogActions>
      </Dialog>



      {/* DIALOG to deposit */}
      <Dialog open={openD} onClose={handleCloseD} className='newChallDialog'>
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
          <Button onClick={joinChallenge}>Deposit to Join!</Button>
        </DialogActions>
      </Dialog>









      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title={getTitle()}
          subheader="#Welness #Hard"
        />
        <CardContent>
          <div class="title">
            <span class="name">Total Deposit : 25 Eth</span>
            <span class="date">256 Members</span>
          </div>

          <Typography className="" variant="body2" color="text.secondary">
            For this Challenge, you need to commit every day a new project on github!
            <ul className="challengeCardUL">
              <li>Deposit 0.2 Ape</li>
              <li>Daily Challenge</li>
              <li>July 01, 2023 - September 01, 2023</li>
            </ul>
          </Typography>

        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>

          {(type === 'D' && <Button className="challengeCardDeposit" size="medium" onClick={onDepositJoin}>Deposit Now!</Button>)}
          {(type === 'P' && <Button className="challengeCardDeposit" size="medium" onClick={onPROOF} >Give Your Proofs!</Button>)}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show requirement of the Challenge"
          >
            <ExpandMoreIcon />
          </ExpandMore>

        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>How to proove the mission:</Typography>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>

        </Collapse>
      </Card>

    </>
  );
}





















// avatar={
//   /*  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//      R
//    </Avatar> */

//    <Avatar 
//    alt="Remy Sharp" 
//    src="data:image/png;base64,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" />

//  }