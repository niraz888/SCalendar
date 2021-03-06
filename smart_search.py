from flask import Blueprint, request, jsonify, redirect, url_for
import requests
from bs4 import BeautifulSoup
import random
from datetime import datetime
import json

bp = Blueprint('bp', __name__)

url = 'https://www.imdb.com/search/title/?title_type=feature'
MAPPER = {'Jan' : 1 , 'Feb' : 2, 'Mar' : 3, 'Apr' : 4, 'May' : 5, 'Jun' : 6, 'Jul' : 7, 'Aug' : 8 ,'Sep' : 9, 'Oct' : 10, 'Nov' : 11, 'Dec' : 12}

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
class Date(object):
    def __init__(self, year, month, day):
        self.year = int(year)
        self.month = int(month)
        self.day = int(day)
        self.full_representation = str(year) + "-" + str(month) + "-" + str(day)

class Concert(object):
    def __init__(self,year, month, day, city, country, link):
        self.date = Date(year, month, day)
        self.city = city
        self.country = country
        self.link = link

    def dump(self):
        return {"concert" : {'year': self.date.year, 'month': self.date.month, 'day': self.date.day, 'city':self.city, 'country':self.country, 'link':self.link}}

class SongKick_Scraper(object):
    def __init__(self, band):
        token = "https://www.songkick.com/search?utf8=✓&type=initial&query={}".format(band)
        page = requests.get(token)
        soup = BeautifulSoup(page.content, 'lxml')
        temp = soup.find("li", {"class" : "artist"}).find('a')['href']
        self.url = "http://www.songkick.com" + temp

    def find_relevant_concerts(self, from_date, until_date) -> list:
        splitted_from = from_date.split("-")
        splitted_until = until_date.split("-")
        start = Date(splitted_from[0], splitted_from[1], splitted_from[2])
        end = Date(splitted_until[0], splitted_until[1], splitted_until[2])
        self.init_soup()
        all_concerts_in_page = self.scrap()
        current = Date(datetime.now().year, datetime.now().month, datetime.now().day)
        future_concerts = self.pop_past_event(current, all_concerts_in_page)
        user_range_concerts = self.check_user_dates_range(start, end, future_concerts)
        return user_range_concerts

    def init_soup(self):
        page = requests.get(self.url)
        self.soup = BeautifulSoup(page.content, 'lxml')

    def check_and_fix_input(self, input):
        return input.replace(" ", "+")
    
    def scrap(self):
        global MAPPER
        """
        content = self.soup.find("div", {"class" : "sticky-container"})
        content = content.find("div", {"class" : "container"})
        content = content.find("div", {"class" : "row"})
        content = content.find("div", {"id" : "calendar-summary"})
        """
        list_of_concerts = []
        list_elements = self.soup.find_all("li", {"class" : "event-listing"})
        for elm in list_elements:
            month = elm.find("h4", {"class" : "month"}).text
            day = elm.find("h3", {"class" : "date"}).text
            place = elm.find("p", {"class" : "secondary-detail"}).text
            where = elm.find("strong", {"class" : "primary-detail"}).text
            arr = where.split(", ")
            time = elm.find("a").contents[1].attrs['datetime'].split('-')[0]
            _time = 0
            city = arr[0]
            if len(arr) == 1:
                continue
            state = arr[1]
            link = "https://www.songkick.com/" + elm.find("a")['href']
            concert = Concert(time, str(MAPPER[month]), day.strip(), city, state, link)
            list_of_concerts.append(concert)
        d = 3
        return list_of_concerts
    
    def pop_past_event(self, current, concerts):
        new_list = []
        
        for con in concerts:
            if int(con.date.month) > int(current.month):
                new_list.append(con)
        return new_list

    def is_first_later_than_second(self, first, second) -> bool:
        if first.year > second.year:
            return True
        elif second.year > first.year:
            return False
        else:
            if first.month > second.month:
                return True
            elif second.month > first.month:
                return False
            else:
                if first.day > second.day:
                    return True
                elif second.day > first.day:
                    return False
                else:
                    return False

    def check_user_dates_range(self, from_date, until_date, concerts):
        global MAPPER
        new_list = []
        for concert in concerts:
            later = self.is_first_later_than_second(concert.date, from_date)
            earlier = self.is_first_later_than_second(until_date, concert.date)
            if later and earlier:
                new_list.append(concert)
        return new_list 

"""
THEATHRE SHOW GENERATOR SECTION
"""
class Show(object):
    def __init__(self, name, place, description, link):
        self.name = name
        self.place = place
        self.description = description
        self.link = link

    def __eq__(self, other):
        if self.name == other.name:
            return True
        return False

    def dump(self):
        return {"show" : {'name': self.name, 'place': self.place, 'description': self.description, 'link':self.link}}


class Theathre_Scraper(object):
    def __init__(self, flag):
        self.isLondon = flag

    def find_shows(self, start, end, url):
        global MAPPER
        # num = MAPPER[start]
        start_index = MAPPER[start]
        end_index = MAPPER[end]
        shows = []
        i = start_index
        while i != end_index + 1:
            res = i % 12
            if res == 0:
                res = 12
                i = 1
                continue
            self.init_soup(url, res)
            try:
                final = self.scrap(shows)
            except Exception as e:
                continue
            finally:
                i = i + 1
        return shows

    def convert_month(self, month):
        global MAPPER
        inv_map = {v: k for k, v in MAPPER.items()}
        return inv_map[month]

    def init_soup(self, url_site, month_num):
        month = self.convert_month(month_num)
        url = url_site + month.lower()
        page = requests.get(url)
        self.soup = BeautifulSoup(page.content, 'lxml')

    def scrap(self, shows):
        content = self.soup.find("div", {"class" : "view-list"}).find("ul").find_all("li")
        d = 3
        for item in content:
            div = item.find("div", {"class" : "col-sm-9 col-xs-12 calendar-body"})
            name_and_link =  div.find("div", {"class" : "post-title"}).find('a')
            name = name_and_link.text
            link = name_and_link['href']
            place = div.find("div", {"class" : "post-title post-venue-name"}).find('a').text
            if self.isLondon:
                desc = div.find("div", {"class" : "post-body"}).find('p').text
            else:
                desc = 'None'
            link = "https://www.londontheatre.co.uk" + link
            show = Show(name, place, desc, link)
            if show not in shows:
                shows.append(show)
        return shows
"""
ROUTES
"""
@bp.route('/bp/get_concert', methods=['POST'])
def get_concert():
    if request.method == 'POST':
        band = request.form['band']
        from_date = request.form['from']
        until_date = request.form['until']
        try:
            scrap = SongKick_Scraper(band)
        except Exception as e:
            return jsonify("No info about given band"), 400
        concerts = scrap.find_relevant_concerts(from_date, until_date)
        if len(concerts) == 0:
            return jsonify("No Events in This Time Range"), 400
        else:
            return json.dumps([o.dump() for o in concerts])


@bp.route('/bp/get_shows', methods=['POST'])
def get_show():
    if request.method == 'POST':
        place = request.form['place']
        start = request.form['start']
        end = request.form['end']
        url = None
        if place == 'london':
            url = "https://www.londontheatre.co.uk/whats-on/calendar/"
            scrap = Theathre_Scraper(True)
            #return redirect(url_for('bp.get_london_shows', start=start, end=end))
        elif place == 'new-york':
            url = "https://www.newyorktheatreguide.com/whats-on/broadway/calendar/"
            scrap = Theathre_Scraper(False)
            #return redirect(url_for('bp.get_nyc_shows', start=start, end=end))
        try:
            shows = scrap.find_shows(start, end, url)
        except Exception as e:
            return jsonify("Error"), 400
        if len(shows) == 0:
            return jsonify("No shows at this time range"), 400
        return json.dumps([o.dump() for o in shows])

@bp.route('/bp/get_london_shows/<start>/<end>')
def get_london_shows(start, end):
    scrap = Theathre_Scraper(True)
    url = "https://www.londontheatre.co.uk/whats-on/calendar/"
    shows = scrap.find_shows(start, end, url)
    return json.dumps([o.dump() for o in shows])

@bp.route('/bp/get_nyc_shows/<start>/<end>')
def get_nyc_shows(start, end):
    scrap = Theathre_Scraper(False)
    url = "https://www.newyorktheatreguide.com/whats-on/broadway/calendar/"
    shows = scrap.find_shows(start, end, url)    
    return json.dumps([o.dump() for o in shows])

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

