import axios from "axios";
import logger from "../utils/logger.js";

const fetchCryptoData = async () => {
	try {
		const response = await axios.get(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`
		);

		// Filter top 10 cryptos by market cap
		const cryptos = response.data.slice(0, 10).map((crypto) => ({
		symbol: crypto.symbol,
		name: crypto.name,
		price: crypto.current_price,
		timestamp: crypto.last_updated,
		}));

		return cryptos;
	} catch (error) {
		logger.error("Error fetching or storing cryptos:", error.message);
	}
};

export default fetchCryptoData;
