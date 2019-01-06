import puppeteer from "puppeteer";

describe("Meshok", () => {
	let browser: puppeteer.Browser;
	let page: puppeteer.Page;

	beforeAll(async () => {
		browser = await puppeteer.launch();
		page = await browser.newPage();

		const port = process.env["PORT"] || "3000";
		await page.goto(`http://localhost:${port}`);
	});

	afterAll(async () => {
		await browser.close();
	});

	it("works", async () => {
		const appHtml = await page.$eval("#root", root => root.innerHTML);

		expect(appHtml).toMatchSnapshot();
	});
});
