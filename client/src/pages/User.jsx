import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  Transgender,
  SettingsAccessibility,
  SupervisorAccount
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import '../css/page/user.css';
import { useLocation } from "react-router-dom";


function User() {
  const location = useLocation();
  const { row } = location.state;


  const getRoleById = (role) => {
    return (role === 0 ? 'Sounder' : 'Challengeed');
  };

  const getGenderById = (gender) => {
    return (gender === 0 ? 'Male' : 'Female');
  };


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        {/* <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={"https://gateway.pinata.cloud/ipfs/QmdGwjCgrCAyUddv8z1XBhuS5EptRjVKUnEraHwuKvr66A/" + row.ChlIdCounter.toString() + ".png"}
              alt=""
              className="userShowImg"
            />
            {/*       <div className="userShowTopTitle">
                <span className="userShowUsername">Anna Becker</span>
                <span className="userShowUserTitle">Software Engineer</span>
              </div> */}
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{row.ChlIdCounter}</span>
            </div>
            <div className="userShowInfo">
              <Transgender className="userShowIcon" />
              <span className="userShowInfoTitle">{getGenderById(row.gender)}</span>
            </div>
            <div className="userShowInfo">
              <SettingsAccessibility className="userShowIcon" />
              <span className="userShowInfoTitle">{row.age}</span>
            </div>
            <div className="userShowInfo">
              <SupervisorAccount className="userShowIcon" />
              <span className="userShowInfoTitle">{getRoleById(row.role)}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+33 123456678</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">alyra@Chlchain.com</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Paris | France</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Gender</label>
                <input
                  type="text"
                  placeholder={getGenderById(row.gender)}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Age</label>
                <input
                  type="text"
                  placeholder={row.age}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Role</label>
                <input
                  type="text"
                  placeholder={getRoleById(row.role)}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="alyra@Chlchain.com"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+33 123456678"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Paris | France"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;