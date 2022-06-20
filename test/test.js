/**
 * @jest-environment jsdom
 */

import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
//copy paste:
const { JSDOM } = require('jsdom');
const basicDom = require('index.html');

test('Fills the dom with basic elements', () => {
  const dom = new JSDOM(basicDom);

  const navElementHTML = dom.window.document.getElementsByClassName('searchBtn').textContent;
  expect(navElementHTML).toBe('Search');
 

  const photoBox = dom.window.document.querySelector('#photoBox');
  expect(photoBox).not.toBeFalsy();
});