import React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ApiTable from "../components/ApiTable";

// defining column name and field name acc to MUI DataGrid
const columns = [
  {
    field: "image",
    headerName: "Image",
    renderCell: (params) => (
      <img src={params.value} height="50" alt={params.value} />
    ),
    width: 100,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "symbol",
    headerName: "Symbol",
    width: 200,
  },
  {
    field: "current_price",
    headerName: "Current Price",
    width: 200,
  },
  {
    field: "high_24h",
    headerName: "High 24Hrs Price",
    width: 200,
  },
  {
    field: "low_24h",
    width: 200,
    headerName: "Low 24Hrs Price",
  },
];

const CoinsList = () => {
  // for navigating the page on click of row
  const navigate = useNavigate();

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <ApiTable
        columns={columns}
        apiEndPoint="markets"
        params="vs_currency=EUR&order=market_cap_desc"
        page={1}
        perPage={100}
        onRowClick={(row) => {
          navigate(`/coin/${row.id}`);
        }}
      />
    </Box>
  );
};
export default CoinsList;
