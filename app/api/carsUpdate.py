""" login users API """
from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required
from db import db
from ..models.car import Car, CarSchema

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
carsUpdate_bp = Blueprint(
    "carsUpdate_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@carsUpdate_bp.route("/carsUpdate/<int:id>", methods=["GET"])
@carsUpdate_bp.route("/carsUpdate/<int:id>/", methods=["GET"])
@login_required
def index(id):
    """ 
        index
        /user/...でリクエストを受け取った場合
        ホスティングサービスが無いのでReactを導入した
        index.htmlを返却する
    """
    return render_template("index.html")

@carsUpdate_bp.route("/api/carsUpdate/<int:id>", methods=["post"])
@login_required
def do_search(id):
    carData = db.session.query(Car).get(id)
    # 存在しない場合
    if not carData:
        return jsonify({}), 404
    
    # JSONに変換
    car_schema = CarSchema()
    return jsonify({'carData': car_schema.dump(carData)}), 200

@carsUpdate_bp.route("/api/carsUpdate/<int:id>/updateConfirm", methods=["post"])
@login_required
def do_updateConfirm(id):
    params = request.get_json()
    carsUpdate = Car()

    # 取得したパラメータをセットする
    carsUpdate.set_update_attribute(params)

    # バリデートチェックを実行
    if not carsUpdate.valid():
        # だめなら400で終了
        return jsonify(carsUpdate.errors), 400

    return jsonify({}), 200

@carsUpdate_bp.route("/api/carsUpdate/<int:id>/update", methods=["post"])
@login_required
def do_update(id):
    params = request.get_json()
    carData = db.session.query(Car).get(id)

    carData.maker = params["carData"]["maker"]
    carData.model = params["carData"]["model"]
    carData.grade = params["carData"]["grade"]
    carData.bodyColor = params["carData"]["bodyColor"]
    carData.price = params["carData"]["price"]
    carData.publicFlg = params["carData"]["publicFlg"]
    carData.navi = params["carData"]["navi"]
    carData.kawa = params["carData"]["kawa"]
    carData.sr = params["carData"]["sr"]
    db.session.commit()

    return jsonify({}), 200
