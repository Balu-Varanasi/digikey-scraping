# digikey-scraping

This repo is a mess currently and still being worked on

## ali-express-search-scraper
* This is the only scraper here capable of collecting all items in a given search result. 
* Still have to test how this programs works with different layouts of aliexpress search results.
* Can currently be used by replacing the "url" variable to the first page of a search result and running the notebook.

## digikey-search-scraper
* Currently only collects data from one page of search results.
* Can currently be used by replacing the "url" variable to the first page of a search result and running the notebook.

## mouser-scraping
* Non-functional, need to use puppeteer to collect html page data to then scrape.

## puppeteer-testing
* Experimental sandbox for testing puppeteer functionality.

## button-2-test
* Auto-generated puppeteer script simulating navigation of different pages in digikey. 
* Currently, this script does not work due to lacking some unknown element, results in a status code 403 on digikey.
* May be user agent credentials, javascript enabled, cookies, etc.

## Others
All other files need to be cleaned up/removed

