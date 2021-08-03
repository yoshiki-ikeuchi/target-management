import React from "react";
import { Controller } from "react-hook-form";
import { any, bool, string, array } from "prop-types";

import { InputLabel, FormControl, FormHelperText, Select, MenuItem } from "@material-ui/core";

const SelectControl = (props) => {
  const name = props.name;
  const control = props.control;
  const label = props.label;
  const options = props.options;
  const defaultValue = props.defaultValue;
  const error = props.error;
  const helperText = props.helperText;

  /*
  * RHF(React Hook Form)のControllerコンポーネント(wapper)
  * RHFサンプルページにあったものをMaterial UI公式ページの内容を参考にカスタマイズ
  * MenuItem に key をつけているが、これはWarning対策（ユニークな識別IDをつけろと怒られる）
  * eslint-disable-next-line react/display-name は eslintのエラーを黙殺するおまじない
  * つけないと、無名関数やめろと怒られる。これはRHFサンプルページから持ってきたものなので黙殺する。
  */
  return (
    <FormControl
      error={error}
      style={{minWidth:150}}
    >        
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Controller
        render={
          // eslint-disable-next-line react/display-name
          ({ field }) => <Select {...field}>
            {
              options.map((option, key) => (
                <MenuItem key={key} value={option.value}>{option.text}</MenuItem>
              ))
            }
          </Select>
        }
        control={control}
        name={name}
        defaultValue={defaultValue}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
// 何故かTSが邪魔しているので
SelectControl.propTypes = {
  name: string,
  control: any,
  label: string,
  options: array,
  defaultValue: string,
  helperText: string,
  error: bool,
  field: any
};

export default React.memo(SelectControl);
