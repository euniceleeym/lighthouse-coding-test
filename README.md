# server_sent_event_sample

## Backend

### How to start backend service

```
cd server_sent_event_sample
python -m virtuelenv venv
source venv/bin/activate
cd backend
python run.py
```

The backend server is now hosted at `http://127.0.0.1:5000`

### How to run unit test

```
pytest
```

## Frontend

### How to start backend service

```
cd server_sent_event_sample/frontend/price_reader_frontend
npm install
npm start
```

The backend server is now hosted at `http://127.0.0.1:3000`

## Trouble shooting

1. Frontend keeps having connection issues with backend server

   Make sure the backend server is on. Also check that you are browsing `http://127.0.0.1:3000` on your browser.
