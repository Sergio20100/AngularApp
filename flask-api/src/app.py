from flask import Flask, jsonify, request
from flask_cors import CORS
from database import admin_database, database
from datetime import datetime, timedelta
import pytz
import jwt  #de la libreria PyJWT
# se crea la instancia de Flask
app = Flask(__name__)
CORS(app)
#Se configura una clave secreta para generar el token
app.config['SECRET_KEY'] = 'H0L4mUNd0'
# Logica de JSON WEB TOKEN
tz = pytz.timezone("America/Lima")

def generate_token(username):
    payload = {
        'iat':datetime.now(tz),
        'exp': datetime.now(tz) + timedelta(minutes=5),    
        'username': username, 
        }
    return jwt.encode(payload,app.config['SECRET_KEY'], algorithm="HS256")

def verify_token(headers):
    if 'Authorization' in headers.keys():
        auth = headers['Authorization']
        # print(auth)
        enconde_token = auth.split(" ")[1]
        print(enconde_token)
        try:
            payload = jwt.decode(enconde_token, app.config['SECRET_KEY'], algorithms=["HS256"])
            return True
        except(jwt.ExpiredSignatureError, jwt.InvalidSignatureError):
            return False
    return False


#Rutas para /admin-users rutas privadas
@app.route('/admin-users',methods=['GET'])
def get_admin_users():
    cursor = admin_database.cursor()
    cursor.execute("SELECT * FROM users")
    myResult = cursor.fetchall()
    # Convertir datos a un diccionario 
    insertObjet = []
    columnNames = [column[0] for column in cursor.description ]
    for users in myResult:
        insertObjet.append(dict(zip(columnNames,users)))
    cursor.close()
    # config response
    response = jsonify(insertObjet)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/admin-users/<string:id>',methods=['GET'])
def get_admin_userByID(id):
    cursor = admin_database.cursor()
    sql = "SELECT * FROM users WHERE id = %s"
    data = (id,)
    cursor.execute(sql,data)
    myResult = cursor.fetchall()
    # Convertir datos a un diccionario 
    insertObjet = []
    columnNames = [column[0] for column in cursor.description ]
    for users in myResult:
        insertObjet.append(dict(zip(columnNames,users)))
    cursor.close()
    # config response
    response = jsonify(insertObjet)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response



@app.route('/admin-user',methods = ['POST'])
def add_admin_user():
    # username = request.form['username']
    # name = request.form['name']
    # password = request.form['password']
    username = request.json['username'] 
    name = request.json['name']
    password = request.json['password']

    if username and name and password:
        print(f"Username: {username} name: {name} password: {password}")
        cursor = admin_database.cursor()
        sql = "INSERT INTO users (username,name,password) VALUES (%s,%s,%s)"
        data = (username, name, password)
        cursor.execute(sql, data)
        admin_database.commit()
        response = jsonify({'message':"Succes create User"})
        response.headers.add('Access-Control-Allow-Origin','*')
        return response,200
    else:
        response = jsonify({'message':"Missing data for create User"})
        response.headers.add('Access-Control-Allow-Origin','*')
        return response,400

@app.delete('/admin-users-delete/<string:id>')
def delete_admin_user(id):
    cursor = admin_database.cursor()
    sql = "DELETE FROM users WHERE id=%s"
    data = (id,)
    cursor.execute(sql,data)
    admin_database.commit()
    # preparar respuesta
    response = jsonify({'message':'User delete succesfully'})
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/admin-users-edit/<string:id>',methods=['PUT'])
def update_admin_user(id):
    username = request.json['username']
    name = request.json['name']
    password = request.json['password']

    if username and name and password:
        cursor = admin_database.cursor()
        sql = "UPDATE users SET username = %s, name = %s, password = %s WHERE id = %s"
        data = (username, name, password,id)
        cursor.execute(sql,data)
        admin_database.commit()

    response = jsonify({'message':'User Update succesfully'})
    response.headers.add('Access-Control-Allow-Origin','*')
    return response


#Rutas para /users
@app.route('/users',methods=['GET'])
def get_users():
    cursor = database.cursor()
    cursor.execute("SELECT * FROM users")
    myResult = cursor.fetchall()
    # Convertir datos a un diccionario 
    insertObjet = []
    columnNames = [column[0] for column in cursor.description ]
    for users in myResult:
        insertObjet.append(dict(zip(columnNames,users)))
    cursor.close()
    # config response
    response = jsonify(insertObjet)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/users/<string:id>',methods=['GET'])
def get_userByID(id):
    cursor = database.cursor()
    sql = "SELECT * FROM users WHERE id = %s"
    data = (id,)
    cursor.execute(sql,data)
    myResult = cursor.fetchall()
    # Convertir datos a un diccionario 
    insertObjet = []
    columnNames = [column[0] for column in cursor.description ]
    for users in myResult:
        insertObjet.append(dict(zip(columnNames,users)))
    cursor.close()
    # config response
    response = jsonify(insertObjet)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response



@app.route('/user',methods = ['POST'])
def addUser():
    # username = request.form['username']
    # name = request.form['name']
    # password = request.form['password']
    username = request.json['username'] 
    name = request.json['name']
    password = request.json['password']

    if username and name and password:
        print(f"Username: {username} name: {name} password: {password}")
        cursor = database.cursor()
        sql = "INSERT INTO users (username,name,password) VALUES (%s,%s,%s)"
        data = (username, name, password)
        cursor.execute(sql, data)
        database.commit()
        response = jsonify({'message':"Succes create User"})
        response.headers.add('Access-Control-Allow-Origin','*')
        return response,200
    else:
        response = jsonify({'message':"Missing data for create User"})
        response.headers.add('Access-Control-Allow-Origin','*')
        return response,400

@app.delete('/delete/<string:id>')
def deleteUser(id):
    cursor = database.cursor()
    sql = "DELETE FROM users WHERE id=%s"
    data = (id,)
    cursor.execute(sql,data)
    database.commit()
    # preparar respuesta
    response = jsonify({'message':'User delete succesfully'})
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/edit/<string:id>',methods=['PUT'])
def update_user(id):
    username = request.json['username']
    name = request.json['name']
    password = request.json['password']

    if username and name and password:
        cursor = database.cursor()
        sql = "UPDATE users SET username = %s, name = %s, password = %s WHERE id = %s"
        data = (username, name, password,id)
        cursor.execute(sql,data)
        database.commit()

    response = jsonify({'message':'User Update succesfully'})
    response.headers.add('Access-Control-Allow-Origin','*')
    return response