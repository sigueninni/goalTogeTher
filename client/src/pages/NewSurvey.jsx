import '../css/page/newsurvey.css';
import { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";
import { useNavigate } from 'react-router-dom';

function NewSurvey() {

    const { state: { web3,  contractOPI, contractOpiChainSurveyNFT ,accounts } } = useEth();
    const navigate = useNavigate();
    const [balance, setBalance] = useState('0');

    useEffect(() => {
        if (contractOPI && contractOPI?.methods) {

            (async function () {

                try {
                    const balance = await contractOPI.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
                    setBalance(balance);
                } catch (err) {
                    console.log(err);
                }


            })();

        }
    }, [accounts]);

    //createSurvey(address _ownerSurvey, string memory _description)

    const createSurvey = async (_description) => {
        try {
            await contractOpiChainSurveyNFT.methods.createSurvey(accounts[0],_description).send({ from: accounts[0] });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };


    const onCreateSurvey = (event) => {
        event.preventDefault();
        var data = new FormData(event.target);
        let formObject = Object.fromEntries(data.entries());
        debugger;
        createSurvey(formObject.title);
    }


    return (


        <div className="newSurvey">
            <h1 className="newSurveyTitle">New Survey</h1>
            {(balance !== '0') &&
                <form className="newSurveyForm" onSubmit={onCreateSurvey} >   {/*onSubmit={onGrantOpiID} */}
                    <div className="newSurveyItem">
                        <label>Survey Title</label>
                        <input name="title" type="text" placeholder="Title of your Survey" required={true} />
                    </div>

                    <div className="newSurveyItemQuestion">
                        <label>Question 1</label>
                        <input name="question" type="text" placeholder="Survey question" required={true} />
                    </div>

                    <button className="newSurveyButton" type="submit">Create Survey</button>
                </form>}


            {(balance === '0') &&
                <div className='newSurveyBuyOpi'>
                    You don't have enough OPIs to create Survey!
                </div>
            }
        </div>
    );
}

export default NewSurvey;