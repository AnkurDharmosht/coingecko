import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import axios from "axios";

// defining column name and field name acc to MUI DataGrid
const columns = [
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "image",
    headerName: "Image",
    renderCell: (params) => (
      <img
        src={params.row.image.thumb}
        alt={params.row.image.thumb}
        height="50"
        width="50"
      />
    ),
  },
  {
    field: "symbol",
    headerName: "Symbol",
  },
  {
    field: "hashing_algorithm",
    headerName: "Hashing Algorithm",
  },
  {
    field: "description",
    headerName: "Description",
    valueGetter: (params) => params.row.description.en,
    width: 500,
  },
  {
    field: "market_cap",
    headerName: "Market Cap (EUR)",
    valueGetter: (params) => params.row.market_data.market_cap.eur,
    flex: 0.5,
  },
  {
    field: "homepage",
    headerName: "HomePage",
    renderCell: (params) => (
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          whiteSpace: "normal",
          wordWrap: "break-word",
          width: "150px",
        }}
      >
        {params.row.links.homepage
          // filter out the non - empty links from the array
          .filter((link) => link !== "")
          // map the rest array to display data in the table
          .map((link, i) => {
            return (
              <span key={i}>
                <span style={{ fontWeight: "bold" }}>{i + 1}:</span> {link}
              </span>
            );
          })}
      </span>
    ),
    width: 200,
  },
  {
    field: "genesis_date",
    headerName: "Genesis Date",
  },
];

const CoinDetails = () => {
  const params = useParams();
  const [rows, setRows] = useState([]);
  // hook to validate request on or off...
  const [request, setRequest] = useState(false);

  // async await request to make API call using Axios
  async function getCoinDetails() {
    setRequest(true);
    try {
      setRequest(true);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params && params.id}`
      );
      setRequest(false);
      setRows([response.data]);
    } catch (error) {
      setRequest(false);
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
  // api call in useffect when the page laods
  useEffect(() => {
    if (params && params.id) getCoinDetails();
    else {
    }
    return () => {};
  }, [params]);

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={1}
        loading={request}
        getRowHeight={() => "auto"}
        sx={{
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
        rowsPerPageOptions={[1]}
        checkboxSelection={false}
        disableSelectionOnClick
        onRowClick={(row) => {}}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};
export default CoinDetails;
