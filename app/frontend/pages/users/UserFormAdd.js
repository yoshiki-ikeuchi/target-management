import { any } from "prop-types";
import React, { useReducer, useState } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import TextControl from "../../components/form/TextControl";
import axios from "axios";
import {getErrorCondition, getErroMessage} from "../../common/error"
import Button from "@material-ui/core/Button";

import SelectControl from "../../components/form/SelectControl";

// user initialState
const initialState = {
  login_id: "",
  password: "",
  user_name: "",
  email: "",
  authority: "",
  errors: {}
}

const reducer = (state, action) => {
  console.log(action);
  switch(action.type) {
    case "CONFIRM":
      return {...state,
        errors: action.payload,
      };
    case "ERROR_CLEAR":
      return {...state,
        errors: {},
      };
  }
  return state;
}

const UserFormAdd = (props) => {
  const {control, handleSubmit} = useForm();
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const [pageMode, setPageMode] = useState(props.pageMode);
  const readOnly = pageMode !== "confirm" ? false : true;

  // user 入力チェック
  const doConfirm = async (data) => {
    const url = `/api/users/createConfirm`;
    const userJSON = `{"user": ${JSON.stringify(data)}, "mode": "edit"}`
    console.log(JSON.stringify(data));
    await axios.post(url, JSON.parse(userJSON))
    .then(
      () => {
        dispatch({type: 'ERROR_CLEAR'})
        setPageMode("confirm");
      }
    ).catch(
      (error) => {
        if (error.response.status === 400) {
          const errors = error.response.data;

          console.log(errors);
          dispatch({type: 'CONFIRM', payload: errors})
        }
        else if (error.response.status === 404) {
          alert("該当ユーザが存在しないよ。");
          history.push("/users/new");
        } else {
          history.push('/');
        }
      }
    );
  }

  // user 登録更新
  const doPost = async (data) => {
    const url = `/api/users/create`;
    const userJSON = `{"user": ${JSON.stringify(data)}, "mode": "edit"}`

    await axios.post(url, JSON.parse(userJSON))
    .then(
      () => {
        alert("登録処理が完了。");
        history.push("/users");
      }
    ).catch(
      (error) => {
        if (error.response.status === 400) {
          alert("登録に失敗。");
        } else {
          alert("サーバーエラーです。");
        }
      }
    );
  }

  const backButton = (
  <Button 
      type="button"
      variant="contained" 
      color="primary"
      onClick={() => { 
        setPageMode("edit");
        history.push("/users/new/edit");
      }}
    >戻る</Button>
  );

  const authorityOptions = [
    {value: "", text: "　"},
    {value: "administrator", text: "administrator"},
    {value: "member", text: "member"}
  ];

  const adminSelect = (  
    <SelectControl
      control={control}
      name="authority"
      label="権限"
      options={authorityOptions}
      defaultValue={state.authority}
      error={getErrorCondition(state.errors, "authority")}
      helperText={getErroMessage(state.errors, "authority")}
    />
  );

  const adminText = (
    <TextControl
      control={control}
      name="authority"
      label="権限"
      value={state.authority}
      readOnly={true}
      error={getErrorCondition(state.errors, "authority")}
      helperText={getErroMessage(state.errors, "authority")}            
    />
  );

  const TextControlParam = [
    {name: "user_name", label: "ユーザ名", value: state.user_name},
    {name: "email", label: "メールアドレス", value: state.email},
    {name: "login_id", label: "ログインID", value: state.login_id},
    {name: "password", label: "パスワード", value: state.password}
  ]

  return (
    <main>
      <h1>ユーザー新規登録</h1>
      <form onSubmit={handleSubmit(pageMode === "confirm" ? doPost : doConfirm)}>
      {
        TextControlParam.map((param, key) => (
          <div style={{marginTop:10}} key={key}>
          <TextControl
            control={control}
            name={param.name}
            label={param.label}
            value={param.value}
            readOnly={readOnly}
            error={getErrorCondition(state.errors, param.name)}
            helperText={getErroMessage(state.errors, param.name)}            
          />
          </div>
        ))
      }
        <div style={{marginTop:10}}>
        {pageMode === "confirm" ? adminText : adminSelect}
        </div>
        <div style={{marginTop:10}}>
        {pageMode === "confirm" ? backButton : ""}
        <Button 
          type="submit"
          variant="contained" 
          color={pageMode === "confirm" ? "secondary" : "primary"}
        >
          {pageMode === "confirm" ? "登録" : "確認"}
        </Button>
        </div>
      </form>
    </main>
  );
}

// 何故かTSが邪魔しているので
UserFormAdd.propTypes = {
  pageMode: any,
  location: any,
  field: any
}

export default React.memo(UserFormAdd);
