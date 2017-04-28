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
      "show_log":true,
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

  const username = data.action.memberCreator.username;
  let type = data.action.type;

  switch (type) {
    case "createCard":
      type += `(${data.action.data.card.name})`;
      break;
  }

  const borad = data.model;
  return `Trello: ${username} - ${type} at ${borad.name}( ${borad.url} )`;
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
    if (user) {
      postRemotty(user.remotty_token, user.participation_id , createComment(req.body));
    }
    res.status(200).send();
  } else {
    res.status(404).send();
  }
};
