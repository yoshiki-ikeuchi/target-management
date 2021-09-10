import { any } from "prop-types";
import React, { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router";
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
});

// initialState
const initialState = {
  carsData: {},
  errors: {}
}

const reducer = (state, action) => {
  switch(action.type) {
    case "GET_CARDATA":
      return {...state,
        carsData: action.carsData,
      };
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

const carsUpdate = (props) => {
  const {id} = useParams();
  const {control, handleSubmit} = useForm();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pageMode, setPageMode] = useState(props.pageMode);
  const history = useHistory();
  const readOnly = pageMode !== "confirm" ? false : true;

  // スタイル有効化
  const classes = useStyles();

  // 車両データ取得
  const getCarData = async () => {
    const url = `/api/carsUpdate/${id}`;
    await axios.post(url).then(
      (response) => {
        const carData = response.data.carData;
        dispatch ({type: 'GET_CARDATA', carsData: carData})
      }
    ).catch (
      (error) => {
        if (error.response.status === 404 ) {
          history.push("/cars");
        } else {
          history.push('/');
        }
      }
    )
  }

  useEffect(() => {
    getCarData(id);
  }, []);

  // 入力チェック
  const doConfirm = async (data) => {
    const url = `/api/carsUpdate/${id}/updateConfirm`;
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
    const url = `/api/carsUpdate/${id}/update`;
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

  // 検索画面に戻るボタン
  const carsBtn = (
    <Button
      variant="contained"
      color="primary"
      href="/cars"
    >
      検索画面に戻る
    </Button>
  );
  
  // 入力・確認画面
  const formContents = (
      <form onSubmit={handleSubmit(pageMode === "confirm" ? doPost : doConfirm)}>
        <div style={{display: "inline-block"}}>
          <div>
            <SelectControlMaker
              control={control}
              defaultValue={state.carsData.maker}
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
              value={state.carsData.model}
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
              value={state.carsData.grade}
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
              value={state.carsData.bodyColor}
              readOnly={readOnly}
              error={getErrorCondition(state.errors, "bodyColor")}
              helperText={getErroMessage(state.errors, "bodyColor")}
            />
          </div>
        </div>
        <div style={{display:"inline-block", marginLeft: 20}}>
          <div>
              <TextControl
                control={control}
                name="price"
                label="価格"
                value={state.carsData.price}
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
              defaultValue={state.carsData.navi == "1"}
            />
            <CheckboxControl
              name="kawa"
              control={control}
              label="革"
              readOnly={readOnly}
              defaultValue={state.carsData.kawa == "1"}
            />
            <CheckboxControl
              name="sr"
              control={control}
              label="サンルーフ"
              readOnly={readOnly}
              defaultValue={state.carsData.sr == "1"}
            />
          </div>
          <div className={`${classes.mb10}`}>
            <CheckboxControl
              name="publicFlg"
              control={control}
              label="公開フラグ"
              readOnly={readOnly}
              defaultValue={state.carsData.publicFlg == "1"}
            />
          </div>
          <div>
            {carsBtn}
            <span className={classes.ml10}>
              <Button 
                type="submit"
                variant="contained" 
                color={pageMode === "confirm" ? "secondary" : "primary"}
              >
                {pageMode === "confirm" ? "登録" : "確認"}
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
      <div style={{marginBottom: 10}}>更新処理が完了しました。</div>
      {carsBtn}
    </div>
  );

  // 初期レンダリング時はデータが取れていないので
  // RHFの関係上、空レンダリングする
  if (state.carsData.carId === undefined){
    return <></>;
  }

  return (
    <main>
      <h1>{pageMode !== "complate" ? "車両更新" : ""}</h1>
      {pageMode !== "complate" ? formContents : complateContents}
    </main>
  );
}

// 何故かTSが邪魔しているので
carsUpdate.propTypes = {
  pageMode: any,
  location: any,
  field: any
}

export default React.memo(carsUpdate);
