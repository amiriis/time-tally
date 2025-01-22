import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterMonth = ({ filterMonth, setFilterMonth }) => {
    return (
        <Box sx={{ flex: 1 }}>
            <FormControl size="small" fullWidth variant="outlined" margin="normal">
                <InputLabel id="month-filter-label">Filter by month</InputLabel>
                <Select
                    labelId="month-filter-label"
                    id="month-filter"
                    label="Filter by month"
                    value={filterMonth}
                    onChange={(e) => setFilterMonth(e.target.value)}
                    defaultValue="all"
                >
                    <MenuItem value="current">This Month</MenuItem>
                    <MenuItem value="last">Last Month</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default FilterMonth;
