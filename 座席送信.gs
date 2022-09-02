function postMessage(userid, sheetid) {
  const url = 'https://api.line.me/v2/bot/message/push';
  const token = 'Me7/2CNKguCDnT5AiACGsXEcMGH5hSZfFEi+iRgrLjsjhNF75asZVB5o2pK3ekESlQkHq2DLv6zVYCQH8xLxO9uSv3tQQFLZ0gqIPnNzBjN7fO4ncPqNxE1VxTYuX3FJ6xTDkFLRCup2QLtODaPpQgdB04t89/1O/w1cDnyilFU='; //チャネルアクセストークン
  //.userId
  const payload = {
    to: userid,　//ユーザーID
    "messages": [{ "type": "text", "text": "＝＝＝【スワれる】＝＝＝" }, {
      "type": "image",
      "originalContentUrl": "https://www.nagito.work/suwareru/sheet/" + sheetid + ".png",
      "previewImageUrl": "https://www.nagito.work/suwareru/sheet/" + sheetid + ".png"
    }, { "type": "text", "text": "本日の座席はこちらです！" }]
  }

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, params);
}

