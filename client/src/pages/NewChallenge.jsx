import '../css/page/NewChallenge.css';
import { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";
import { useNavigate } from 'react-router-dom';

function NewChallenge() {

    const { state: { web3,  contractCHL, contractChlChainChallengeNFT ,accounts } } = useEth();
    const navigate = useNavigate();
    const [balance, setBalance] = useState('0');

    useEffect(() => {
        if (contractCHL && contractCHL?.methods) {

            (async function () {

                try {
                    const balance = await contractCHL.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
                    setBalance(balance);
                } catch (err) {
                    console.log(err);
                }


            })();

        }
    }, [accounts]);

    //createChallenge(address _ownerChallenge, string memory _description)

    const createChallenge = async (_description) => {
        try {
            await contractChlChainChallengeNFT.methods.createChallenge(accounts[0],_description).send({ from: accounts[0] });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };


    const onCreateChallenge = (event) => {
        event.preventDefault();
        var data = new FormData(event.target);
        let formObject = Object.fromEntries(data.entries());
        debugger;
        createChallenge(formObject.title);
    }


    return (


        <div className="NewChallenge">
            <h1 className="NewChallengeTitle">New Challenge</h1>
            {(balance !== '0') &&
                <form className="NewChallengeForm" onSubmit={onCreateChallenge} >   {/*onSubmit={onGrantChlID} */}
                    <div className="NewChallengeItem">
                        <label>Challenge Title</label>
                        <input name="title" type="text" placeholder="Title of your Challenge" required={true} />
                    </div>

                    <div className="NewChallengeItemQuestion">
                        <label>Question 1</label>
                        <input name="question" type="text" placeholder="Challenge question" required={true} />
                    </div>

                    <button className="NewChallengeButton" type="submit">Create Challenge</button>
                </form>}


            {(balance === '0') &&
                <div className='NewChallengeBuyChl'>
                    You don't have enough CHLs to create Challenge!
                </div>
            }
        </div>
    );
}

export default NewChallenge;