import { any, string } from "zod";

const { convert } = require('html-to-text');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const get_text_from_url = async (url: string) => {
    // Fetch the HTML from the URL
    const html = await (await fetch(url)).text();
  
    // Parse the HTML into a DOM
    const dom = new JSDOM(html);
  
    // Extract text from headers, paragraphs, and divs
    let text = [] as any[];
    dom.window.document.querySelectorAll('h1, h2, h3, h4, h5, h6, p').forEach((element: any) => {
        text.push(element.textContent);
    });
  
    // Join the extracted text into a single string
    return text.join(' ');
};

// const get_text_from_url = async (url : string) => {
//     // Fetch the HTML from the URL
//     const html = await (await fetch(url)).text();

//     // Parse the HTML into a DOM
//     const dom = new JSDOM(html);

//     // Extract all the text from the parsed document
//     const html_body = dom.window.document.body.innerHTML || "";
//     return convert(html_body);
// };

export default get_text_from_url;
