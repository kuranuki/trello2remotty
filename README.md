# trello2remotty

GCP Functionsで、TrelloのWebhookを受け取って、Remottyの自分のチャットに投稿するプログラム。
- https://developers.trello.com/apis/webhooks

## 準備するもの
- GCPのプロジェクト
- Trelloのアカウント
- Remottyのアカウント

## 手順
- Remottyのアカウントメニューから、パーソナルトークンを取得し、自分のparticipation_idをなんとか取得する。
- このプロジェクトをgit cloneして、users.json.sampleをusers.jsonに改名して、適切にデータを変える。
- gcloudツールを使って、GCP Functionsにデプロイする。
- Trelloでwebhook用に、API-Keyとトークンを取得する（ https://trello.com/app-key ここでkeyが。generate a Tokenのリンク先でトークンがとれる。 ）
- Trelloのwebhook作成APIを呼び出して、デプロイしたGCP Functionsを登録する。
