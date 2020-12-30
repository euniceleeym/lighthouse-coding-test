import React from "react";

import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import { Cell } from "react-table";

import LatestStockPriceTable from "./LatestStockPriceTable";
import UpdateFrequencyTextField from "./UpdateFrequencyField";
import { symbols } from "../../constant/symbols";
import { backendServerUrl } from "../../constant/server";

const priceUpStyle = { color: "green" } as React.CSSProperties;
const priceDownStyle = { color: "red" } as React.CSSProperties;

const isPriceUp = (symbol: string, price: number): boolean | undefined => {
  if (!(symbol in symbols)) {
    return undefined;
  } else {
    return symbols[symbol] < price;
  }
};

function LatestStockPricePage() {
  var evtSource = React.useRef<EventSource | null>(null);
  const [updateFrequency, setUpdateFrequency] = React.useState<
    number | undefined
  >();
  const [data, setData] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    evtSource.current?.close();
    evtSource.current = new EventSource(
      backendServerUrl +
        "/stream" +
        (updateFrequency
          ? "?update_frequency=" + updateFrequency!.toString()
          : "")
    );
    evtSource.current.addEventListener("message", (message) => {
      setData(
        JSON.parse(message.data).sort(
          (
            d1: { [symbol: string]: number },
            d2: { [symbol: string]: number }
          ) => d1.symbol > d2.symbol
        )
      );
    });
    evtSource.current.addEventListener("error", (error) => {
      evtSource.current?.close();
      alert("Connection error. Please try again in a while.");
    });
  }, [updateFrequency]);

  const handleUpdateFrequencyChange = (updateFrequency: number) => {
    evtSource.current?.close();
    setUpdateFrequency(updateFrequency);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Symbol",
        accessor: "symbol",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: (cell: Cell) => {
          const showPriceUp = isPriceUp(cell.row.values.symbol, cell.value);
          if (showPriceUp) {
            return (
              <span style={priceUpStyle}>
                <ArrowDropUpIcon style={priceUpStyle} fontSize="small" />
                {cell.value}
              </span>
            );
          } else if (showPriceUp === false) {
            return (
              <span style={priceDownStyle}>
                <ArrowDropDownIcon style={priceDownStyle} fontSize="small" />
                {cell.value}
              </span>
            );
          } else {
            return cell.value;
          }
        },
      },
    ],
    []
  );

  return (
    <Box p={1} m={1}>
      <CssBaseline />
      <Box p={1} m={1}>
        <h1>LIVE Stock Price</h1>
      </Box>
      <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
        <UpdateFrequencyTextField
          onChange={(updateFrequency) => {
            handleUpdateFrequencyChange(updateFrequency);
          }}
        />
      </Box>

      <LatestStockPriceTable columns={columns} data={data} />
    </Box>
  );
}

export default LatestStockPricePage;
