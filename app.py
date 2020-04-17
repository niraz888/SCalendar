from flask import Flask, request
from flask_mysqldb import MySQL
from core import api
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(api)
CORS(app)

@app.route('/')
def index():
    return 'hello'

if __name__ == '__main__':
    app.run(debug=True)