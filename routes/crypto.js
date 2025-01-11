import express from 'express';
import { cryptoData, createPortfolio, readPortfolio, updatePortfolio } from '../controllers/portfolioController.js';

const router = express.Router();

//get top 0 cryptocurrencies by market cap
router.get("/", cryptoData );
//create portfolio route
router.post("/:userId/portfolio/create", createPortfolio);
//read user's portfolio
router.get("/:userId/portfolio", readPortfolio);
//update user's portfolio
router.put("/:userId/portfolio/:portfolioIndex/update", updatePortfolio);
//delete user's portfolio
router.delete("/:userId/portfolio/:portfolioId/delete");



export default router;