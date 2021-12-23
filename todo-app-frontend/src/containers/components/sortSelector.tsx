import React, { useEffect, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

interface Props {
  onSortByChange: (sortBy: string) => void;
}
const SortSelector: React.FunctionComponent<Props> = ({ onSortByChange }) => {
  const [sortBy, setSortBy] = useState("end-ascending");

  useEffect(() => {
    if (sortBy) {
      onSortByChange(sortBy);
    }
  }, [sortBy]);

  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
            setSortBy(e.target.value as string)
          }
        >
          <MenuItem value={"end-ascending"}>End date - Ascending</MenuItem>
          <MenuItem value={"end-descending"}>End date - Descending</MenuItem>
          <MenuItem value={"created-ascending"}>
            Created date - Ascending
          </MenuItem>
          <MenuItem value={"created-descending"}>
            Created date - Descending
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortSelector;
