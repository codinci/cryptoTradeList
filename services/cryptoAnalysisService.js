import axios from "axios";
import logger from "../utils/logger.js";
import configure from "../utils/config.js";
import dbConfig from "../utils/databaseConfig.js";


const fetchCryptoPrices = async (symbol, baseCurrency = 'USD') => {
	try {
		const url = `https://rest.coinapi.io/v1/exchangerate/${symbol}`;

		const response = await axios.get(url, {
			headers: {
				"X-CoinAPI-Key": configure.COINAPI_KEY,
				Accept: "application/json",
			},
		});

		const assetPrice = response.data.rates.find((asset) => asset.asset_id_quote === baseCurrency).rate;
		return assetPrice;
	} catch (error) {
		logger.error("Error fetching cryptocurrency prices:", error.message);
		throw error;
	}
};

export const calculatePortfolioAnalytics = async (userId) => {
	try {
		const assets = await dbConfig.portfolioCollection.findOne({ userId });
		if (!assets) {
			return { error: "Portfolio not found" };
		}
		const symbols = assets.cryptocurrencies.map((crypto) => crypto.symbol);

		// Fetch the current prices of the cryptocurrencies
		const currentPrices = await Promise.all(
			symbols.map((symbol) => fetchCryptoPrices(symbol, "USD"))
		);


		const valueOfAssets = assets.cryptocurrencies.map((asset, index) => {
			const totalValue = asset.quantity * asset.purchasePrice;
			const currentPrice = currentPrices[index];

			if (!currentPrice) {
				logger.error(`Current price not found for ${asset.symbol}`);
				return {
					...asset,
					totalValue: totalValue,
					currentValue: null,
					percentageGainLoss: null,
				};
			}

			const currentValue = currentPrice * asset.quantity;
			const percentageGainLoss = ((currentValue - totalValue) / totalValue) * 100;

			const twoDecimalPercentage = (Math.round(percentageGainLoss * 100) / 100).toFixed(2);

			return {
				...asset,
				totalValue: totalValue,
				currentValue: currentValue,
				percentageGainLoss: twoDecimalPercentage,
			};
		});

		return valueOfAssets;

	} catch (error) {
		logger.error("Error calculating portfolio analytics:", error);
		return { error: "An error occurred while calculating portfolio analytics" };
	}
};


