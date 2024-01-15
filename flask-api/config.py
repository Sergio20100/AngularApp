class Config:
    pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mariadb://localhost:3306'
    # DATABASE = 'users'
    SQLALCHEMY_TRACK_MODIFICATIONS  = False
    
config = {
    'development': DevelopmentConfig,   
}