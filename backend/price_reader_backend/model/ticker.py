from dataclasses import dataclass


@dataclass
class Ticker:
    symbol: str
    price: int = 0
