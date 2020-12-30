import json
import threading
from typing import List

from flask import Flask, Response, render_template, request

from config import ELEMENTS_PER_UPDATE, SYMBOLS, UPDATE_FREQUENCY_MILLISECONDS
from price_reader_backend.service.ticker_fetcher import TickerFetcher

app = Flask(__name__)


@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = 'http://127.0.0.1:3000'
    return response


@app.route('/stream')
def stream():
    def start_streaming(update_frequency: int, symbols: List[str], elements_per_update: int):
        ticker_fetcher = TickerFetcher(symbols)
        event = threading.Event()
        while not event.wait(update_frequency/1000):
            yield f"data: {json.dumps(ticker_fetcher.fetch(elements_per_update))}\n\n"

    update_frequency_milliseconds = request.args.get('update_frequency',
                                                     default=UPDATE_FREQUENCY_MILLISECONDS,
                                                     type=int)
    symbols = SYMBOLS
    elements_per_update = ELEMENTS_PER_UPDATE
    return Response(start_streaming(update_frequency_milliseconds, symbols, elements_per_update),
                    mimetype="text/event-stream")
