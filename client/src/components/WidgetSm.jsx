import '../css/component/widgetSm.css'

import { Visibility } from '@mui/icons-material';

function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src="https://gateway.pinata.cloud/ipfs/QmfGBsYqSpUA64SHHY8oe4fczuHZH2Anc4JsvcttSzq4NS/1.png"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Female/36/Paris</span>
            <span className="widgetSmUserTitle">Surveyed</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
   
        <li className="widgetSmListItem">
          <img
            src="https://gateway.pinata.cloud/ipfs/QmfGBsYqSpUA64SHHY8oe4fczuHZH2Anc4JsvcttSzq4NS/2.png"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Male/24/Toulouse</span>
            <span className="widgetSmUserTitle">Surveyed</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>

        <li className="widgetSmListItem">
          <img
            src="https://gateway.pinata.cloud/ipfs/QmfGBsYqSpUA64SHHY8oe4fczuHZH2Anc4JsvcttSzq4NS/4.png"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Corporate/Paris</span>
            <span className="widgetSmUserTitle">Sounder</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>     

      </ul>
    </div>
  );
}

export default WidgetSm;