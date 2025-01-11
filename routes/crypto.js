import express from 'express';
import { cryptoData, createPortfolio, readPortfolio, updatePortfolio, deletePortfolio } from '../controllers/portfolioController.js';

const router = express.Router();

/**
 * @swagger
 * /api/cryptos:
 *   get:
 *     summary: Retrieve a list of cryptocurrencies with their details
 *     tags:
 *       - Cryptocurrencies
 *     responses:
 *       200:
 *         description: A list of cryptocurrencies with details like symbol, name, price, and timestamp
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                     description: The symbol of the cryptocurrency
 *                     example: btc
 *                   name:
 *                     type: string
 *                     description: The name of the cryptocurrency
 *                     example: Bitcoin
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: The current price of the cryptocurrency
 *                     example: 94372
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp of the price update
 *                     example: "2025-01-11T14:31:34.423Z"
 *       500:
 *         description: Internal server error
 */
router.get("/", cryptoData );
/**
 * @swagger
 * /api/cryptos/{userId}:
 *   post:
 *     summary: Add a cryptocurrency to a user's portfolio
 *     tags:
 *       - Portfolio
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the cryptocurrency
 *                 example: Bitcoin
 *               symbol:
 *                 type: string
 *                 description: The symbol of the cryptocurrency
 *                 example: btc
 *               quantity:
 *                 type: number
 *                 description: The quantity of the cryptocurrency
 *                 example: 1.5
 *               purchasePrice:
 *                 type: number
 *                 description: The purchase price per unit
 *                 example: 35000
 *     responses:
 *       201:
 *         description: Successfully created or updated the user's portfolio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: New portfolio created successfully.
 *                 portfolioId:
 *                   type: string
 *                   example: 1234567890abcdef
 *       400:
 *         description: Bad request due to missing or invalid input fields
 *       500:
 *         description: Internal server error
 */
router.post("/:userId/portfolio/create", createPortfolio);
/**
 * @swagger
 * /api/cryptos/{userId}:
 *   get:
 *     summary: Retrieve a user's portfolio
 *     tags:
 *       - Portfolio
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's portfolio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 1234567890abcdef
 *                 cryptocurrencies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Bitcoin
 *                       symbol:
 *                         type: string
 *                         example: btc
 *                       quantity:
 *                         type: number
 *                         example: 1.5
 *                       purchasePrice:
 *                         type: number
 *                         example: 35000
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-11T14:31:34.423Z"
 *       400:
 *         description: Missing user ID
 *       404:
 *         description: Portfolio not found for the user
 *       500:
 *         description: Internal server error
 */

router.get("/:userId/portfolio", readPortfolio);
/**
 * @swagger
 * /api/cryptos/{userId}/{portfolioIndex}:
 *   patch:
 *     summary: Update a cryptocurrency in a user's portfolio
 *     tags:
 *       - Portfolio
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: path
 *         name: portfolioIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the cryptocurrency in the portfolio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *                 example: btc
 *               quantity:
 *                 type: number
 *                 example: 2.0
 *               purchasePrice:
 *                 type: number
 *                 example: 36000
 *     responses:
 *       200:
 *         description: Cryptocurrency updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cryptocurrency updated successfully
 *                 portfolio:
 *                   type: object
 *       400:
 *         description: Bad request due to missing or invalid fields
 *       404:
 *         description: User portfolio or cryptocurrency not found
 *       500:
 *         description: Internal server error
 */
router.put("/:userId/portfolio/:portfolioIndex/update", updatePortfolio);
/**
 * @swagger
 * /api/cryptos/{userId}/{portfolioIndex}:
 *   delete:
 *     summary: Delete a cryptocurrency in a user's portfolio
 *     tags:
 *       - Portfolio
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: path
 *         name: portfolioIndex
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the cryptocurrency in the portfolio
 *     responses:
 *       200:
 *         description: Cryptocurrency deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cryptocurrency deleted successfully
 *                 removed:
 *                   type: object
 *                 portfolio:
 *                   type: object
 *       400:
 *         description: Bad request due to missing fields
 *       404:
 *         description: User portfolio or cryptocurrency not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:userId/portfolio/:portfolioIndex/delete", deletePortfolio);



export default router;