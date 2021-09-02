import { any } from "prop-types";
import React, { useReducer, useState } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import {getErrorCondition, getErroMessage} from "../../common/error"
import Button from "@material-ui/core/Button";

import SelectControlMaker from "../../components/form/SelectControl_maker";
import CheckboxControl from "../../components/form/CheckboxControl";
import TextControl from "../../components/form/TextControl";

// user initialState
const initialState = {
  maker: "",
  model: "",
  grade: "",
  price: "",
  navi: "",
  kawa: "",
  sr: "",
  errors: {}
}

const reducer = (state, action) => {
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

const carsCreate = (props) => {
  const {control, handleSubmit} = useForm();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pageMode, setPageMode] = useState(props.pageMode);
  const readOnly = pageMode !== "confirm" ? false : true;

  // user 入力チェック
  const doConfirm = async (data) => {
    dispatch({type: 'ERROR_CLEAR'})
    setPageMode("confirm");
  }

  // user 登録更新
  const doPost = async (data) => {
    setPageMode("edit");
    alert(`${JSON.stringify(data)}`);
  }

  const menuBtn = (
    <Button
      variant="contained"
      color="primary"
      href="/menu"
    >
      メニューに戻る
    </Button>
  );

  const backBtn = (
    <Button 
        type="button"
        variant="contained" 
        color="primary"
        onClick={() => { 
          setPageMode("edit");
        }}
      >戻る</Button>
    );

  return (
    <main>
      <h1>車両登録</h1>
      <form onSubmit={handleSubmit(pageMode !== "edit" ? doPost : doConfirm)}>
        <div style={{display: "inline-block"}}>
          <div>
            <SelectControlMaker
              control={control}
              defaultValue={state.maker}
              readOnly={readOnly}
              error={getErrorCondition(state.errors, "maker")}
              helperText={getErroMessage(state.errors, "maker")}
            />
          </div>
          <div style={{marginTop:10}}>
            <TextControl
              control={control}
              name="model"
              label="車種"
              value={state.model}
              readOnly={readOnly}
              error={getErrorCondition(state.errors, "model")}
              helperText={getErroMessage(state.errors, "model")}
            />
          </div>
          <div style={{marginTop:10}}>
            <TextControl
              control={control}
              name="grade"
              label="グレード"
              value={state.grade}
              readOnly={readOnly}
              error={getErrorCondition(state.errors, "grade")}
              helperText={getErroMessage(state.errors, "grade")}
            />
          </div>
        </div>
        <div style={{display:"inline-block", marginLeft: 20}}>
          <div>
              <TextControl
                control={control}
                name="price"
                label="価格"
                value={state.price}
                readOnly={readOnly}
                error={getErrorCondition(state.errors, "price")}
                helperText={getErroMessage(state.errors, "price")}
              />
          </div>
          <div style={{marginTop: 10, marginBottom: 10}}>
            <CheckboxControl
              name="navi"
              control={control}
              label="ナビ"
              readOnly={readOnly}
              defaultValue={state.navi == "true"}
            />
            <CheckboxControl
              name="kawa"
              control={control}
              label="革"
              readOnly={readOnly}
              defaultValue={state.kawa == "true"}
            />
            <CheckboxControl
              name="sr"
              control={control}
              label="サンルーフ"
              readOnly={readOnly}
              defaultValue={state.sr == "true"}
            />
          </div>
          <div>
            {pageMode !== "edit" ? backBtn : menuBtn}
            <span style={{marginLeft:10}}>
              <Button 
                type="submit"
                variant="contained" 
                color={pageMode !== "edit" ? "secondary" : "primary"}
              >
                {pageMode !== "edit" ? "登録" : "確認"}
              </Button>
            </span>
          </div>
        </div>
      </form>
    </main>
  );
}

// 何故かTSが邪魔しているので
carsCreate.propTypes = {
  pageMode: any,
  location: any,
  field: any
}

export default React.memo(carsCreate);
