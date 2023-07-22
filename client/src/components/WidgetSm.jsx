import '../css/component/widgetSm.css'
import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import { Visibility } from '@mui/icons-material';

function WidgetSm() {

  let usersDataLcl = [];
  const [usersData, setUsersData] = useState([]);
  const { state: { accounts, contractSBT } } = useEth();

  useEffect(() => {

    if (contractSBT && contractSBT?.methods) {
      (async function () {

        let oldEvents = await contractSBT.getPastEvents('grantedChlID', {
          fromBlock: 0,
          toBlock: 'latest'
        });

        oldEvents.forEach(event => {
          usersDataLcl.push(
            event.returnValues._newChlProfile,
          );

        });
        setUsersData(usersDataLcl);
        console.log(usersDataLcl);
      })();
    }

  }, [contractSBT, accounts]);

  const getRoleById = (role) => {
    return (role === "0" ? 'Sounder' : 'Challengeed');
  };

  const getGenderById = (gender) => {
    return (gender === "0" ? 'Male' : 'Female');
  };

  const getMembers = () => {
    let members = [...usersData];

    return members.map((m, i) => {
      return (
        <div key={i} id="proposals_main_radiogroup">
          {/* <FormControlLabel    control={<Checkbox color="secondary" />} label={p.proposalId} /> */}
          <li className="widgetSmListItem">
            <img
              src={"https://gateway.pinata.cloud/ipfs/QmdGwjCgrCAyUddv8z1XBhuS5EptRjVKUnEraHwuKvr66A/" + m.ChlIdCounter.toString() + ".png"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{getGenderById(m.gender)}/{m.age}/Paris</span>
              <span className="widgetSmUserTitle">{getRoleById(m.role)}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>

        </div>
      );
    });
  };


  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {getMembers()}
        {/*   <li className="widgetSmListItem">
          <img
            src="https://gateway.pinata.cloud/ipfs/QmfGBsYqSpUA64SHHY8oe4fczuHZH2Anc4JsvcttSzq4NS/1.png"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Female/36/Paris</span>
            <span className="widgetSmUserTitle">Challengeed</span>
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
            <span className="widgetSmUserTitle">Challengeed</span>
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
        </li> */}

      </ul>
    </div>
  );
}

export default WidgetSm;