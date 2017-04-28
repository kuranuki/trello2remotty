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

## メモ

- GCPファンクションのデプロイコマンド
- gcloud beta functions deploy trello2remotty --stage-bucket=trello --trigger-http --entry-point=execute

- webhook登録コマンド
- curl -v -H 'Content-Type: application/json' -X POST -d '{  "description": "forRemotty", "callbackURL": "https://xxxx", "idModel": "board-id" }' https://api.trello.com/1/tokens/[your-token]/webhooks/?key=[your-key]

- Remotty投稿サンプル
- curl -v -H 'Accept: application/json' -H 'Content-type: application/json' -H 'Authorization: Bearer [your-token]' -H 'Connection: kee-alive' -H 'Host: www.remotty.net' -X POST -d '{"comment":{"all":false,"show_log":true,"content":"APIから投稿hoge本文"}}'  https://www.remotty.net/api/v1/rooms/participations/[participation_id]/comments 
