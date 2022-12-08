import '../css/page/newUser.css'
import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";

function NewUser() {

    const { state: { accounts, contractSBT } } = useEth();

    const grantOpiID = async (_profileAddress,  _name, _age, _gender, _role) => {
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
            await contractSBT.methods.grantOpiID(_profileAddress, _name, _age, _gender, _role).send({ from: accounts[0] });
        } catch (err) {
            console.log(err);
        }
    };


    const onGrantOpiID = (event) => {
        event.preventDefault();
        var data = new FormData(event.target);
        let formObject = Object.fromEntries(data.entries());
        debugger;
        grantOpiID(formObject.address, formObject.name, parseInt(formObject.age), parseInt(formObject.gender), parseInt(formObject.role));
      }


    return (
        <div className="newUser">
            <h1 className="newUserTitle">New OPI member</h1>
            <form className="newUserForm" onSubmit={onGrantOpiID}>
                <div className="newUserItem">
                    <label>ETH address</label>
                    <input name ="address" type="text" placeholder="0x0000000000000000000000000000000000000000" />
                </div>

                <div className="newUserItem">
                    <label>Name</label>
                    <input name ="name" type="text" placeholder="Bob" />
                </div>

                <div className="newUserItem">
                    <label>Age</label>
                    <input name ="age" type="number" placeholder="" />
                </div>

                <div className="newUserItem">
                    <label>Email</label>
                    <input name ="email"  type="email" placeholder="alyra@opichain.com" />
                </div>

                <div className="newUserItem">
                    <label>Phone</label>
                    <input name ="phone" type="text" placeholder="+33 12345678 " />
                </div>
                <div className="newUserItem">
                    <label>Location</label>
                    <input name ="location" type="text" placeholder="Paris | France" />
                </div>
                <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                        <input type="radio" name="gender" id="male" value="0" />
                        <label for="male">male</label>
                        <input type="radio" name="gender" id="female" value="1" />
                        <label for="female">female</label>
                    </div>
                </div>
                <div className="newUserItem">
                    <label>Role</label>
                    <div className="newUserGender">
                    <input type="radio" name="role" id="sounder" value="0" />
                        <label for="sounder">sounder</label>
                        <input type="radio" name="role" id="surveyed" value="1" />
                        <label for="surveyed">surveyed</label>
                       
                    </div>
                </div>
                <div className="newUserItem">
                    <label>Issue SBT</label>
                    <select className="newUserSelect" name="issueBST" id="issueBST">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <button className="newUserButton"  type="submit"  >Grant OPI ID</button>
            </form>
        </div>
    );
}

export default NewUser;