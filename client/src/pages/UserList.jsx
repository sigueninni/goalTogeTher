
import '../css/page/userList.css'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
//import { userRows } from "../dummyData";
import useEth from "../contexts/EthContext/useEth";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function UserList() {


    const [usersData, setUsersData] = useState([]);
    const { state: { accounts, contractSBT } } = useEth();


    useEffect(() => {
        let usersDataLcl = [];

        if (contractSBT && contractSBT?.methods) {
            (async function () {

                let oldEvents = await contractSBT.getPastEvents('grantedOpiID', {
                    fromBlock: 0,
                    toBlock: 'latest'
                });

                oldEvents.forEach(event => {
                    usersDataLcl.push(
                        {
                            'OpiIdCounter': event.returnValues._newOpiProfile.OpiIdCounter,
                            'role': event.returnValues._newOpiProfile.role,
                            'gender': event.returnValues._newOpiProfile.gender,
                            'age': event.returnValues._newOpiProfile.age,
                            'isOpiIdGranted': event.returnValues._newOpiProfile.isOpiIdGranted,
                            'balance': '50 opi5',
                            'location': 'Paris,France'

                        }
                        //  event.returnValues._newOpiProfile,
                    );

                });
                setUsersData(usersDataLcl);

            })();
        }

    }, [contractSBT, accounts]);

    const getRoleById = (role) => {

        return (role === "0" ? 'Sounder' : 'Surveyed');
    };

    const getGenderById = (gender) => {
        return (gender === "0" ? 'Male' : 'Female');
    };


    const handleDelete = (id) => {
        setUsersData(usersData.filter((item) => item.OpiIdCounter !== id));
    };

    const columns = [
        { field: "OpiIdCounter", headerName: "Opi Id", width: 90 },
        {
            field: "user",
            headerName: "User",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={"https://gateway.pinata.cloud/ipfs/QmdGwjCgrCAyUddv8z1XBhuS5EptRjVKUnEraHwuKvr66A/" + params.row.OpiIdCounter.toString() + ".png"} alt="" />
                        {params.row.username}
                    </div>
                );
            },
        },
        {
            field: "role",
            headerName: "role",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {getRoleById(params.row.role)}
                    </div>
                );
            },
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        {getGenderById(params.row.gender)}
                    </div>
                );
            },
        },
        { field: "age", headerName: "Age", width: 90 },
        { field: "balance", headerName: "Balance", width: 90 },
        { field: "location", headerName: "Location", width: 90 },
        { field: "isOpiIdGranted", headerName: "Opi Id Granted", width: 90 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row.OpiIdCounter} state={{ row: params.row }}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.OpiIdCounter)}
                        />
                    </>
                );
            },
        },
    ];

    return (

        <div className="userList">
            <div className="userListTitleContainer">
                <h1 className="userListTitle">Create a new OPI member</h1>
                <Link to="/newUser">
                    <button className="userListAddButton">Create</button>
                </Link>
            </div>
            <DataGrid
                rows={usersData}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                getRowId={(row) => row.OpiIdCounter}
            />
        </div>
    );
}

export default UserList;