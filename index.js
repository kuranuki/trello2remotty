function postRemotty(token, participation_id, comment) {
  const unirest = require("unirest");
  
  const uri = `https://www.remotty.net/api/v1/rooms/participations/${participation_id}/comments`;
  const headers = {
    "Accept": "application/json",
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`,
    "Connection": "kee-alive",
    "Host": "www.remotty.net"
  };
  const data = {
    "comment": {
      "all":false,
      "show_log":false,
      "content":comment
    }
  };
  
  unirest.post(uri)
  .headers(headers)
  .send(data)
  .end(function (response) {
    console.log(response.body);
  });
}

function createComment(data) {

  let message = "";
  switch (data.action.type) {
    case "createCard":
      message = `カードを新規追加！(${data.action.data.card.name})`;
      break;
    case "updateCard":
      if (data.action.data.old.pos) return null; // 場所移動は無視

      if (data.action.data.card.closed) {
        message = `カードをアーカイブ！(${data.action.data.card.name})`;
      } else {
        message = `カード状態を更新！(${data.action.data.card.name})`;
      }
      break;
    case "commentCard":
      message = `カードにコメント「 ${data.action.data.text} 」(${data.action.data.card.name})`;
      break;
    default:
      return null;
  }

  const username = data.action.memberCreator.username;
  const borad = data.model;
  return `Trello: ${username} - ${message} at ${borad.name}( ${borad.url} )`;
}

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.execute = function execute (req, res) {
  // 作成時
  // res.writeHead(200, {'Content-Type': 'application/json'});
  // res.status(200).send();

  console.log(`baseUrl=${req.baseUrl}, path=${req.path}, query=${JSON.stringify(req.query)}`);
  console.log(JSON.stringify(req.body, null, "  "));

  if (Object.keys(req.body).length > 0) {

    const fs = require('fs');
    const users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
  
    const user = users[req.body.action.memberCreator.username];
    const comment = createComment(req.body);
    if (user && comment) {
      postRemotty(user.remotty_token, user.participation_id, comment);
    }
    res.status(200).send();
  } else {
    res.status(404).send();
  }
};
