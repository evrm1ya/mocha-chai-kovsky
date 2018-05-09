const urlParse = require('url').parse;
const urlResolve = require('url').resolve;
const slug = require('slug');
const path = require('path');
const cheerio = require('cheerio');

function urlToFilename(url) {
  const parsedUrl = urlParse(url);

  const urlPath = parsedUrl.path
    .split('/')
    .filter(component => component !== '')
    .map(component => slug(component))
    .join('/');

  let filename = path.join(parsedUrl.hostname, urlPath);

  if (!path.extname(filename).match(/htm/)) {
    filename += '.html';
  }

  return filename;
};

function getLinkUrl(currentUrl, element) {
  const link = urlResolve(currentUrl, element.attribs.href || "");
  const parsedLink = urlParse(link);
  const currentParsedUrl = urlParse(currentUrl);

  if (parsedLink.hostname !== currentParsedUrl.hostname 
    || !parsedLink.pathname) {

    return null;
  }

  return link;
};

function getPageLinks(currentUrl, body) {
  return [].slice.call(cheerio.load(body)('a'))
    .map(element => getLinkUrl(currentUrl, element))
    .filter(element => !!element);
};

module.exports = {
  urlToFilename,
  getLinkUrl,
  getPageLinks
};

