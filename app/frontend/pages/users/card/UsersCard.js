import { number, string } from "prop-types";
import React from "react"
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import "../css/UserList.css";

const UsersCard = (props) => {
  const id = props.id;
  const user_name = props.user_name;
  const email = props.email;
  const authority = props.authority;
  const history = useHistory();

  return (
      <div className={"cardOuterFrame"}>
        <div className={"cardTabel"}>
          <div className={"cardTabelRow"}>
            <div className={"cardTabelCell cardTitle"}>登録ID</div>
            <div className={"cardTabelCell"}>{id}</div>
          </div>
          <div className={"cardTabelRow"}>
            <div className={"cardTabelCell cardTitle"}>ユーザー名</div>
            <div className={"cardTabelCell"}>{user_name}</div>
          </div>
          <div className={"cardTabelRow"}>
            <div className={"cardTabelCell cardTitle"}>メールアドレス</div>
            <div className={"cardTabelCell"}>{email}</div>
          </div>
          <div className={"cardTabelRow"}>
            <div className={"cardTabelCell cardTitle"}>権限</div>
            <div className={"cardTabelCell"}>{authority}</div>
          </div>
        </div>
        <div className={"cardbtn"}>
          <Button 
            type="button"
            variant="contained" 
            color="primary"
            onClick={() => { history.push(`/users/${id}`) }}
          >
            詳細
          </Button>
        </div>
      </div>
  );
}
// 何故かTSが邪魔しているので
UsersCard.propTypes = {
  id: number,
  user_name: string,
  email: string,
  authority: string
}


export default React.memo(UsersCard);
