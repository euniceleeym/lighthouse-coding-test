import random


class StockPriceFetcher:
    def fetch(self, symbol: str):
        return random.randint(0, 10000)
