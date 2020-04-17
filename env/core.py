from flask import Flask,Blueprint, jsonify, request
from utils import SqlConnection, Result
from werkzeug.security import generate_password_hash
api = Blueprint('api', __name__)
"""
GOOD
"""
@api.route('/api/insert', methods=['POST'])
def insert():
    username = request.form['username']
    password = request.form['password']
    phone = request.form['phone']
    if username is None or password is None or phone is None:
        pass
    hashed_password = generate_password_hash(password)
    con = SqlConnection()
    res = con.add_user(username, hashed_password, phone)
    if res == Result.SUCCESS:
        return 'good'
    else:
        return 'bad'

"""
GOOD
"""
@api.route('/api/get_user', methods=['POST'])
def check_if_exist():
    username = request.form['username']
    con = SqlConnection()
    res = con.check_if_exist(username)
    if res == Result.SUCCESS:
        return 'good'
    else:
        return 'bad'


@api.route('/api/update', methods=['POST'])
def update():
    username = request.form['username']
    password = request.form['password']
    phone = request.form['phone']
    con = SqlConnection()

@api.route('/api/update_pass', methods=['POST'])
def update_password():
    old_pass = request.form['old_password']
    password = request.form['password']
    id_user = request.form['id']
    con = SqlConnection()
    res = con.validate_password(old_pass, id_user)
    if res != Result.SUCCESS:
        return 'bad'
    else:
        new_res = con.update_password(password,id_user)
        if new_res == Result.SUCCESS:
            return 'good'
        else:
            return 'bad'

@api.route('/api/login', methods=['POST'])
def login():
    password = request.form['password']
    username = request.form['username']
    con = SqlConnection()
    res = con.authenticate_user(username, password)
    if res == Result.SUCCESS:
        return jsonify('good')
    elif res == Result.LOGIC_ERROR:
        return 'username or password invalid'
    else:
        return 'Error with Connection'
    




