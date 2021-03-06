from flask import Flask,Blueprint, jsonify, request
from utils import SqlConnection, Result
from werkzeug.security import generate_password_hash
import json
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
    id_user = request.form['user_id']
    con = SqlConnection()
    res = con.validate_password(old_pass, id_user)
    if res != Result.SUCCESS:
        return jsonify('Wrong Password, please try again')
    else:
        new_res = con.update_password(generate_password_hash(password),id_user)
        if new_res == Result.SUCCESS:
            return jsonify('good')
        else:
            return 'bad'

@api.route('/api/login', methods=['POST'])
def login():
    password = request.form['password']
    username = request.form['username']
    con = SqlConnection()
    res, user_id = con.authenticate_user(username, password)
    if res == Result.SUCCESS:
        return jsonify(user_id)
    elif res == Result.LOGIC_ERROR or res == Result.PROCESS_ERROR:
        return jsonify('username or password invalid')
    else:
        a = {'id': 3, 'name': 'nir'}
        b = {"id" : 4, 'name':"tamir"}
        return json.dumps(a)
    
@api.route('/api/add_event', methods=['POST'])
def add_event():
    ids = None
    event_name = request.form['event_name']
    start = request.form['start_time']
    end = request.form['end_time']
    description = request.form['description']
    user_id = request.form['user_id']
    typeof = request.form['type']
    con = SqlConnection()
    res, ids = con.add_event(event_name, start, end, description, user_id, typeof)
    if res == Result.SUCCESS:
        return jsonify(ids)
    else:
        return jsonfiy('Error in adding Event')

@api.route('/api/get_events', methods=['GET'])
def get_events():
    user_id = request.args.get("user_id")
    year = request.args.get("year")
    month = request.args.get("month")
    con = SqlConnection()
    res = con.get_events(user_id, year, month)
    return jsonify(res)

@api.route('/api/edit_event', methods=['POST'])
def edit_event():
    if request.method == 'POST':
        event_id = request.form['event_id']
        event_name = request.form['name']
        description = request.form['description']
        start = request.form['start']
        end = request.form['end']
        event_type = request.form['type']
        con = SqlConnection()
        res = con.edit_event(event_id, event_name, description, start, end, event_type)
        if res == Result.SUCCESS:
            return jsonify('event updated successfully')
        else:
            return jsonify('error in updating event')

@api.route('/api/delete_event', methods=['POST'])
def delete_event():
    if request.method == 'POST':
        event_id = request.form['event_id']
        con = SqlConnection()
        res = con.delete_event(event_id)
        if res == Result.SUCCESS:
            return jsonify('event deleted successfully')
        else:
            return jsonfiy('error in delete event')
   




