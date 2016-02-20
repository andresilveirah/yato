import jsdom from 'jsdom';
import expect from 'expect.js';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

global.expect = expect;
