# FoodApp Backend

## Prerequisites

- Install python
- Install pip
- Install virtualenv via pip

## Run Linux/OS X

```sh
virtualenv venv
. venv/bin/activate
pip3 install -e .
docker compose up -d
python3 app.py
```

## Run windows

```sh
python -m venv .venv
.venv\Scripts\activate.bat
pip install -e .
docker compose up -d
python app.py
```
