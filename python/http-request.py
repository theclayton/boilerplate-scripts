#!/usr/bin/env python3
"""
Boilerplate for quickly writing python http request scripts.

Install requests via pip:
python3 -m pip install requests

usage: python3 http-request.py

output:
Response from: GET https://example.com/
status: 200
content type: text/html; charset=UTF-8
encoding: UTF-8
"""

import requests

URL = 'https://example.com/'

def main():
    r = requests.get(URL)

    print(f"""
Response from: GET {URL}
status: {r.status_code}
content type: {r.headers['content-type']}
encoding: {r.encoding}
        """)
    
    # response body:
    # text: {r.text}
    # json: r.json()


if __name__ == '__main__':
    main()
