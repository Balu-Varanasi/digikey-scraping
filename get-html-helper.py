from pathlib import Path
from bs4 import BeautifulSoup as soup

s = ""
for p in Path('automotive-temp-pages').glob('*.html'):

    f = open(p,'r')
    bso = soup(f.read(),'lxml')
    ar = bso.find_all('tr', {'role' : 'row'})
    for a in ar:
        x = a.find('a')
        o = x.get('href')
        if o != '#':
            s += o + "\n" 
            print(o)
f = open("automotive-oem.txt", "w")
f.write(s[:-1])
f.close()