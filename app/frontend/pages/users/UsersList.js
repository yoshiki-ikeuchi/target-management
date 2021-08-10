import { any } from "prop-types";
import React from "react"

import UsersCard from "../../pages/users/card/UsersCard";

const UsersList = (props) => {
  const userList = props.users;

  return (
    <div style={{marginBottom:10}}>
      {
        userList.map((user, idx) => (
          <div key={idx}>
            <UsersCard 
              id={user.id}
              user_name={user.user_name}
              email={user.email}
              authority={user.authority}
            />
          </div>
        ))
      }
      <div style={{clear:"both"}}></div>
    </div>
  );
}
// 何故かTSが邪魔しているので
UsersList.propTypes = {
  users: any
}


export default React.memo(UsersList);
