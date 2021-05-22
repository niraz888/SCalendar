from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from core import api
from smart_search import bp
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(api)
app.register_blueprint(bp)
CORS(app)

@app.route('/')
def index():
    return 'hello'

def find_parens(s):
    dic = {}
    stack = []

    for i, c in enumerate(s):
        if c == '(':
            stack.append(i)
        elif c == ')':
            if len(stack) == 0:
                raise Error("error")
            dic[stack.pop()] = i

    if len(stack) > 0:
        raise Error("Error")
    return dic


def getSign(s):
    if s == "<":
        return '$lt'
    elif s == "<=":
        return '$lte'
    elif s == ">=":
        return '$gte'
    elif s == ">":
        return '$gt'
    
def fix(s):
    copy = s
    for index in range(len(copy)):
        if index+1 == len(copy):
            break
        elif copy[index] == ']' and copy[index+1] == '$':
            s = s[:index] + "," + s[index+1:]
    return s


def buildWhereInterpretation(s, build_s):
    if 'AND' not in s and 'OR' not in s:
        arr = s.split(" ")
        new_s = "{" + arr[0] + ":{" + getSign(arr[1]) + ":" + arr[2] + "}" + "}"
        return new_s 

    indices = find_parens(s)
    end_of_first = indices[0]
    first_token = s[1:end_of_first]
    a = ''
    if s[(end_of_first+2):(end_of_first+5)] == 'AND':
        a = "$and: ["
        second_token = s[(end_of_first+7):-1]
    elif s[(end_of_first+2):(end_of_first+4)] == 'OR':
        a = "$or: ["
        second_token = s[(end_of_first+6):-1]


    return a + buildWhereInterpretation(first_token, build_s) + "," + buildWhereInterpretation(second_token, build_s) +"]"
    
    

@app.route('/aaa', methods=['POST'])
def aaa():
    query = "((mount > 10) OR (mount < 2)) AND ((s > 2) OR (s < -1))"
    str_a = ''
    str_a = buildWhereInterpretation(query, str_a)
    str_a = fix(str_a)
    return jsonify(str_a)


if __name__ == '__main__':
    app.run(debug=True)