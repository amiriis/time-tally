import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const FilterMonth = ({ filterMonth, setFilterMonth }) => {
    return (
        <Box sx={{ flex: 1 }}>
            <FormControl size="small" fullWidth variant="outlined" margin="normal">
                <InputLabel id="month-filter-label" sx={{ fontSize: 13 }}>
                    Filter by month
                </InputLabel>
                <Select
                    labelId="month-filter-label"
                    id="month-filter"
                    label="Filter by month"
                    size="small"
                    value={filterMonth}
                    onChange={(e) => setFilterMonth(e.target.value)}
                    defaultValue="all"
                    sx={{ fontSize: 13 }}
                >
                    <MenuItem value="current" sx={{ fontSize: 13 }}>
                        This Month
                    </MenuItem>
                    <MenuItem value="last" sx={{ fontSize: 13 }}>
                        Last Month
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default FilterMonth;
