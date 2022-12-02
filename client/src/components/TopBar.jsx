import React from "react";
import useEth from "../contexts/EthContext/useEth";
import '../css/component/topbar.css';
import Chip from '@mui/material/Chip';
import PersonIcon from '@mui/icons-material/Person';
import { NotificationsNone, Language, Settings } from '@mui/icons-material';

function Topbar() {

  const { state: { accounts, contractSBT } } = useEth();


  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">OpiChain</span>
        </div>
        <div className="topCenter">
          <div id="topBarchip"> {accounts && accounts[0] && <Chip variant="outlined" label={accounts[0]} color="secondary" icon={<PersonIcon />} />}</div>
          <div>Balance : 30 OPI</div>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;