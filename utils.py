from flask_mysqldb import MySQL
from enum import Enum
import pymysql
from werkzeug.security import check_password_hash

class Result(Enum):
    LOGIC_ERROR = 1
    PROCESS_ERROR = 2
    SUCCESS = 3

class SqlConnection(object):
    def __init__(self):
        self.db = pymysql.connect('localhost', 'nir', 'pass', 'calender')

    def add_user(self, username, password, phone):
        res = Result.SUCCESS
        cur = self.db.cursor()
        try:
            cur.execute("INSERT INTO users (username, password, phone) VALUES ('"+str(username) + "','" + str(password) + "','" + str(phone) + "')")
            self.db.commit()
        except:
            res = Result.PROCESS_ERROR
        finally:
            self.db.close()
            return res
    
    def check_if_exist(self, username):
        cur = self.db.cursor()
        try:
            cur.execute("SELECT username FROM calender.users WHERE username='" + str(username) +"'")
            result = cur.fetchone()
            if result == None:
                res = Result.SUCCESS # username available
            else:
                res = Result.LOGIC_ERROR #username not available
            self.db.commit()
        except ValueError as e:
            print(e)
            res = Result.PROCESS_ERROR  # error in process
        finally:
            self.db.close()
            return res 

    def validate_password(self, password, user_id):
        res = None
        cur = self.db.cursor()
        sql_command = "SELECT password FROM calender.users WHERE user_id='" + str(user_id) +"'"
        try:
            cur.execute(sql_command)
            result = cur.fetchone()
            if result == None:
                res = Result.LOGIC_ERROR
            else:
                if check_password_hash(result[0], password):
                    res = Result.SUCCESS
        except ValueError as e:
            res = Result.PROCESS_ERROR
        finally:
            self.db.cursor()
            return res
        
    def update_password(self,password, id):
        cur = self.db.cursor()
        
        sql_command = "UPDATE calender.users SET password='" + str(password) + "' WHERE user_id=" + str(id)
        try:
            cur.execute(sql_command)
            self.db.commit()
            res = Result.SUCCESS
        except ValueError as e:
            res = Result.PROCESS_ERROR
        finally:
            self.db.close()
            return res

    def authenticate_user(self, username, password):
        res = 1
        user_id = None
        cur = self.db.cursor()
        sql_command = "SELECT * FROM calender.users WHERE username='%s'" % (username)
        try:
            cur.execute(sql_command)
            result = cur.fetchone()
            d = result[2]
            if result == None:
                res = Result.LOGIC_ERROR
                user_id = 0
            elif check_password_hash(result[2], password):
                res = Result.SUCCESS
                user_id = result[0]
            else:
                res = Result.LOGIC_ERROR               
        except Exception as e:
            i =3
            g = e
            res = Result.PROCESS_ERROR
        finally:
            self.db.close()
            return res, user_id
    
    def add_event(self, name, start, end, desc, user_id, typeof):
        res = Result.SUCCESS
        cur = self.db.cursor()
        result = None
        sql_command = "INSERT INTO events (name, start, end, description, user_id, type) VALUES ('"+str(name) + "','" + str(start) + "','" + str(end) + "','" + str(desc) + "','" + str(user_id) + "',' +" + str(typeof) + "')"
        try:
            cur.execute(sql_command)
            
            result = cur.lastrowid
        except Exception as e:
            res = Result.PROCESS_ERROR
        finally:
            self.db.close()
            return res, result

    def get_events(self, user_id, year, month):
        cur = self.db.cursor()
        sql_command = "SELECT * FROM calender.events WHERE user_id = '" + str(user_id) + "' AND events.start LIKE '" + str(year) + "-" + str(month) + "%'"
        try:
            cur.execute(sql_command)
            result = cur.fetchall()
            self.db.close()
            return result
        except Exception as e:
            res = Result.PROCESS_ERROR
    
    def edit_event(self, event_id, name, desc, start, end, type_of):
        cur = self.db.cursor()
        res = None
        sql_command = "UPDATE calender.events SET name='" + str(name)+ "', description='" + str(desc) +"', start='" + str(start) + "', end='" + str(end) + "', type='" + str(type_of) +"' WHERE event_id=" + str(event_id)
        try:
            cur.execute(sql_command)
            self.db.commit()
            res = Result.SUCCESS
        except Exception as e:
            res = Result.PROCESS_ERROR
        finally:
            self.db.close()
            return res