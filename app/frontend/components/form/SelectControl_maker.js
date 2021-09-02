import React from "react";
import { Controller } from "react-hook-form";
import { any, bool, string } from "prop-types";

import { InputLabel, FormControl, FormHelperText, Select, MenuItem } from "@material-ui/core";

const SelectControl_maker = (props) => {
  const control = props.control;
  const defaultValue = props.defaultValue;
  const readOnly = props.readOnly;
  const error = props.error;
  const helperText = props.helperText;
  
  const options = [
    "",
    "トヨタ",
    "日産",
    "ホンダ",
    "三菱",
    "マツダ",
    "スバル",
    "スズキ",
    "ダイハツ"
  ];
  
  return (
    <FormControl
      error={error}
      style={{minWidth:220}}
      disabled={readOnly}
    >        
      <InputLabel id="demo-simple-select-label">メーカー</InputLabel>
      <Controller
        render={
          // eslint-disable-next-line react/display-name
          ({ field }) => <Select {...field}>
            {
              options.map((option, key) => (
                <MenuItem key={key} value={option}>{option != "" ? option : "　"}</MenuItem>
              ))
            }
          </Select>
        }
        control={control}
        name="maker"
        defaultValue={defaultValue}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
// 何故かTSが邪魔しているので
SelectControl_maker.propTypes = {
  control: any,
  defaultValue: string,
  helperText: string,
  error: bool,
  field: any
};

export default React.memo(SelectControl_maker);
