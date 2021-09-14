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

// material-ui の makeStyles を使ってみる
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  mt10: {
    marginTop: 10
  },
  mb10: {
    marginBottom: 10
  },
  ml10: {
    marginLeft: 10
  },
  left: {
    display:"inline-block",
    marginLeft: 20
  },
});

// initialState
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
  const {control, handleSubmit, reset} = useForm();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pageMode, setPageMode] = useState(props.pageMode);
  const history = useHistory();
  const readOnly = pageMode !== "confirm" ? false : true;

  // スタイル有効化
  const classes = useStyles();

  // 入力チェック
  const doConfirm = async (data) => {
    const url = `/api/carsCreate/createConfirm`;
    const userJSON = `{"carData": ${JSON.stringify(data)}}`
    await axios.post(url, JSON.parse(userJSON))
    .then(
      () => {
        setPageMode("confirm");
        dispatch({type: 'ERROR_CLEAR'})
      }
    ).catch(
      (error) => {
        if (error.response.status === 400) {
          const errors = error.response.data;
          dispatch({type: 'CONFIRM', payload: errors})
        } else {
          history.push('/');
        }
      }
    );
  }

  // 登録
  const doPost = async (data) => {
    const url = `/api/carsCreate/create`;
    const userJSON = `{"carData": ${JSON.stringify(data)}}`
    await axios.post(url, JSON.parse(userJSON))
    .then(
      () => {
        setPageMode("complate");
      }
    ).catch(
      (error) => {
        if (error.response.status === 400) {
          const errors = error.response.data;
          dispatch({type: 'CONFIRM', payload: errors})
        } else {
          history.push('/');
        }
      }
    );
  }

  // メニューに戻るボタン
  const menuBtn = (
    <Button
      variant="contained"
      color="primary"
      href="/menu"
    >
      メニューに戻る
    </Button>
  );

  // 入力画面に戻るボタン
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
  
  // 入力・確認画面
  const formContents = (
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
          <div className={classes.mt10}>
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
          <div className={classes.mt10}>
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
          <div className={classes.mt10}>
            <TextControl
              control={control}
              name="bodyColor"
              label="ボディカラー"
              value={state.bodyColor}
              readOnly={readOnly}
              error={getErrorCondition(state.errors, "bodyColor")}
              helperText={getErroMessage(state.errors, "bodyColor")}
            />
          </div>
        </div>
        <div className={classes.left}>
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
          <div className={`${classes.mt10} ${classes.mb10}`}>
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
            <span className={classes.ml10}>
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
  );

  // 完了画面
  // pageModeを入力にして、form内をリセットする
  // resetはreact-hook-formの機能で、フォームリセット
  const complateContents = (
    <div>
      <div style={{marginBottom: 10}}>登録処理が完了しました。</div>
      <Button 
        type="button"
        variant="contained" 
        color="primary"
        onClick={() => { 
          setPageMode("edit");
          reset();
        }}
      >登録画面に戻る</Button>
    </div>
  );

  return (
    <main>
      <h1>{pageMode !== "complate" ? "車両登録" : ""}</h1>
      {pageMode !== "complate" ? formContents : complateContents}
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
