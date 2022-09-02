/* LINEメッセージ送信機能 */

//LINE message API を使用 (https://developers.line.biz/ja/services/messaging-api/)
//POST送信のため有料カウントに該当

//メッセージ送信 user_id = LINEの識別ID,sheet_num = 座席番号
function postMessage(user_id, sheet_num) {
  const url = 'https://api.line.me/v2/bot/message/push'; //push送信URL
  const token = 'Me7/2CNKguCDnT5AiACGsXEcMGH5hSZfFEi+iRgrLjsjhNF75asZVB5o2pK3ekESlQkHq2DLv6zVYCQH8xLxO9uSv3tQQFLZ0gqIPnNzBjN7fO4ncPqNxE1VxTYuX3FJ6xTDkFLRCup2QLtODaPpQgdB04t89/1O/w1cDnyilFU='; //チャネルアクセストークン

  const payload = {
    to: user_id, //ユーザーID
    "messages": [{ "type": "text", "text": "＝＝＝【スワれる】＝＝＝" }, {
      "type": "image",
      "originalContentUrl": "https://www.nagito.work/suwareru/sheet/" + sheet_num + ".png",
      "previewImageUrl": "https://www.nagito.work/suwareru/sheet/" + sheet_num + ".png"
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

