from flask import Blueprint, request, jsonify
import requests
from bs4 import BeautifulSoup
import random

bp = Blueprint('bp', __name__)

url = 'https://www.imdb.com/search/title/?title_type=feature'


"""""""""""""""""""""
MOVIE GENERATOR SECTION
"""""""""""""""""""""
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

    """
    by a given params launch a GET request to a given URL
    and extract the response to soup field.
    """
    def init_soup(self, param):
        page = requests.get(url,params=param)
        self.soup = BeautifulSoup(page.content, 'lxml')

    """
    extract all the div elements that conatins info about the movies
    and for each div extract name, link to profile, year of release,
    duration and list of appropriate genres.
    """
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

    """
    parse the genre string into the genre-list of the movie.
    """
    def parse_genere(self, genere, movie):
        striped = genere.split(', ')
        for g in striped:
            movie.genre.append(g.strip())
    
    """
    consolidate the list of all movies that were extracted into a list of 
    movies that contains the given genre.
    """
    def consolidate_list(self,movies, given_genre):
        new_list = []
        for item in movies:
            if given_genre in item.genre:
                new_list.append(item)
        return new_list

    """
    scraping the pages of IMDB and each time changes the parameters
    to the GET request.
    """
    def scraping(self):
        ret_list = []
        for i in range(1,154, 50):
            s = str(i)
            params = {'start' : s}
            self.init_soup(params)
            ret_list.extend(self.check())
        return ret_list

"""
CONCERT GENERATOR SECTION
"""
class Concert(object):
    def __init__(self,year, month, day, city, country):
        self.year = year
        self.month = month
        self.day = day
        self.city = city
        self.country = country

class SongKick_Scraper(object):
    def __init__(self, band):
        token = "https://www.songkick.com/search?utf8=✓&type=initial&query={}".format(band)
        page = request.get(token)
        soup = BeautifulSoup(page.content, 'lxml')
        temp = soup.find("li", {"class" : "artist"}).find('a')['href']
        self.url = "www.songkick.com/" + temp + "/calendar"

    def init_soup(self, params):
        page = requests.get(self.url)
        self.soup = BeautifulSoup(page.content, 'lxml',params=params)

    def check_and_fix_input(self, input):
        return input.replace(" ", "+")
    
    def scrap(self):
        content = self.soup.find("div", {"class" : "sticky-container"})
        list_elements = content.find_all("li", {"class" : "event-listing"})
        for elm in list_elements:
            month = elm.find("h4", {"class" : "month"}).text
            day = elm.find("h3", {"class" : "date"}).text
            place = elm.find("p", {"class" : "venue"}).text
            where = elm.find("strong", {"class" : "metro"}).text
            arr = where.split(", ")
            city = arr[0]
            state = arr[1]
            if arr[2] != None:
                country = arr[2]
            link = elm.find("a")['href']

"""
ROUTES
"""
@bp.route('/bp/get_concert', methods=['POST'])
def get_concert():
    if request.method == 'POST':
        band = request.form['band']


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

