import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  mt10: {
    marginTop: 10,
  },
  ml10: {
    marginLeft: 10,
  },
  link: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
  },
  bky:{
    background: "#ebd842",
  },
  bkb:{
    background: "#a0d8ef",
  }
});

const Menu = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();
  
  const classes = useStyles();

  // React側でもログイン状態かチェック
  // 管理者は別メニューが出るようにする
  const menuAuthCheck = async () => {
    const url = "/api/menu_auth"

    await axios.get(url)
    .then(
      (response) => {
        setIsAdmin(response.data.admin);
      }
    ).catch(
      () => {
        // 状態チェックでエラーになった場合も一旦ログイン画面へ
        history.push("/");
      }
    )
  }

  // ランディング(最初の描画時のみ)実施
  useEffect(() => {
    menuAuthCheck();
  },[]);

  const adminLink = (
    <div className={classes.mt10}>
      <Link to="/users" className={`${classes.link} ${classes.bkb}`}>ユーザ一覧</Link>
      <Link to="/carsCreate" className={`${classes.link} ${classes.bkb} ${classes.ml10}`}>車両登録</Link>
    </div>
  );

  return (
    <main>
      <h1>メニュー</h1>
      <div className={classes.mt10}>
        <Link to="/items" className={`${classes.link} ${classes.bky}`}>アイテム一覧</Link>
        <Link to="/cars" className={`${classes.link} ${classes.bky} ${classes.ml10}`}>車両検索</Link>
      </div>
      {
        isAdmin ? 
        adminLink
        :
        <></>
      }
      <div className={classes.mt10}>
        <LogoutButton />
      </div>
    </main>
  );
}

export default Menu;
