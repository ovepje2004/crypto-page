async function fetchPrices() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
        );

        const data = await response.json();

        // 가격 업데이트
        document.getElementById("btc-price").innerText =
            "$" + data.bitcoin.usd.toLocaleString();

        document.getElementById("eth-price").innerText =
            "$" + data.ethereum.usd.toLocaleString();

        // 변동률 업데이트
        updateChange("btc-change", data.bitcoin.usd_24h_change);
        updateChange("eth-change", data.ethereum.usd_24h_change);

        // 마지막 업데이트 시간
        document.getElementById("last-updated").innerText =
            "Last updated: " + new Date().toLocaleTimeString();

    } catch (error) {
        console.error("Error fetching prices:", error);
    }
}

function updateChange(elementId, value) {
    const element = document.getElementById(elementId);

    const formatted = value.toFixed(2) + "%";
    element.innerText = formatted;

    element.classList.remove("positive", "negative");

    if (value >= 0) {
        element.classList.add("positive");
    } else {
        element.classList.add("negative");
    }
}

// 최초 실행
fetchPrices();

// 10초마다 자동 갱신
setInterval(fetchPrices, 10000);
