import express from 'express';
import fetchCryptoData from '../services/cryptoPriceService.js';
import { cryptoData, createPortfolio, readPortfolio } from '../controllers/portfolioController.js';

const router = express.Router();

//get top 0 cryptocurrencies by market cap
router.get("/", cryptoData );
//create portfolio route
router.post("/:userId/portfolio/create", createPortfolio);
//read user's portfolio
router.get("/:userId/portfolio", readPortfolio);
//update user's portfolio
router.put("/:userId/:portfolioId/update");
//delete user's portfolio
router.delete("/:userId/:portfolioId/delete");



export default router;