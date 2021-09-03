import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { any } from "prop-types";
import axios from "axios";
import CarsList from "./CarsList";
import { useHistory } from "react-router";

import SelectControlMaker from "../../components/form/SelectControl_maker";
import CheckboxControl from "../../components/form/CheckboxControl";
import TextControl from "../../components/form/TextControl";

const Cars = () => {
  const {control, handleSubmit} = useForm();
  const [carsResult, setCarsResult] = useState([]);
  const [searchResult, setSearchResult] = useState('');
  const history = useHistory();

  const doSearch = async (data) => {
    
    const url = "/api/cars";
    const searchJSON = `{"params": ${JSON.stringify(data)}}`
    
    await axios.get(url, JSON.parse(searchJSON))
    .then(
      (response) => {
        setCarsResult(response.data.cars);
      }
    ).catch(
      (error) => {
        if (error.response.status === 404 ) {
          // エラーメッセージを取得
          setSearchResult("検索結果が見つかりませんでした。orz");
          setCarsResult([]);
        } else {
          // その他はサーバサイドエラーとしてしまう。
          history.push('/');
        }
      }
    );
  }

  // 検索項目などはいっぱいあったりするかもなので
  // formでまとめてやる(React Hook Form)
  return (
    <main>
      <h1>車両検索</h1>
      <form onSubmit={handleSubmit(doSearch)}>
        <div style={{display: "inline-block"}}>
          <div>
            <SelectControlMaker
              control={control}
              defaultValue=""
              error={false}
              helperText=""
            />
          </div>
          <div style={{marginTop:10}}>
            <TextControl
              control={control}
              name="model"
              label="車種"
              value=""
              readOnly={false}
            />
          </div>
          <div style={{marginTop:10}}>
            <TextControl
              control={control}
              name="grade"
              label="グレード"
              value=""
              readOnly={false}
            />
          </div>
          <div style={{marginTop:10}}>
            <TextControl
              control={control}
              name="bodyColor"
              label="ボディカラー"
              value=""
              readOnly={false}
            />
          </div>
        </div>
        <div style={{display:"inline-block", marginLeft: 20}}>
          <div>
            <span style={{verticalAlign: "middle", display:"inline-block"}}>
              <TextControl
                control={control}
                name="price_bottom"
                label="価格下限"
                value=""
                readOnly={false}
              />
            </span>
            <span style={{marginLeft:10, marginRight:10, verticalAlign: "middle"}}>～</span>
            <span style={{verticalAlign: "middle", display:"inline-block"}}>
              <TextControl
                control={control}
                name="price_top"
                label="価格上限"
                value=""
                readOnly={false}
              />
            </span>
          </div>
          <div style={{marginTop: 10, marginBottom: 10}}>
            <CheckboxControl
              name="navi"
              control={control}
              label="ナビ"
              defaultValue={false}
            />
            <CheckboxControl
              name="kawa"
              control={control}
              label="革"
              defaultValue={false}
            />
            <CheckboxControl
              name="sr"
              control={control}
              label="サンルーフ"
              defaultValue={false}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              href="/menu"
            >
              メニューに戻る
            </Button>
            <span style={{marginLeft:10}}>
              <Button 
                type="submit"
                variant="contained" 
                color="primary"
              >
                検索
              </Button>
            </span>
          </div>
        </div>
      </form>
      <br/>
      {
        carsResult.length === 0 ?
        <div>{searchResult}</div>
        :
        <CarsList cars={carsResult} />
      }
    </main>
  );
}
// 何故かTSが邪魔しているので
Cars.propTypes = {
  field: any,
  fieldState: any
}

export default React.memo(Cars);
