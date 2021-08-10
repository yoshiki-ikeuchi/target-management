from flask import Blueprint, render_template, session, jsonify
from flask_login import login_required

"""
お試しで新規pythonファイルを作成して読み込ませてみる
"""

test_bp = Blueprint(
    "test_bp", __name__, template_folder="templates", 
    static_url_path="/dist", static_folder= "../templates/dist"
)

@test_bp.route("/api/test", methods=["get"])
@login_required
def do_test():
    return jsonify("hallo test api!"), 200