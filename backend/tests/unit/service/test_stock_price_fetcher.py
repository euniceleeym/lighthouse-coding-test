from unittest.mock import patch

from faker import Faker

from price_reader_backend.service.stock_price_fetcher import StockPriceFetcher


fake = Faker()

class TestStockPriceFetcher:
    @staticmethod
    @patch('price_reader_backend.service.stock_price_fetcher.random')
    def test_fetch(random):
        StockPriceFetcher().fetch(fake.pystr())
        random.randint.assert_called_once()
