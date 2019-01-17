import puppeteer from "puppeteer";

import { getAppHtml } from "./v1";

export function calcSnapshot(
	showChildren: false
): string;

export function calcSnapshot(
	showChildren: true,
	showGrandChildren: boolean
): string;

export function calcSnapshot(
	showChildren,
	showGrandChildren = false
) {
	return `

<ul>
  <li>
    <label>
      Hello World!!!
    </label>
    <button>
      ${showChildren ? "Hide" : "Show"} children
    </button>${showChildren ? `
    <ul>
      <li>
        <label>
          Foo
        </label>
        <button>
          ${showGrandChildren ? "Hide" : "Show"} children
        </button>${showGrandChildren ? `
        <ul>
          <li>
            <label>
              Hello World!!!
            </label>
          </li>
        </ul>` : ``}
      </li>
      <li>
        <label>
          Baz
        </label>
      </li>
    </ul>` : ``}
  </li>
</ul>

`;
}

export async function matchSnaphotAfterAction(
	page: puppeteer.Page,
	action: (page: puppeteer.Page) => Promise<void>,
	snapshot: string,
): Promise<void> {
	await action(page);
	const appHtml = await getAppHtml(page);
	expect(appHtml).toMatchInlineSnapshot(snapshot);
}

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
		calcSnapshot(true, true)
	);
}
