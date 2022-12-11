import '../css/component/widgetLg.css'
import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";



function WidgetLg() {

  let surveysDataLcl = [];
  let surveysDataLclExt = [];
  const [surveysData, setSurveysData] = useState([]);
  const [surveysDesc, setSurveysDesc] = useState([]);
  const { state: { accounts, contractOpiChainSurveyNFT } } = useEth();


  useEffect(() => {

    if (contractOpiChainSurveyNFT && contractOpiChainSurveyNFT?.methods) {
      (async function () {

        let oldEvents = await contractOpiChainSurveyNFT.getPastEvents('surveyCreated', {
          fromBlock: 0,
          toBlock: 'latest'
        });

        oldEvents.forEach(event => {
          debugger;
          surveysDataLcl.push({
            '_idSurvey': event.returnValues._idSurvey,
            '_ownerSurvey': event.returnValues._ownerSurvey,
          });

        });



        for (let [index, s] of surveysDataLcl.entries()) {
          let survey = await contractOpiChainSurveyNFT.methods.getSurveyById(s._idSurvey).call({ from: accounts[0] });
          s = { ...s, ...survey };
          surveysDataLclExt.push(s);
          console.log(s);
        }
        setSurveysData(surveysDataLclExt);
      })();
    }

  }, [contractOpiChainSurveyNFT, accounts]);


  const getStatusById = (status) => {
    return (status === "0" ? 'Ongoing' : 'Terminated');
  };

  const getSurveyDetails = async () => {
    let surveysDescLcl = [];
    for (let i = 0; i < surveysData.length; i++) {
      let survey = await contractOpiChainSurveyNFT.methods.getSurveyById(surveysData[i]._idSurvey).call({ from: accounts[0] });
    }
    setSurveysDesc(surveysDescLcl);
    console.log(surveysDesc);

  }

  const getSurveys = () => {
    let surveys = [...surveysData];

    return surveys.map((p, i) => {
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
              <Button type={getStatusById(p.surveyStatus)} size="small" />
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
      <h3 className="widgetLgTitle">Latest Surveys interactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Title</th>
            <th className="widgetLgTh">Cost in OPI</th>
            <th className="widgetLgTh">Survey Sample</th>
            <th className="widgetLgTh">Status</th>
          </tr>

          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">Young people reading</span>
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
              <span className="widgetLgName">Cinema entries </span>
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
              <span className="widgetLgName">Womand and sport</span>
            </td>
            {/* <td className="widgetLgDate">14 January 2023</td> */}
            <td className="widgetLgAmount">400</td>
            <td className="widgetLgAmount">100</td>
            <td className="widgetLgStatus">
              <Button type="Terminated" size="small" />
            </td>
          </tr>

          {getSurveys()}

        </tbody>
      </table>
    </div>
  );
}

export default WidgetLg;