from sqlalchemy.sql.expression import false, true
from db import db, ma
from sqlalchemy.orm import relationship
from sqlalchemy import Column, BigInteger, String, Enum, or_
from marshmallow import fields
from flask_login import UserMixin
import enum
import re

class AuthType(str, enum.Enum):
    administrator = "administrator"
    member = "member"

class Car(UserMixin, db.Model):
    __tablename__ = 'carData'
    carId = Column(BigInteger, primary_key=True, nullable=False)
    maker = Column(String(50), nullable=False, unique=True)
    model = Column(String(100), nullable=False)
    grade = Column(String(100), nullable=False)
    bodyColor = Column(String(100), nullable=False)
    price = Column(BigInteger, nullable=False)
    navi = Column(String(1), nullable=False)
    kawa = Column(String(1), nullable=False)
    sr = Column(String(1), nullable=False)
    
    # 管理者かどうか確認
    def is_administrator(self):
        return True if self.authority == AuthType.administrator else False
    
    # 更新時、画面からの値を設定
    def set_update_attribute(self, params):
        # エラーメッセージのインスタンス変数を作成
        self.errors = {'fatal': False}
        # 登録画面からくる値をインスタンスに設定
        # 一部データ（checkboxのboolとか）は、DB登録時にいい感じにデータを入れてくれるっぽい
        # ※つまりは余計なことをしなくていい
        for key in list(params["carData"].keys()):
            setattr(self, key, params["carData"][key])
    
    @classmethod
    def get_car_list(self, params):
        cars = db.session.query(self)
        if params['maker']:
            cars = cars.filter(
                self.maker == params['maker']
            )
        
        if params['model']:
            cars = cars.filter(
                self.model.like("%{}%".format(params['model']))
            )
        
        if params['grade']:
            cars = cars.filter(
                self.grade.like("%{}%".format(params['grade']))
            )
        
        if params['price_top']:
            cars = cars.filter(
                self.price <= params['price_top']
            )
        
        if params['price_bottom']:
            cars = cars.filter(
                self.price >= params['price_bottom']
            )
        
        if params['bodyColor']:
            cars = cars.filter(
                self.bodyColor.like("%{}%".format(params['bodyColor']))
            )
        
        if params['navi']=="true" or params['kawa']=="true" or params['sr']=="true":
            if params['navi']=="true":
                cars = cars.filter(
                    self.navi == "1"
                )
            else:
                cars = cars.filter(
                    or_(self.navi == "0", self.navi == "", self.navi == None)
                )
        
            if params['kawa']=="true":
                cars = cars.filter(
                    self.kawa == "1"
                )
            else:
                cars = cars.filter(
                    or_(self.kawa == "0", self.kawa == "", self.kawa == None)
                )

            if params['sr']=="true":
                cars = cars.filter(
                    self.sr == "1"
                )
            else:
                cars = cars.filter(
                    or_(self.sr == "0", self.sr == "", self.sr == None)
                )

        # order by 
        cars = cars.order_by(self.carId)
        
        return cars.all()
    
    # 入力チェック
    def valid(self):
        validate = True
        if not self.maker:
            self.errors['maker'] = 'メーカーは必須入力です。'
            validate = False
        if not self.model:
            self.errors['model'] = '車種名は必須入力です。'
            validate = False
        if not self.grade:
            self.errors['grade'] = 'グレードは必須入力です。'
            validate = False
        if not self.bodyColor:
            self.errors['bodyColor'] = 'ボディカラーは必須入力です。'
            validate = False 
        if not self.price:
            self.errors['price'] = '価格は必須入力です。'
            validate = False
        else:
            # pythonにも数値判定関数はあるが、全角も許容するため、正規表現で書いてみる
            if not re.compile(r'^-?[0-9]+$').match(self.price):
                self.errors['price'] = '半角数値以外の文字が入力されています。'
                validate = False
            else:
                # 文字扱いされているので、キャストする。
                # ひとつ前の判定で、半角10進数以外は弾かれているので大丈夫（のはず…）
                if not 0 <= int(self.price) <= 100000000:
                    self.errors['price'] = '範囲外の数値が入力されています。'
                    validate = False
        return validate

class CarSchema(ma.SQLAlchemySchema):
    carId = fields.Integer()
    maker = fields.Str()
    model = fields.Str()
    grade = fields.Str()
    bodyColor = fields.Str()
    price = fields.Integer()
    navi = fields.Str()
    kawa = fields.Str()
    sr = fields.Str()
    
