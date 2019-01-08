import puppeteer from "puppeteer";

export async function index(page: puppeteer.Page) {
	const appHtml = await page.$eval("#root", root => root.innerHTML);
	expect(appHtml).toMatchInlineSnapshot(`

<ul>
  <li>
    <label>
      Hello World!!!
    </label>
    <ul>
      <li>
        <label>
          Foo
        </label>
        <ul>
          <li>
            <label>
              Hello World!!!
            </label>
          </li>
        </ul>
      </li>
      <li>
        <label>
          Baz
        </label>
      </li>
    </ul>
  </li>
</ul>

`);
}
