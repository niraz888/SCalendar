from flask import Blueprint
import requests
from bs4 import BeautifulSoup
import random

bp = Blueprint('bp', __name__)

url = 'https://www.imdb.com/search/title/?title_type=feature'

class Movie(object):
    def __init__(self, name, year, duration):
        self.name = name
        self.genre = []
        self.year = year
        self.duration = duration

class IMDB_Scraper(object):
    def __init__(self):
        d = 2

    def init_soup(self, param):
        page = requests.get(url,params=param)
        self.soup = BeautifulSoup(page.content, 'lxml')

    def check(self):
        movies = []
        content = self.soup.find(id="main")
        divs = content.find_all("div", class_="lister-item mode-advanced")
        for div in divs:
            movieFirstLine = div.find("h3", class_="lister-item-header")
            name = movieFirstLine.find('a').text
            year = div.find('span', class_="lister-item-year").text
            first = div.find('div', class_="lister-item-content")
            second = first.find('p')
            try:
                duration = second.find('span', class_="runtime").text
            except Exception as e:
                duration = None
            #duration = div.find('div', class_="lister-item-content").find('span', class_="runtime").text
            genere_string = second.find('span', class_="genre").text
            
            movie = Movie(name, year, duration)
            self.parse_genere(genere_string, movie)
            movies.append(movie)
        return movies

    def parse_genere(self, genere, movie):
        striped = genere.split(', ')
        for g in striped:
            movie.genre.append(g.strip())
        
    def consolidate_list(self,movies, given_genre):
        new_list = []
        for item in movies:
            if given_genre in item.genre:
                new_list.append(item)
        return new_list

    def scraping(self):
        ret_list = []
        for i in range(1,154, 50):
            s = str(i)
            params = {'start' : s}
            self.init_soup(params)
            ret_list.extend(self.check())
        return ret_list

@bp.route('/bp/try')
def first_try():
    scraper = IMDB_Scraper()
    """
    movies = []
    params = {'start': '0'}
    scraper.init_soup(params)
    list_movies = scraper.check(movies)
    params2 = {'start': '78'}
    scraper.init_soup(params2)
    temp = scraper.check(list_movies)
    """
    temp = scraper.scraping()
    new_list = scraper.consolidate_list(temp, 'Mystery')
    i = random.randint(1, len(new_list))
    return new_list[i].name
