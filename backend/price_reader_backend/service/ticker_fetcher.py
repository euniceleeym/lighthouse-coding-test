from dataclasses import asdict
from typing import List

from price_reader_backend.model.ticker import Ticker
from price_reader_backend.service.stock_price_fetcher import StockPriceFetcher


class TickerFetcher:
    def __init__(self, symbols: List[str], stock_price_fetcher: StockPriceFetcher = None):
        self.symbols = symbols
        self.__stock_price_fetcher = stock_price_fetcher or StockPriceFetcher()

    def fetch(self, elements_per_update):
        return [asdict(Ticker(symbol, self.__stock_price_fetcher.fetch(symbol)))
                for symbol in self.symbols[: elements_per_update]]
