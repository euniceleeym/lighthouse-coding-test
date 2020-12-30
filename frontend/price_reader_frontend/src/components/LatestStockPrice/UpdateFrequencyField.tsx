import React from "react";

import TextField from "@material-ui/core/TextField";
import { debounce } from "lodash";

interface IProps {
  onChange: (updateFrequency: number) => void;
}

function UpdateFrequencyTextField({ onChange }: IProps) {
  const [error, setError] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updateFrequency = parseInt(event.target.value);
    if (updateFrequency && updateFrequency > 100) {
      setError(false);
      onChange(updateFrequency);
    } else {
      setError(true);
    }
  };

  return (
    <TextField
      id="standard-basic"
      label="Update Frequency"
      error={error}
      helperText="Must be integer larger than 100"
      onChange={debounce(handleChange, 250, { maxWait: 1000 })}
    />
  );
}

export default UpdateFrequencyTextField;
