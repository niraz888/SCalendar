from flask import Blueprint, request, jsonify
import requests
from bs4 import BeautifulSoup
import random

bp = Blueprint('bp', __name__)

url = 'https://www.imdb.com/search/title/?title_type=feature'

class Movie(object):
    def __init__(self, name, year, duration, link):
        self.name = name
        self.genre = []
        self.year = year
        self.duration = duration
        self.link = link

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
            link = movieFirstLine.find('a')['href']
            year = div.find('span', class_="lister-item-year").text
            first = div.find('div', class_="lister-item-content")
            second = first.find('p')
            try:
                duration = second.find('span', class_="runtime").text
            except Exception as e:
                duration = None
            genere_string = second.find('span', class_="genre").text
            
            movie = Movie(name, year, duration, link)
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

@bp.route('/bp/try', methods=['GET'])
def first_try():
    if request.method == 'GET':
        genre = request.args.get("genre")
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
        new_list = scraper.consolidate_list(temp, genre)
        i = random.randint(1, len(new_list))
        return jsonify(name=new_list[i].name, genre=new_list[i].genre, year=new_list[i].year, link=new_list[i].link)
