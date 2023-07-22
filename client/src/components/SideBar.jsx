import '../css/component/sidebar.css'
import useEth from "../contexts/EthContext/useEth";
import MemberCard from "./MemberCard";
import Chip from '@mui/material/Chip';
import PersonIcon from '@mui/icons-material/Person';

/* import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
 */

import {
  LineStyle,
  Timeline,
  ShoppingCart,
  PermIdentity,
  Storefront,
  AttachMoney,
  Savings,
  MailOutline,
  MoveUp,
  Feed,
  AddCircle,
  WorkOutline,
  Report,
  ShoppingBag,
} from '@mui/icons-material';

import { Link } from "react-router-dom";

function Sidebar() {

  const { state: { contractSBT, accounts, owner, sounder, Challengeed } } = useEth();

  return (
    <div className="sidebar">

      <div className="sidebarProfile">
        <MemberCard></MemberCard>
      </div>
      <div className="sidebarWrapper">

        {/* everybody */}
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Feed className="sidebarIcon" />
              News
            </li>
          </ul>
        </div>

        {(Challengeed  || (accounts && owner === accounts[0]) ) &&
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Member Menu</h3>
            <ul className="sidebarList">
            {/*   <Link to="/MarketPlace" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Challenges Marketplace
                </li>
              </Link> */}
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
              <li className="sidebarListItem">
                <Savings className="sidebarIcon" />
                Stacking
              </li>
              <Link to="/chlDex" className="link">
                <li className="sidebarListItem">
                  <ShoppingCart className="sidebarIcon" />
                  Buy Chl
                </li>
              </Link>
              <Link to="/NewChallenge" className="link">
                <li className="sidebarListItem">
                  <AddCircle className="sidebarIcon" />
                  Create a Challenge
                </li>
              </Link>

              <Link to="/ChallengeList" className="link">
                <li className="sidebarListItem">
                  <ShoppingBag className="sidebarIcon" />
                  My Challenges
                </li>
              </Link>
              <li className="sidebarListItem">
                <MoveUp className="sidebarIcon" />
                Withdraw my Chls
              </li>
            </ul>
          </div>
        }

        {(sounder ) &&
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu Sounder</h3>
            <ul className="sidebarList">
            <Link to="/MarketPlace" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  My Challenges
                </li>
              </Link>

              <Link to="/products" className="link">
                <li className="sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Join a Challenge
                </li>
              </Link>
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
              <li className="sidebarListItem">
                <Savings className="sidebarIcon" />
                Stacking
              </li>
              <li className="sidebarListItem">
                <MoveUp className="sidebarIcon" />
                Withdraw my Chls
              </li>
            </ul>
          </div>
        }

        {/* everybody */}
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
          </ul>
        </div>

        {(accounts && owner === accounts[0]) &&
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Only Owner</h3>
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Members
                </li>
              </Link>
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Manage
              </li>
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
              <li className="sidebarListItem">
                <Report className="sidebarIcon" />
                Reports
              </li>
            </ul>
          </div>
        }

        {/* Challengeed and sounder */}
        {(sounder || Challengeed) &&
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">My Data</h3>
            <ul className="sidebarList">
              <Link to="/users" className="link">
              </Link>
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
              <li className="sidebarListItem">
                <Report className="sidebarIcon" />
                My Reports
              </li>
            </ul>
          </div>
        }


      </div>
    </div>
  );
}

export default Sidebar;