import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import LatestStockPriceTable from "./LatestStockPriceTable";

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
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      { symbol: "aaa", price: 123 },
      { symbol: "bbb", price: 456 },
      { symbol: "aaa", price: 123 },
      { symbol: "bbb", price: 456 },
      { symbol: "aaa", price: 123 },
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
