import requests
from bs4 import BeautifulSoup as soup
from requests_html import AsyncHTMLSession


header = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'}

html = requests.get('https://www.digikey.com/en/products/filter/embedded-microprocessors/694?s=N4IgTCBcDaIMYFMA2CBOB7AdiAugXyA',headers=header)



bsobj = soup(html.content, "html.parser")


next = bsobj.find(title='Next Page')


productlist = bsobj.findAll('tr',{'class':'MuiTableRow-root'})
productlist[2].text
links = []
for i in range(2,len(productlist)):
    links.append(productlist[i].find_all('a')[1].get('href'))



asession = AsyncHTMLSession()


r = asession.get('https://www.digikey.com/en/products/detail/rochester-electronics-llc/RH80532NC056256/12605923')


r.html.arender()


h1 = r.html.find('div.jss143.jss138')
h1[0].text


stock = r.html.find('div.jss211')
if (stock):
    print(stock[0].text)
else:
    print('err: items in stock')


rating = r.html.find('div.jss209')
if rating:
    print(rating[0].text)
else:
    print('err: no items in stock')


if (rating):
    rating_count = r.html.find('div.jss198')
    shipping = rating_count[0].text.replace('Will ship in approximately ','').split('from')
    print(shipping[0].strip())
    print(shipping[1].strip())
else:
    print('err: no items in stock')



