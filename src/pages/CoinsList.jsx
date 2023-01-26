import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [rows, setRows] = useState([]);
  // hook to validate request on or off...
  const [request, setRequest] = useState(false);
  // for navigating the page on click of row
  const navigate = useNavigate();

  // async await request to make API call using Axios
  async function getCoinList() {
    setRequest(true);
    try {
      setRequest(true);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=100&page=1"
      );
      setRequest(false);
      setRows(response.data);
    } catch (error) {
      if (error.response) {
        //response status is an error code
        console.log(error.response.status);
      } else if (error.request) {
        //response not received though the request was sent
        console.log(error.request);
      } else {
        //an error occurred when setting up the request
        console.log(error.message);
      }
    }
  }

  // api call in useffect when the page laods initially
  useEffect(() => {
    getCoinList();
    return () => {};
  }, []);

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        loading={request}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick
        onRowClick={(row) => {
          navigate(`/coin/${row.id}`);
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};
export default CoinsList;
