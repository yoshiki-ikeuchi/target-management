# target-management

目標管理用のリポジトリ

最終課題用にプログラムをアップデート

## 実行前の準備

詳しい手順は自身で調べてください。

## 概要など

ルーティング
app/frontend/App.js

pythonファイル設定
app/__init__.py
→with app.app_context():

この辺りを触れば、新規ファイルのパスを通せる（はず…）

検索画面の条件（ナビとか）について

ナビ・革・サンルーフに何もチェックが入っていなければ、全件
いずれかに入っている場合は、完全にマッチするもののみ出力するようにしています。

例）ナビのみチェック
→ナビがついているもののみ抽出（革・サンルーフがついているものは対象外）

登録画面については、完了まで同一画面で出来るようにしています。
完了画面は別途作って遷移でもいいかなーと思っています。

```
パーツ共通化（新規分）については、下記

◆メーカー名セレクトボックス
　汎用的に作るか悩んだが、今回はメーカーしか使わないので専用で
　今後メーカー名を増やす可能性を考え、内部的に配列でメーカー名を持たせてループでぐるぐるしてセレクトボックスの中身を作成

◆チェックボックス
　汎用的に作成

◆検索結果カード
　デザインが同じなので共通化
　styled-components を使って css in jsでやっています。
　検索すると styled-components は、使用する箇所より下に書くのがお作法と出てきますが、公式を見ると普通に上に書いているので公式のサンプルのように書きます。
　※要素の先頭文字は大文字で…
　自分のローカルでは起こっていないですが、もし引数の箇所でTSに怒られたら、型指定してあげてください。
　→TSに何も言われなかったので、特に型指定してない…
　例）styled.div<{ xxxx: string }>
```

## cssについて
```
◆簡単にcssファイルをあてる
import "cssファイルの場所";
→cssファイル内はいつものように書きます

当てたい要素に
className={"クラス名"}
例）
<div className={"cardOuterFrame"}>...</div>

※備考
どこかでcssをインポートすると、全画面に反映されるっぽい…。
→単純なcssインポートする際は、注意した方がいいかも…

◆styleを記載する
要素に直接styleを適用する

例）
<div style={{marginTop: 10, marginBottom: 10, display:"inline-block"}}>...</div>

cssプロパティ名はハイフンを削除して、キャメルケースで書きます。
値指定部分が数値以外の時は、""で囲み、いつものように記載します。
複数要素がある場合は、「,」で区切ります。

◆makeStylesを使う
・material-uiの機能のため、使用する箇所でインポート
import { makeStyles } from '@material-ui/core/styles';

・cssの内容を定義する
const useStyles = makeStyles({
  mt10: {
    marginTop: 10
  },
  mb10: {
    marginBottom: 10
  },
  ml10: {
    marginLeft: 10
  },
});

cssプロパティ名はハイフンを削除して、キャメルケースで書きます。
値指定部分が数値以外の時は、""で囲み、いつものように記載します。
複数要素がある場合は、「,」で区切ります。

・使いたいところで呼び出す
const carsCreate = (props) => {
      …
      const classes = useStyles();
      …
}

・使用する
<div className={classes.mt10}>...</div>
→mt10で設定したcssが適用される（今回の場合はmargin-top:10px;）

※比較的簡単なイメージ

◆styled-componentsを使う
・機能インポート
import styled from 'styled-components';

・要素を作成する
const testFrame = styled.div`
  width: 340px;
`;

・要素を使用する
<testFrame></testFrame>
→width: 340pxのdivが作成される。

・パラメータの引き渡しも可能
const testFrame = styled.div`
  width: 340px;
  color: ${(props) => (props.red ? "red" : "black")};
`;

<testFrame>黒文字です</testFrame>
<testFrame red>赤文字です</testFrame>

・継承もできます
const testFrame = styled.div`
  width: 340px;
  color: ${(props) => (props.red ? "red" : "black")};
`;

const mainFrame = styled(testFrame)`
  background-color: "blue";
`;

<mainFrame>青背景黒文字で幅340pxです</mainFrame>
<mainFrame red>青背景赤文字で幅340pxです</mainFrame>

・タグ要素も設定できます
const linkBtn = styled.a.attrs(props => {
  return{
    href: `/test/test`,
    target: '_self'
  }
})`
  padding: 5px 15px;
  border-radius: 5px;
  background-color: #007bbb;
  color: white;
  text-decoration: none;
`;

<linkBtn>リンクです</linkBtn>
```

## 追加・変更したディレクトリ・ファイル構成

```
.
├── app
│    ├── __init__.py ※ファイルパス設定
│    ├── api
│    │   ├── cars.py ※検索バックエンド処理
│    │   ├── carsCreate.py ※登録バックエンド処理
│    │   └── carsUpdate.py ※更新バックエンド処理
│    ├── frontend
│    │   ├── App.js ※ルーティング
│    │   ├── components
│    │   │   └── form ※共通コンポーネント
│    │   │       ├── CheckboxControl.js
│    │   │       ├── radioControl.js ※工事中
│    │   │       └── SelectControl_maker.js
│    │   └── pages
│    │       ├── cars ※車両検索のフロントエンド処理
│    │       │   ├── card ※検索結果共通化・ここでしか使わないため、ここに配置
│    │       │   │   └── CarsCard.js
│    │       │   ├── css
│    │       │   │   └── CarList.css
│    │       │   ├── CarsList.js
│    │       │   └── index.js
│    │       ├── CarsCreate ※車両登録のフロントエンド処理
│    │       │   └── index.js
│    │       ├── carsUpdate ※車両更新のフロントエンド処理
│    │       │   └── index.js
│    │       └── menu
│    │            └── index.js
│    └── models ※DBやパラメータに関するモジュール
│         └── car.py
└── db
      └── carData.sql ※DB作成関連
```

## その他

目標管理の最終課題用でサクッと作っているため、あまり精査していません
とりあえず、登録と検索ができるところまでは確認
