import { bool, number, string } from "prop-types";
import React from "react"

// styled-components で css in js やってみる
import styled from 'styled-components';

// 要素のコンポーネントを作ってみます
const CardOuterFrame = styled.div`
  width: 340px;
  border: 1px solid gray;
  border-radius: 4px;
  float: left;
  margin-right: 10px;
  margin-top: 10px;
  position: relative;
`;

const CardTabel = styled.div`
  display: table;
`;

const CardTabelRow = styled.div`
  display: table-row;
`;

// パラメータをもらって、文字の色を出し分け
const CardTabelCell = styled.div`
  display: table-cell;
  padding: 5px;
  color: ${(props) => (props.price ? "red" : "black")};
`;

// cardTabelCell のstyleを継承
// パラメータを受け取って、タイトル部分の色を変更
const CardTitle = styled(CardTabelCell)`
  width: 96px;
  background-color: ${(props) => props.bc};
`;

// 初期値設定
CardTitle.defaultProps = {
  bc: "#fceeeb",
}

// 更新ボタン
const UpdateBtn = styled.a.attrs(props => {
  return{
    href: `/carsUpdate/${props.carId}`,
    target: '_self'
  }
})`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px 15px;
  border-radius: 5px;
  background-color: #007bbb;
  color: white;
  text-decoration: none;
`;

// コンポーネント作成ここまで

const CarsCard = (props) => {
  const carId = props.carId;
  const maker = props.maker;
  const model = props.model;
  const grade = props.grade;
  const bodyColor = props.bodyColor;
  const price = props.price;
  const publicFlg = props.publicFlg;
  const navi = props.navi;
  const kawa = props.kawa;
  const sr = props.sr;
  const authority = props.authority;
//  const history = useHistory();

  const publicCell = (
    <CardTabelRow>
      <CardTitle>公開フラグ</CardTitle>
      <CardTabelCell>{publicFlg == "1" ? "公開" : "非公開"}</CardTabelCell>
    </CardTabelRow>
  );

  const updateBtn = (
    <UpdateBtn carId={carId}>
      更新
    </UpdateBtn>
  );

  return (
      <CardOuterFrame>
        {authority ? updateBtn : ""}
        <CardTabel>
          <CardTabelRow>
            <CardTitle>車種ID</CardTitle>
            <CardTabelCell>{carId}</CardTabelCell>
          </CardTabelRow>
          <CardTabelRow>
            <CardTitle>メーカー名</CardTitle>
            <CardTabelCell>{maker}</CardTabelCell>
          </CardTabelRow>
          <CardTabelRow>
            <CardTitle>車種名</CardTitle>
            <CardTabelCell>{model}</CardTabelCell>
          </CardTabelRow>
          <CardTabelRow>
            <CardTitle>グレード</CardTitle>
            <CardTabelCell>{grade}</CardTabelCell>
          </CardTabelRow>
          <CardTabelRow>
            <CardTitle>ボディカラー</CardTitle>
            <CardTabelCell>{bodyColor}</CardTabelCell>
          </CardTabelRow>
          <CardTabelRow>
            <CardTitle>価格</CardTitle>
            <CardTabelCell price>￥{price}</CardTabelCell>
          </CardTabelRow>
          {authority ? publicCell : ""}
          <CardTabelRow>
            <CardTitle bc="#a0d8ef">装備</CardTitle>
            <CardTabelCell>{navi == "1" ? "ナビ " : ""}{kawa == "1" ? "革 " : ""}{sr == "1" ? "サンルーフ" : ""}</CardTabelCell>
          </CardTabelRow>
        </CardTabel>
      </CardOuterFrame>
  );
}

// 何故かTSが邪魔しているので
CarsCard.propTypes = {
  carId: number,
  maker: string,
  model: string,
  grade: string,
  bodyColor: string,
  price: number,
  publicFlg: string,
  navi: string,
  kawa: string,
  sr: string,
  authority: bool,
}

export default React.memo(CarsCard);
