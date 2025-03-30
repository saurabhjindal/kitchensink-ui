import React from "react";


const UserTable = ({ users, editCallback }) => {
    return (
        <div className="table-container" style={{ display: 'flex', gap: "10px", marginLeft: "100px"}} >
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id} >
                            <td>{user.memberId}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td style={{fontWeight:700}} onClick={()=>editCallback(user)}> Edit </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td  className="no-data">No Users Found</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;

