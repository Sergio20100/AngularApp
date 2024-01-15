from flask import Flask ,jsonify
# from config import config
# from models import db
# # primero creo la instancia de Flask

app = Flask(__name__)

# def create_app(enviroment):
#     app = Flask(__name__)
    
#     app.config.from_object(enviroment)
    
#     with app.app_context():
#         db.init_app(app)
#         db.create_all()
    
#     return app

# enviroment = config['development']
# app = create_app(enviroment)
# ahora defino los endpoints
@app.route('/api/v1/users',methods = ['GET'])
def get_users():
    response = {'message':'success'}
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin','*')
    return  response , 200

@app.route('/api/v1/users/<id>', methods = ['GET'])
def get_userById(id):
    response = {'message':'success get user by ID'}
    return jsonify(response), 200

@app.route('/api/v1/users/', methods = ['POST'])
def create_users():
    response = {'message':'Success create User'}
    return jsonify(response), 200

@app.route('/api/v1/users/<id>',methods=['PUT'])
def update_user(id):
    response = {'message':'Success update user'}
    return jsonify(response), 200

@app.route('/api/v1/users/<id>',methods = ['DELETE'])
def delete_user(id):
    response = {'message':'Success delete user'}
    return jsonify(response), 200




