import json
import threading
from math import ceil
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

        total_number_of_pages = ceil(len(symbols)/elements_per_update)
        current_page = 0
        while not event.wait(update_frequency/1000):
            start_index = current_page*elements_per_update
            result = ticker_fetcher.fetch(start_index, elements_per_update)
            json_result = json.dumps(result)

            current_page = current_page + 1 if current_page + 1 < total_number_of_pages else 0

            yield f"data: {json_result}\n\n"

    update_frequency_milliseconds = request.args.get('update_frequency',
                                                     default=UPDATE_FREQUENCY_MILLISECONDS,
                                                     type=int)
    symbols = SYMBOLS
    elements_per_update = ELEMENTS_PER_UPDATE
    return Response(start_streaming(update_frequency_milliseconds, symbols, elements_per_update),
                    mimetype="text/event-stream")
