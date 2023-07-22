import React from "react";
import useEth from "../contexts/EthContext/useEth";
import '../css/component/topbar.css';
import Chip from '@mui/material/Chip';
import PersonIcon from '@mui/icons-material/Person';
import { NotificationsNone, Language, Settings ,LogoutRounded} from '@mui/icons-material';

function Topbar() {

  const { state: { accounts, contractSBT } } = useEth();
 

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">GoalTogether</span>
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
          <div id="topBarchip"> {accounts && accounts[0] && <Chip variant="outlined" label={accounts[0]} color="secondary" deleteIcon={<PersonIcon />} />}</div>
          <div className="topbarIconContainer">
            <LogoutRounded />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;