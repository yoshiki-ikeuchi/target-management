import { number, string } from "prop-types";
import React from "react"
import "../css/CarList.css";

const CarsCard = (props) => {
  const carId = props.carId;
  const maker = props.maker;
  const model = props.model;
  const grade = props.grade;
  const price = props.price;
  const navi = props.navi;
  const kawa = props.kawa;
  const sr = props.sr;
//  const history = useHistory();

  return (
      <div className={"cardOuterFrame"}>
        <div className={"cardTabel"}>
          <div className={"cardTabelRow"}>
            <div className={"cardTabelCell cardTitle"}>車種ID</div>
            <div className={"cardTabelCell"}>{carId}</div>
          </div>
          <div className={"cardTabelRow"}>
            <div className={"cardTabelCell cardTitle"}>メーカー名</div>
            <div className={"cardTabelCell"}>{maker}</div>
          </div>
          <div className={"cardTabelRow"}>
            <div className={"cardTabelCell cardTitle"}>車種名</div>
            <div className={"cardTabelCell"}>{model}</div>
          </div>
          <div className={"cardTabelRow"}>
            <div className={"cardTabelCell cardTitle"}>グレード</div>
            <div className={"cardTabelCell"}>{grade}</div>
          </div>
          <div className={"cardTabelRow"}>
            <div className={"cardTabelCell cardTitle"}>価格</div>
            <div className={"cardTabelCell"}>￥{price}</div>
          </div>
          <div className={"cardTabelRow"}>
            <div className={"cardTabelCell cardTitle"}>装備</div>
            <div className={"cardTabelCell"}>{navi == "1" ? "ナビ " : ""}{kawa == "1" ? "革 " : ""}{sr == "1" ? "サンルーフ" : ""}</div>
          </div>
        </div>
      </div>
  );
}
// 何故かTSが邪魔しているので
CarsCard.propTypes = {
  carId: number,
  maker: string,
  model: string,
  grade: string,
  price: number,
  navi: string,
  kawa: string,
  sr: string
}


export default React.memo(CarsCard);
