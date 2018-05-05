const urlParse = require('url').parse;
const urlResolve = require('url').resolve;
const cheerio = require('cheerio');

class LinkScraper {
  constructor() {
    this.scraped = {};
  }

  getLinkUrl(currentUrl, element) {
    const link = urlResolve(currentUrl, element.attribs.href || "");
    const parsedLink = urlParse(link);
    const currentParsedUrl = urlParse(currentUrl);

    if (parsedLink.hostname !== currentParsedUrl.hostname 
      || !parsedLink.pathname 
      || typeof this.scraped[parsedLink.pathname] !== 'undefined') {

      return null;
    }

    this.scraped[parsedLink.pathname] = true;

    return link;
  };

  getPageLinks(currentUrl, body) {
    return [].slice.call(cheerio.load(body)('a'))
      .map(element => this.getLinkUrl(currentUrl, element))
      .filter(element => !!element);
  }
}

module.exports = LinkScraper;

