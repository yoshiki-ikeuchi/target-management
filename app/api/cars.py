""" login users API """
from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required
from db import db
from ..models.car import Car, CarSchema

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
cars_bp = Blueprint(
    "cars_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@cars_bp.route("/cars", methods=["GET"])
@cars_bp.route("/cars/", methods=["GET"])
@login_required
def index(path=None):
    """ 
        index
        /user/...でリクエストを受け取った場合
        ホスティングサービスが無いのでReactを導入した
        index.htmlを返却する
    """
    return render_template("index.html")

@cars_bp.route("/api/cars", methods=["GET"])
@login_required
def cars():
    """
        検索処理 
    """
    params = request.values
    cars = Car.get_car_list(params)
    
    # 検索結果がない場合
    if len(cars) == 0:
        return jsonify({}), 404
    
    # JSONに変換
    car_schema = CarSchema()
    return jsonify({'cars': car_schema.dump(cars, many=True)}), 200
