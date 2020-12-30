import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import { Cell } from "react-table";

import LatestStockPriceTable from "./LatestStockPriceTable";
import { symbols } from "../../constant/symbols";

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

  const data = React.useMemo(
    () => [
      { symbol: "AAAA", price: 123 },
      { symbol: "BBBB", price: 4560 },
      { symbol: "CCCC", price: 1230 },
      { symbol: "DDDD", price: 456 },
      { symbol: "ZZZZ", price: 123 },
    ],
    []
  );

  return (
    <div>
      <CssBaseline />
      <LatestStockPriceTable columns={columns} data={data} />
    </div>
  );
}

export default LatestStockPricePage;
