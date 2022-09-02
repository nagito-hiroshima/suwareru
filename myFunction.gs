//シートの空き状況をチェックする
function checkseat(seatid) {
  //シートIDを取得する
  var Properties = PropertiesService.getScriptProperties();
  var ssid = Properties.getProperty("sheetid");
  var ss = SpreadsheetApp.openById(ssid);
  var flag = false;

  //シートデータを探索して、空き状況を返す
  var sheet = ss.getSheetByName("シートデータ").getRange("A2:C").getValues();
  var sslength = sheet.length;

  for (var i = 0; i < sslength; i++) {
    //IDが一致したら処理を開始
    if (sheet[i][0] == seatid) {
      if (sheet[i][1] == true) {
        //固定フラグがTrueなので座れない
      } else {
        if (sheet[i][2] == "") {
          //flagをtrueに
          flag = true;
        }
      }
    }
  }

  //検索結果を返す
  return JSON.stringify(flag);
}

//起動時に座席状況をHTML側へ送る関数
function nowsheetlist() {
  //シートIDを取得する
  var Properties = PropertiesService.getScriptProperties();
  var ssid = Properties.getProperty("sheetid");
  var ss = SpreadsheetApp.openById(ssid);

  //シートデータをガッツリ取得する
  var sheet = ss.getSheetByName("シートデータ").getRange("A2:C").getValues();

  //シートデータの塊を返す
  return JSON.stringify(sheet);
}

//シートを確保する為の関数
function getseatman(tempseat) {
  //変数を宣言
  var msg = "";
  var flag = false;
  var username = "";
  var cnt = "";

  //シートIDを取得する
  var Properties = PropertiesService.getScriptProperties();
  var ssid = Properties.getProperty("sheetid");
  var ss = SpreadsheetApp.openById(ssid);

  //現在のアクティブユーザのメアドを取得する
  var manid = Session.getActiveUser();

  //ユーザがいるかどうかチェック
  var sheet = ss.getSheetByName("ユーザ表").getRange("A2:B").getValues();
  var length = sheet.length;

  for (var i = 0; i < length; i++) {
    if (sheet[i][0] == manid) {
      //見つかった場合
      username = sheet[i][1];

      //フラグをオン
      flag = true;
    }
  }

  //フラグチェック
  if (flag == false) {
    //エラー処理
    return JSON.stringify([flag, "ユーザ情報が見つかりませんでした。"])
  }

  //フラグを初期化
  flag = false;

  //シートの確保
  var sheet2 = ss.getSheetByName("シートデータ").getRange("A2:D").getValues();
  var length2 = sheet2.length;

  //ロック開始
  //ドキュメントロックを使用する
  var lock = LockService.getDocumentLock();

  //30秒間のロックを取得
  try {
    //ロックを実施する
    lock.waitLock(30000);

    //同じ社員のデータが存在しないかチェック
    for (var i = 0; i < length2; i++) {
      if (sheet2[i][3] == manid) {
        //ロックを開放する
        lock.releaseLock();

        //エラー処理
        return JSON.stringify([flag, "すでにもう席確保してるみたいですよ！！"])
      }
    }

    //シートの確保
    for (var i = 0; i < length2; i++) {
      //シートの探索
      if (sheet2[i][0] == tempseat) {
        if (sheet2[i][2] == "") {
          //書き込み行を特定する
          cnt = i + 2;

          //シートが開いてるので確保する
          ss.getSheetByName("シートデータ").getRange("C" + cnt).setValue(username);
          ss.getSheetByName("シートデータ").getRange("D" + cnt).setValue(manid);

          //flagを立てる
          flag = true;

          //ループを抜ける
          break;
        }
      }
    }

  } catch (e) {

    //ロック取得できなかった時の処理等を記述する
    var checkword = "ロックのタイムアウト: 別のプロセスがロックを保持している時間が長すぎました。";

    //通常のエラーとロックエラーを区別する
    if (e.message == checkword) {
      //ロックエラーの場合
      return JSON.stringify([flag, checkword]);
    } else {
      //ソレ以外のエラーの場合
      msg = e.message;
      return JSON.stringify([flag, msg]);
    }
  } finally {
    //ロックを開放する
    lock.releaseLock();
  }

  //フラグチェック
  if (flag == false) {
    //エラー処理
    return JSON.stringify([flag, "すでに席は誰かに確保されちゃってました・・・もう一度リロードして作業を行ってください。"])
  } else {
    //成功した処理
    return JSON.stringify([flag, "席の確保が完了しました。"])
  }

}

//深夜0時にデータをクリアするトリガー用関数
function clearsheet() {
  //シートIDを取得する
  var Properties = PropertiesService.getScriptProperties();
  var ssid = Properties.getProperty("sheetid");
  var ss = SpreadsheetApp.openById(ssid);

  //シートデータを取得する
  var sdata = ss.getSheetByName("シートデータ").getRange("A2:D").getValues();
  var slength = sdata.length;

  //ループを回して固定フラグ判定をしながらデータ消去
  for (var i = 0; i < slength; i++) {
    if (sdata[i][1] == true) {
      //固定席なので何もしない
    } else {
      //フリーアドレスなのでクリアする
      sdata[i][2] = "";
      sdata[i][3] = "";
    }
  }

  //配列データを一発貼り付け戻し
  var lastRow = sdata.length;      //レコードの数を取得する
  var lastColumn = sdata[0].length　　//カラムの数を取得する
  ss.getSheetByName("シートデータ").getRange(2, 1, lastRow, lastColumn).setValues(sdata);
}

//シートを確保する為の関数
function relseatman() {
  //変数を宣言する
  var flag = false;
  var cnt = "";

  //シートIDを取得する
  var Properties = PropertiesService.getScriptProperties();
  var ssid = Properties.getProperty("sheetid");
  var ss = SpreadsheetApp.openById(ssid);

  //現在のアクティブユーザのメアドを取得する
  var manid = Session.getActiveUser();

  //ユーザがいるかどうかチェック
  var sheet = ss.getSheetByName("シートデータ").getRange("A2:D").getValues();
  var length = sheet.length;

  //シートの解放
  for (var i = 0; i < length; i++) {
    //シートの探索
    if (sheet[i][3] == manid) {
      //書き込み行を特定する
      cnt = i + 2;

      //シートが開いてるので確保する
      ss.getSheetByName("シートデータ").getRange("C" + cnt).setValue("");
      ss.getSheetByName("シートデータ").getRange("D" + cnt).setValue("");

      //flagを立てる
      flag = true;

      //ループを抜ける
      break;
    }
  }

  //フラグチェック
  if (flag == false) {
    //エラー処理
    return JSON.stringify([flag, "対象のユーザーが見つからなかったので、座席の解放が出来ませんでした。"])
  } else {
    //成功した処理
    return JSON.stringify([flag, "席の解放が完了しました。"])
  }
}



