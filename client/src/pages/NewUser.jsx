import '../css/page/newUser.css'
import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function NewUser() {

    const { state: { accounts, contractSBT } } = useEth();

    const grantOpiID = async (_profileAddress, _SBTUri, _name, _age, _gender, _role) => {
        /*         grantOpiID( test,
                    "https://gateway.pinata.cloud/ipfs/QmQzEEbvYSV2atiDv8PdT4WuNyjTLbKpEWFVqFFVFLGAut/1.json",
                    "saad",
                    38,
                    0,
                    0);
                     address _profileAddress,
                string memory _SBTUri,
                string memory _name,
                uint256 _age,
                uint8 _gender,
                uint8 _role
                 */
        try {
            await contractSBT.methods.grantOpiID(_profileAddress, _SBTUri, _name, _age, _gender, _role).send({ from: accounts[0] });
        } catch (err) {
            console.log(err);
        }
    };


    const onGrantOpiID = () => {

        //grantOpiID(inputProposal);

    }





    return (
        <div className="newUser">
            <h1 className="newUserTitle">New OPI member</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>ETH address</label>
                    <input type="text" placeholder="0x0000000000000000000000000000000000000000" />
                </div>

                <div className="newUserItem">
                    <label>Age</label>
                    <input type="number" placeholder="" />
                </div>

                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" placeholder="alyra@opichain.com" />
                </div>

                <div className="newUserItem">
                    <label>Phone</label>
                    <input type="text" placeholder="+33 12345678 " />
                </div>
                <div className="newUserItem">
                    <label>Address</label>
                    <input type="text" placeholder="Paris | France" />
                </div>
                <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                        <input type="radio" name="gender" id="male" value="male" />
                        <label for="male">male</label>
                        <input type="radio" name="gender" id="female" value="female" />
                        <label for="female">female</label>
                    </div>
                </div>
                <div className="newUserItem">
                    <label>Role</label>
                    <div className="newUserGender">
                        <input type="radio" name="gender" id="male" value="male" />
                        <label for="male">surveyed</label>
                        <input type="radio" name="gender" id="female" value="female" />
                        <label for="female">sounder</label>
                    </div>
                </div>
                <div className="newUserItem">
                    <label>Issue SBT</label>
                    <select className="newUserSelect" name="active" id="active">
                        <option value="no">No</option>
                        <option value="yes">Yes</option>

                    </select>
                </div>
                <button className="newUserButton">Grant OPI ID</button>
            </form>
        </div>
    );
}

export default NewUser;