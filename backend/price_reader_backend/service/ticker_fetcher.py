from dataclasses import asdict
from typing import List

from price_reader_backend.model.ticker import Ticker
from price_reader_backend.service.stock_price_fetcher import StockPriceFetcher


class TickerFetcher:
    def __init__(self, symbols: List[str], stock_price_fetcher: StockPriceFetcher = None):
        self.tickers = [Ticker(symbol) for symbol in symbols]
        self.__stock_price_fetcher = stock_price_fetcher or StockPriceFetcher()

    def fetch(self, start_index: int, elements_per_update: int):
        self.__update_price(start_index, elements_per_update)
        return [asdict(ticker) for ticker in self.tickers[start_index: start_index+elements_per_update]]

    def __update_price(self, start_index: int, elements_per_update: int):
        for ticker in self.tickers[start_index: start_index+elements_per_update]:
            ticker.price = self.__stock_price_fetcher.fetch(ticker.symbol)
