""" login users API """
from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required
from db import db
from ..models.car import Car

# webpackからもjsが参照できるようにflask側で調整
# 静的ファイルの場所とURLパスを変更
carsCreate_bp = Blueprint(
    "carsCreate_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@carsCreate_bp.route("/carsCreate", methods=["GET"])
@carsCreate_bp.route("/carsCreate/", methods=["GET"])
@login_required
def index(path=None):
    """ 
        index
        /user/...でリクエストを受け取った場合
        ホスティングサービスが無いのでReactを導入した
        index.htmlを返却する
    """
    return render_template("index.html")

@carsCreate_bp.route("/api/carsCreate/createConfirm", methods=["post"])
@login_required
def do_createConfirm():
    params = request.get_json()
    carsCreate = Car()

    # 取得したパラメータをセットする
    carsCreate.set_update_attribute(params)

    # バリデートチェックを実行
    if not carsCreate.valid():
        # だめなら400で終了
        return jsonify(carsCreate.errors), 400

    return jsonify({}), 200

@carsCreate_bp.route("/api/carsCreate/create", methods=["post"])
@login_required
def do_create():
    params = request.get_json()
    carsCreate = Car()

    # 取得したパラメータをセットする
    carsCreate.set_update_attribute(params)

    # バリデートチェックを実行
    if not carsCreate.valid():
        # だめなら400で終了
        return jsonify(carsCreate.errors), 400

    # DB登録
    db.session.add(carsCreate)
    db.session.commit()

    return jsonify({}), 200
