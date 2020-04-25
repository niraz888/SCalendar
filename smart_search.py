from flask import Blueprint
import requests
from bs4 import BeautifulSoup

bp = Blueprint('bp', __name__)

url = 'https://www.imdb.com/search/title/?title_type=feature,tv_series'

class movie(object):
    def __init__(self, name, genere, year, duration):
        self.name = name
        self.genre = genere
        self.year = year
        self.duration = duration

class IMDB_Scraper(object):
    def __init__(self):
        page = requests.get(url)
        self.soup = BeautifulSoup(page.content, 'lxml')

    def check(self):
        content = self.soup.find('h1', class_="header")
        text = content.text
        return text

@bp.route('/bp/try')
def first_try():
    scraper = IMDB_Scraper()
    text = scraper.check()
    return text
