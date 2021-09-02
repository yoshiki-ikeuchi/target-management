import { any } from "prop-types";
import React from "react"

import CarsCard from "../../pages/cars/card/CarsCard";

const CarsList = (props) => {
  const carsList = props.cars;

  return (
    <div style={{marginBottom:10}}>
      {
        carsList.map((car, idx) => (
          <div key={idx}>
            <CarsCard 
              carId={car.carId}
              maker={car.maker}
              model={car.model}
              grade={car.grade}
              price={car.price}
              navi={car.navi}
              kawa={car.kawa}
              sr={car.sr}
            />
          </div>
        ))
      }
      <div style={{clear:"both"}}></div>
    </div>
  );
}
// 何故かTSが邪魔しているので
CarsList.propTypes = {
  cars: any
}


export default React.memo(CarsList);
