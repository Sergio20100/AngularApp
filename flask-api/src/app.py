from flask import Flask, jsonify, request
import database as db

# se crea la instancia de Flask
app = Flask(__name__)

#Rutas de la app
@app.route('/users',methods=['GET'])
def get_users():
    cursor = db.database.cursor()
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
    cursor = db.database.cursor()
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
    username = request.form['username']
    name = request.form['name']
    password = request.form['password']

    if username and name and password:
        print(f"Username: {username} name: {name} password: {password}")
        cursor = db.database.cursor()
        sql = "INSERT INTO users (username,name,password) VALUES (%s,%s,%s)"
        data = (username, name, password)
        cursor.execute(sql, data)
        db.database.commit()
        response = jsonify({'message':"Succes create User"})
        response.headers.add('Access-Control-Allow-Origin','*')
        return response,200
    else:
        response = jsonify({'message':"Missing data for create User"})
        response.headers.add('Access-Control-Allow-Origin','*')
        return response,400

@app.delete('/delete/<string:id>')
def deleteUser(id):
    cursor = db.database.cursor()
    sql = "DELETE FROM users WHERE id=%s"
    data = (id,)
    cursor.execute(sql,data)
    db.database.commit()
    # preparar respuesta
    response = jsonify({'message':'User delete succesfully'})
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/edit/<string:id>',methods=['PUT'])
def update_user(id):
    username = request.form['username']
    name = request.form['name']
    password = request.form['password']

    if username and name and password:
        cursor = db.database.cursor()
        sql = "UPDATE users SET username = %s, name = %s, password = %s WHERE id = %s"
        data = (username, name, password,id)
        cursor.execute(sql,data)
        db.database.commit()

    response = jsonify({'message':'User Update succesfully'})
    response.headers.add('Access-Control-Allow-Origin','*')
    return response