import { any, string } from "zod";

const { convert } = require('html-to-text');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const get_text_from_url = async (url : string) => {
    // Fetch the HTML from the URL
    const html = await (await fetch(url)).text();

    // Parse the HTML into a DOM
    const dom = new JSDOM(html);

    // Extract all the text from the parsed document
    const html_body = dom.window.document.body || "";
    return convert(html_body);
};

export default get_text_from_url;