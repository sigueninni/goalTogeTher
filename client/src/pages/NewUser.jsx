import '../css/page/newUser.css'
import useEth from "../contexts/EthContext/useEth";
import { useNavigate } from 'react-router-dom';

function NewUser() {

    const { state: { accounts, contractSBT } } = useEth();
    const navigate = useNavigate();
    const grantChlID = async (_profileAddress, _name, _age, _gender, _role) => {
        try {
            await contractSBT.methods.grantChlID(_profileAddress, _name, _age, _gender, _role).send({ from: accounts[0] });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };


    const onGrantChlID = (event) => {
        event.preventDefault();
        var data = new FormData(event.target);
        let formObject = Object.fromEntries(data.entries());
        debugger;
        grantChlID(formObject.address, formObject.name, parseInt(formObject.age), parseInt(formObject.gender), parseInt(formObject.role));
    }


    return (
        <div className="newUser">
            <h1 className="newUserTitle">New GoalTogether Member</h1>
            <form className="newUserForm" onSubmit={onGrantChlID}>
                <div className="newUserItem">
                    <label>ETH address</label>
                    <input name="address" type="text" placeholder="0x0000000000000000000000000000000000000000" required={true}/>
                </div>

                <div className="newUserItem">
                    <label>Name</label>
                    <input name="name" type="text" placeholder="Bob" required={true}/>
                </div>

                <div className="newUserItem">
                    <label>Age</label>
                    <input name="age" type="number" placeholder="" required={true}/>
                </div>

                <div className="newUserItem">
                    <label>Email</label>
                    <input name="email" type="email" placeholder="alyra@Chlchain.com" required={true}/>
                </div>

                <div className="newUserItem">
                    <label>Phone</label>
                    <input name="phone" type="text" placeholder="+33 12345678 " required={true}/>
                </div>
                <div className="newUserItem">
                    <label>Location</label>
                    <input name="location" type="text" placeholder="Paris | France" required={true}/>
                </div>
                <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                        <input type="radio" name="gender" id="male" value="0" />
                        <label htmlFor="male">male</label>
                        <input type="radio" name="gender" id="female" value="1" />
                        <label htmlFor="female">female</label>
                    </div>
                </div>
                <div className="newUserItem">
                    <label>Role</label>
                    <div className="newUserGender">
                        <input type="radio" name="role" id="sounder" value="0" />
                        <label htmlFor="sounder">sounder</label>
                        <input type="radio" name="role" id="Challengeed" value="1" />
                        <label htmlFor="Challengeed">Challengeed</label>

                    </div>
                </div>
                <div className="newUserItem">
                    <label>Issue SBT</label>
                    <select className="newUserSelect" name="issueBST" id="issueBST">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <button className="newUserButton" type="submit"  >Grant CHL ID</button>
            </form>
        </div>
    );
}

export default NewUser;