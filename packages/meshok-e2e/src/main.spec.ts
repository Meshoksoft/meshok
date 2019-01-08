import puppeteer from "puppeteer";

interface Test {
	index(page: puppeteer.Page): Promise<void>;
}

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
		const VERSION_ATTRIBUTE = "e2e-testing-version";

		const version: string = await page.evaluate(
			(VERSION_ATTRIBUTE) => {
				const meta = document.querySelector(
					`head > meta[${VERSION_ATTRIBUTE}]`
				);
				return meta ? meta.getAttribute(VERSION_ATTRIBUTE) : "1";
			},
			VERSION_ATTRIBUTE
		);

		const test: Test = require(`./v${version}`);
		await test.index(page);
	});
});
