/**
 * @jest-environment jsdom
 */

import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
//copy paste:
const { JSDOM } = require('jsdom');
const basicDom = require('../src/index');

test('Fills the dom with basic elements', () => {
  const dom = new JSDOM(`<!doctype html><html><head><meta charset="utf-8"><title>webpack Boilerplate</title><meta name="viewport" content="width=device-width,initial-scale=1"><script>${scriptString}</script></head><body></body></html>`, {
    runScripts: "dangerously"
  });

  const navElementHTML = dom.window.document.getElementsByClassName('searchBtn').textContent;
  expect(navElementHTML).toBe('Search');
 

  const photoBox = dom.window.document.querySelector('#photoBox');
  expect(photoBox).not.toBeFalsy();
});