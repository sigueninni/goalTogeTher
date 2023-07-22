import '../css/page/chldex.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import useEth from "../contexts/EthContext/useEth";
import { useState } from 'react';
import Chip from '@mui/material/Chip';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useNavigate } from 'react-router-dom';


function ChlDex() {
    const { state: { web3 ,accounts, owner, contractCHL ,contractChlDex } } = useEth();
    const [amountEth, setAmountEth] = useState('');
    const navigate = useNavigate();

    const buyTokens = async (_amount) => {
        try {
          //  await contractCHL.methods.approve( contractChlDex.address, "1000").send({ from: accounts[0]});
            await contractChlDex.methods.buyTokens().send({ from: accounts[0],  value: web3.utils.toWei(_amount, 'ether') });//value:web3.utils.fromWei(_amount, "ether")} );
        } catch (err) {
            console.log(err);
        }
        navigate('/');
        window.location.reload(true);
        
    }


    const handleChangeEthAmount = (event) => {

        if (event.target.value === "") {
            alert("Please enter an amount");
            return;
          }

          setAmountEth(event.target.value);
      };

      
    const onBuyToken = async e => {
        buyTokens(amountEth);
      };

  return (
    <div className="Chldex">
       <Box sx={{ width: '100%' }}  display="flex"   justifyContent="center"
       >
      <Stack  direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2} >
        <TextField
          required
          id="outlined-required"
          type="number"
          label="Amout in Ether"
          onChange={handleChangeEthAmount}
          value={amountEth}
        />

       <button className="ChldexButton"  onClick={onBuyToken}>Buy CHLs</button>
       <Chip icon={<SwapHorizIcon />}   label="1 Ether = 50 CHL =  1 Challenge**" color="secondary" variant="outlined" />
       </Stack>
    </Box>
    </div>
  );
}

export default ChlDex;