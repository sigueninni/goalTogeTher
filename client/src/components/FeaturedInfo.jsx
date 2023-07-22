import '../css/component/featuredInfo.css';
import ChallengeCard from '../components/ChallengeCard';
import Typography from '@mui/material/Typography';
import { AddCircle} from '@mui/icons-material';

import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

function FeaturedInfo() {
  return (
    <>

      <h3 className="featuredTitle">My Challenges</h3>
      <div className="featured">
        <div className="featuredItem">
          <ChallengeCard type='P' />
        </div>
      </div>

     <div className='featuredtitle'> <div className='act'><h3 className="featuredTitle">Challenges</h3> </div>  <div className='tit'><AddCircle /></div>  </div>
      <div className="featured">
        <div className="featuredItem">
          <ChallengeCard type='D' />
        </div>

        <div className="featuredItem">
          <ChallengeCard type='D' />
        </div>
        <div className="featuredItem">
          <ChallengeCard type='D' />
        </div>
        <div className="featuredItem">
          <ChallengeCard type='D' />
        </div>
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

    </>
  );
}

export default FeaturedInfo;