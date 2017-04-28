const unirest = require("unirest");
const participation_id = process.argv[2];
const token = process.argv[3];

const uri = `https://www.remotty.net/api/v1/rooms/participations/${participation_id}/comments`;
const headers = {
  "Accept": "application/json",
  "Content-type": "application/json",
  "Authorization": `Bearer ${token}`,
  "Connection": "kee-alive",
  "Host": "www.remotty.net"
}
const data = {
  "comment": {
    "all":false,
    "show_log":true,
    "content":"APIから投稿hoge本文:::::::::::::::"
  }
}

unirest.post(uri)
.headers(headers)
.send(data)
.end(function (response) {
  console.log(response.body);
});
