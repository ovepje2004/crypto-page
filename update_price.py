import requests

def fetch_prices():
    url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
    response = requests.get(url).json()
    
    btc_price = response['bitcoin']['usd']
    eth_price = response['ethereum']['usd']
    
    html_content = f"""
    <html>
    <body>
        <h1>Crypto Prices</h1>
        <p>Bitcoin: ${btc_price}</p>
        <p>Ethereum: ${eth_price}</p>
    </body>
    </html>
    """
    
    with open("index.html", "w") as f:
        f.write(html_content)

fetch_prices()
