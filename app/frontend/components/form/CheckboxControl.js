import React from "react";
import { Controller } from "react-hook-form";
import { any, bool, string } from "prop-types";

import { FormControlLabel, Checkbox } from "@material-ui/core";

const CheckboxControl = (props) => {
  const name = props.name;
  const control = props.control;
  const label = props.label;
  const readOnly = props.readOnly;
  const defaultValue = props.defaultValue;

  return (
     <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={
          // eslint-disable-next-line react/display-name
          ({ field: { value, onChange } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  onChange={onChange}
                />
              }
              label={label}
              disabled={readOnly}
            />
          )
        }
      />
  );
}
// 何故かTSが邪魔しているので
CheckboxControl.propTypes = {
  name: string,
  control: any,
  label: string,
  readOnly: bool,
  defaultValue: bool,
  field: any
};

export default React.memo(CheckboxControl);
