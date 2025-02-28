import logger from "../utils/logger.js";
import dbConfig from "../utils/databaseConfig.js";
import fetchCryptoData from "../services/cryptoPriceService.js";
import { calculatePortfolioAnalytics } from "../services/cryptoAnalysisService.js";

const initializeDb = async () => {
	await dbConfig.connect();
};

initializeDb();

export const cryptoData = async (req, res) => {
	try {
		const cryptoData = await fetchCryptoData();
		res.status(200).json(cryptoData);
	} catch (error) {
		res
		.status(500)
		.json({ error: "Failed to fetch crypto data", details: error.message });
	}
}

export const cryptoPortfolioAnalysis = async (req, res) => {
	const { userId } = req.params;
	try {
		const cryptoAssetsAnalysis = await calculatePortfolioAnalytics(userId);
		res.status(200).json(cryptoAssetsAnalysis);
	} catch (error) {
		res
		.status(500)
		.json({ error: "Failed to fetch crypto asset analysis", details: error.message });
	}
}

/**
 * Create: Add a cryptocurrency to a user's portfolio
 */
export const createPortfolio = async (req, res) => {
	const { userId } = req.params;
	const { name, symbol, quantity, purchasePrice } = req.body;
	try {
		if (!name || !symbol || quantity == null || purchasePrice == null) {
		return res.status(400).json({
			error:
			"All fields (name, symbol, quantity, purchasePrice) are required.",
		});
		}

		if (quantity < 0 || purchasePrice < 0) {
		return res.status(400).json({
			error: "Quantity and purchase price must be non-negative.",
		});
		}

		let userPortfolio = await dbConfig.portfolioCollection.findOne({ userId });

		if (!userPortfolio) {
		const newPortfolio = {
			userId,
			cryptocurrencies: [
				{
					name,
					symbol,
					quantity,
					purchasePrice,
					createdAt: new Date(),
				},
			],

		};

		const result = await dbConfig.portfolioCollection.insertOne(newPortfolio);
		return res.status(201).json({
			message: "New portfolio created successfully.",
			portfolioId: result.insertedId,
		});
		}

		// If the portfolio exists, add the cryptocurrency to the cryptocurrencies array
		const result = await dbConfig.portfolioCollection.updateOne(
		{ userId },
		{
			$push: {
				cryptocurrencies: {
					name,
					symbol,
					quantity,
					purchasePrice,
					createdAt: new Date(),
				},
			},
		}
		);

		if (result.modifiedCount === 0) {
			return res.status(500).json({ error: "Failed to add cryptocurrency." });
		}
		res.status(200).json({ message: "Cryptocurrency added successfully." });
	} catch (error) {
		logger.error("Error adding cryptocurrency:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

/**
 * Read: Display a user's portfolio
 */
export const readPortfolio = async (req, res) => {
	const { userId } = req.params;

	if (!userId) {
		return res.status(400).json({
		error: "User ID is required!",
		});
	}

	try {
		const result = await dbConfig.portfolioCollection.findOne({ userId });

		if (!result) {
		return res.status(404).json({
			error: `Portfolio for user with ID ${userId} not found!`,
		});
		}

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({
			error: "An error occurred while fetching the portfolio",
			message: error.message,
		});
	}
};

/**
 * Update: Update a cryptocurrency in a user's portfolio
 */
export const updatePortfolio = async (req, res) => {
	const { symbol, quantity, purchasePrice } = req.body;
	const { userId, portfolioIndex } = req.params;

	// Validate input fields & reuest params
	if (
		!userId ||
		!symbol ||
		(quantity === undefined && purchasePrice === undefined)
	) {
		return res.status(400).json({
			error:
				"User ID, symbol, and at least one of quantity or purchasePrice are required",
		});
	}

	try {
		const portfolio = await dbConfig.portfolioCollection.findOne({ userId });
		if (!portfolio) {
			return res.status(404).json({
				error: `Portfolio for user with ID ${userId} not found`,
			});
		}

		if (
			!portfolio.cryptocurrencies ||
			!Array.isArray(portfolio.cryptocurrencies)
		) {
			return res.status(404).json({
				error: "No cryptocurrencies found in portfolio",
			});
		}

		// Ensure portfolioIndex is valid
		const index = parseInt(portfolioIndex, 10);
		if (
			isNaN(index) ||
			index < 0 ||
			index >= portfolio.cryptocurrencies.length
		) {
			return res.status(404).json({
				error: `Index [${portfolioIndex}] is out of bounds`,
			});
		}

		// Add the new quantity to the existing quantity
		const updatedQuantity = portfolio.cryptocurrencies[index].quantity + (quantity || 0);

		// Update the cryptocurrency details using the spread operator
		portfolio.cryptocurrencies[index] = {
			...portfolio.cryptocurrencies[index],
			...(quantity !== undefined && { quantity: updatedQuantity }),
			...(purchasePrice !== undefined && { purchasePrice }),
			updatedAt: new Date(),
		};

		// Save the updated portfolio back to the database
		await dbConfig.portfolioCollection.updateOne(
			{ userId },
			{ $set: { cryptocurrencies: portfolio.cryptocurrencies } }
		);

		return res.status(200).json({
			message: `Index [${portfolioIndex}]: Cryptocurrency updated successfully`,
			portfolio,
		});
	} catch (error) {
		return res.status(500).json({
			error: "An error occurred while updating the portfolio",
			message: error.message,
		});
	}
};

/**
 * Delete: Delete a cryptocurrency in a user's portfolio
 */

export const deletePortfolio = async (req, res) => {
	const { userId, portfolioIndex } = req.params;

	// Validate request params
	if (!userId || portfolioIndex === undefined) {
			return res.status(400).json({
			error: "User ID and portfolio index are required",
		});
	}

	try {
		const portfolio = await dbConfig.portfolioCollection.findOne({ userId });

		if (!portfolio) {
			return res.status(404).json({
				error: `Portfolio for user with ID ${userId} not found`,
			});
		}

		if (
			!portfolio.cryptocurrencies ||
			!Array.isArray(portfolio.cryptocurrencies)
		) {
		return res.status(404).json({
			error: "No cryptocurrencies found in portfolio",
		});
		}

		// Validate portfolioIndex
		const index = parseInt(portfolioIndex, 10);
		if (
			isNaN(index) ||
			index < 0 ||
			index >= portfolio.cryptocurrencies.length
		) {
		return res.status(404).json({
			error: `Index [${portfolioIndex}] is out of bounds`,
		});
		}

		// Remove the cryptocurrency at the specified index
		const removedCryptocurrency = portfolio.cryptocurrencies.splice(index, 1);

		// Save the updated portfolio back to the database
		await dbConfig.portfolioCollection.updateOne(
			{ userId },
			{ $set: { cryptocurrencies: portfolio.cryptocurrencies } }
		);

		return res.status(200).json({
			message: `Index [${portfolioIndex}]: Cryptocurrency deleted successfully`,
			removed: removedCryptocurrency,
			portfolio,
		});
	} catch (error) {
		return res.status(500).json({
			error: "An error occurred while deleting the portfolio",
			message: error.message,
		});
	}
};

