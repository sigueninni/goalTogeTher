import '../css/component/widgetLg.css'
import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";



function WidgetLg() {

  let ChallengesDataLcl = [];
  let ChallengesDataLclExt = [];
  const [ChallengesData, setChallengesData] = useState([]);
  const [ChallengesDesc, setChallengesDesc] = useState([]);
  const { state: { accounts, contractChlChainChallengeNFT } } = useEth();


  useEffect(() => {

    if (contractChlChainChallengeNFT && contractChlChainChallengeNFT?.methods) {
      (async function () {

        let oldEvents = await contractChlChainChallengeNFT.getPastEvents('ChallengeCreated', {
          fromBlock: 0,
          toBlock: 'latest'
        });

        oldEvents.forEach(event => {
          
            ChallengesDataLcl.push({
              '_idChallenge': event.returnValues._idChallenge,
              '_ownerChallenge': event.returnValues._ownerChallenge,
            });
         // }

        });



        for (let [index, s] of ChallengesDataLcl.entries()) {
          let Challenge = await contractChlChainChallengeNFT.methods.getChallengeById(s._idChallenge).call({ from: accounts[0] });
          s = { ...s, ...Challenge };
          ChallengesDataLclExt.push(s);
          console.log(s);
        }
        setChallengesData(ChallengesDataLclExt);
      })();
    }

  }, [contractChlChainChallengeNFT, accounts]);


  const getStatusById = (status) => {
    return (status === "0" ? 'Ongoing' : 'Terminated');
  };

  const getChallengeDetails = async () => {
    let ChallengesDescLcl = [];
    for (let i = 0; i < ChallengesData.length; i++) {
      let Challenge = await contractChlChainChallengeNFT.methods.getChallengeById(ChallengesData[i]._idChallenge).call({ from: accounts[0] });
    }
    setChallengesDesc(ChallengesDescLcl);
    console.log(ChallengesDesc);

  }

  const getChallenges = () => {
    let Challenges = [...ChallengesData];

    return Challenges.map((p, i) => {
      return (


        <tr key={i} className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">{p.description}</span>
          </td>
          {/* <td className="widgetLgDate">14 January 2023</td> */}
          <td className="widgetLgAmount">50</td>
          <td className="widgetLgAmount">10</td>
          <td className="widgetLgStatus">
            <Button type={getStatusById(p.ChallengeStatus)} size="small" />
          </td>
        </tr>


      );
    });
  };


  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Challenges interactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Title</th>
            <th className="widgetLgTh">Deposit</th>
            <th className="widgetLgTh">Total joiners</th>
            <th className="widgetLgTh">Status</th>
          </tr>

          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Learn Solidity in 30 days</span>
            </td>
            {/* <td className="widgetLgDate">14 January 2023</td> */}
            <td className="widgetLgAmount">100</td>
            <td className="widgetLgAmount">20</td>
            <td className="widgetLgStatus">
              <Button type="Draft" size="small" />
            </td>
          </tr>

          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fH"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">45 days hard Challenge</span>
            </td>
            {/* <td className="widgetLgDate">14 January 2023</td> */}
            <td className="widgetLgAmount">1000</td>
            <td className="widgetLgAmount">200</td>
            <td className="widgetLgStatus">
              <Button type="Ongoing" size="small" />
            </td>
          </tr>

          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://images.unsplash.com/photo-1569517282132-25d22f4573e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fH"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Gym Challenge</span>
            </td>
            {/* <td className="widgetLgDate">14 January 2023</td> */}
            <td className="widgetLgAmount">400</td>
            <td className="widgetLgAmount">100</td>
            <td className="widgetLgStatus">
              <Button type="Terminated" size="small" />
            </td>
          </tr>

          {getChallenges()}

        </tbody>
      </table>
    </div>
  );
}

export default WidgetLg;