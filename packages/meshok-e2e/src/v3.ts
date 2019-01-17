import puppeteer from "puppeteer";

import { matchSnaphotAfterAction, calcSnapshot } from "./v2";

export async function index(page: puppeteer.Page) {
	const button1 = "#root > ul > li > button";
	const button2 = "#root > ul > li > ul > li > button";

	await matchSnaphotAfterAction(
		page,
		async() => {},
		calcSnapshot(true, true)
	);
	await matchSnaphotAfterAction(
		page,
		page => page.click(button2),
		calcSnapshot(true, false)
	);
	await matchSnaphotAfterAction(
		page,
		page => page.click(button1),
		calcSnapshot(false)
	);
	await matchSnaphotAfterAction(
		page,
		page => page.click(button1),
		calcSnapshot(true, false)
	);
	await matchSnaphotAfterAction(
		page,
		page => page.click(button2),
		calcSnapshot(true, true)
	);
	await matchSnaphotAfterAction(
		page,
		page => page.click(button1),
		calcSnapshot(false)
	);
	await matchSnaphotAfterAction(
		page,
		page => page.click(button1),
		calcSnapshot(true, true)
	);
}
