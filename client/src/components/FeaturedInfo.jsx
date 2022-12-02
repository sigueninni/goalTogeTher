import '../css/component/featuredInfo.css'

import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">OPI value</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">0,415€</span>
          <span className="featuredMoneyRate">
            -1.4% <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">OPI Volume</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">23678€</span>
          <span className="featuredMoneyRate">
            5.4% <ArrowUpward  className="featuredIcon"/>
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">New Surveys</span>
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
      </div>
    </div>
  );
}

export default FeaturedInfo;