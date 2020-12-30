from unittest.mock import Mock

from faker import Faker
from pytest import fixture, mark

from price_reader_backend.service.ticker_fetcher import TickerFetcher


fake = Faker()


@fixture
def symbols():
    return fake.pylist(nb_elements=55, variable_nb_elements=False, value_types='str')


@fixture
def stock_price_fetcher():
    return Mock(spec=['fetch'])


class TestTickerFetcher:
    @staticmethod
    @mark.parametrize('start_index, elements_per_update, expected_num_of_stock_price_fetch', [
        (0, 10, 10),
        (10, 10, 10),
        (50, 10, 5)
    ])
    def test_fetch(symbols, stock_price_fetcher, start_index, elements_per_update,
                   expected_num_of_stock_price_fetch):

        ticker_fetcher = TickerFetcher(symbols, stock_price_fetcher)
        result = ticker_fetcher.fetch(start_index, elements_per_update)

        assert stock_price_fetcher.fetch.call_count == expected_num_of_stock_price_fetch
        assert len(result) == expected_num_of_stock_price_fetch
