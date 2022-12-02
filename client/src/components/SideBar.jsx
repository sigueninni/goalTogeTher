import '../css/component/sidebar.css'
import useEth from "../contexts/EthContext/useEth";
import Chip from '@mui/material/Chip';
import PersonIcon from '@mui/icons-material/Person';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
} from '@mui/icons-material'; 

import { Link } from "react-router-dom";

function Sidebar() {
  const { state: { accounts, contractSBT } } = useEth();
  return (
    <div className="sidebar">
 
 <div className="sidebarProfile">
<Card >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    </div>
     {/*    <div className="topCenter">
          <div id="topBarchip"> {accounts && accounts[0] && <Chip variant="outlined" label={accounts[0]} color="secondary" icon={<PersonIcon />} />}</div>
          <div>Balance : 30 OPI</div>
        </div> */}

      <div className="sidebarWrapper">
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
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">

            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Surveys Marketplace
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
              <ShoppingCart className="sidebarIcon" />
              Buy Opi
            </li>
            <li className="sidebarListItem">
              <AddCircle className="sidebarIcon" />
              Create Survey
            </li>
            <li className="sidebarListItem">
              <MoveUp className="sidebarIcon" />
              Withdraw my Opis
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
          </ul>
        </div>
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
      </div>
    </div>
  );
}

export default Sidebar;