// import "./userList.css";
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
                event.returnValues._newOpiProfile,
              );
    
            });
            setUsersData(usersDataLcl);
          
          })();
        }
    
      }, [contractSBT, accounts]);


    const handleDelete = (id) => {
        setUsersData(usersData.filter((item) => item.OpiIdCounter !== id));
    };

    const columns = [
        { field: "OpiIdCounter", headerName: "Opi Id", width: 90 }/* ,
        {
            field: "user",
            headerName: "User",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={params.row.avatar} alt="" />
                        {params.row.username}
                    </div>
                );
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "status",
            headerName: "Status",
            width: 120,
        },
        {
            field: "transaction",
            headerName: "Transaction Volume",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        }, */
    ];

    return (
        <div className="userList">
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