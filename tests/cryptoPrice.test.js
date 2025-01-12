import app from "../app";
import request from "supertest";
import fetchCryptoData from "../services/cryptoPriceService.js";
import dbConfig from "../utils/databaseConfig.js";

jest.mock("../services/cryptoPriceService.js");
jest.mock("../utils/databaseConfig.js");

describe("GET /api/cryptos", () => {
	beforeAll(async () => {
		await dbConfig.connect();
	});

	it("should return a list of top 10 cryptocurrencies", async () => {
		const mockCryptoData = [
		{ symbol: "btc", name: "Bitcoin", price: 45000, timestamp: "2025-01-01" },
		{ symbol: "eth", name: "Ethereum", price: 3000, timestamp: "2025-01-01" },
		];

		fetchCryptoData.mockResolvedValue(mockCryptoData);
		const response = await request(app).get("/api/cryptos");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockCryptoData);
	});

	it("should return error when fetchCryptoData fails", async () => {

		const errorMessage = "Error fetching crypto data";
		fetchCryptoData.mockRejectedValue(new Error(errorMessage));


		const response = await request(app).get("/api/cryptos");


		expect(response.status).toBe(500);
		expect(response.body).toEqual({
		error: "Failed to fetch crypto data",
		details: errorMessage,
		});
	});
});
