/* スワれるメインシステム */
const sheet = SpreadsheetApp.openById("1me16_aYkFxSZmOrG24Vkr12VIFQx-xefNPeMlHKs1-E")
const log_sheet = sheet.getSheetByName("記録");
const Today_sheet = sheet.getSheetByName("この日の出席");
const Admin_sheet = sheet.getSheetByName("【】");
var sh4 = sheet.getSheetByName("名簿");

/*
var sh = SpreadsheetApp.openById("1me16_aYkFxSZmOrG24Vkr12VIFQx-xefNPeMlHKs1-E").getSheetByName("記録");
var sh3 = SpreadsheetApp.openById("1me16_aYkFxSZmOrG24Vkr12VIFQx-xefNPeMlHKs1-E").getSheetByName("この日の出席");
var sh4 = SpreadsheetApp.openById("1me16_aYkFxSZmOrG24Vkr12VIFQx-xefNPeMlHKs1-E").getSheetByName("名簿");
*/

function reset() {//座席ランダム関数
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert('席をシャッフルしますか？（元に戻すには編集履歴からしか戻せません）', ui.ButtonSet.YES_NO);
  switch (result) {
    case result.YES:
      //コピー対象のセル範囲を選択する
      let copyRange = Today_sheet.getRange('F2:F49');
      //貼り付け先のセル範囲を選択する
      let pasteRange = Today_sheet.getRange('A2:A49');
      //コピー対象のセル範囲のデータを貼り付け先のセルにコピーする
      //オプション指定で書式についてはコピー対象から除外する
      copyRange.copyTo(pasteRange);

      Today_sheet.getRange('A2:A8').randomize();
      Today_sheet.getRange('A9:A16').randomize();
      Today_sheet.getRange('A17:A26').randomize();
      Today_sheet.getRange('A27:A33').randomize();
      Today_sheet.getRange('A34:A44').randomize();
      ui.alert("座席をシャッフルしました");
      break;
    case result.NO:
      ui.alert("キャンセルしました");
      return 0;
  }
}


function resets() {
  //コピー対象のセル範囲を選択する
  let copyRange = Today_sheet.getRange('F2:F49');
  //貼り付け先のセル範囲を選択する
  let pasteRange = Today_sheet.getRange('A2:A49');
  //コピー対象のセル範囲のデータを貼り付け先のセルにコピーする
  //オプション指定で書式についてはコピー対象から除外する
  copyRange.copyTo(pasteRange);
  Today_sheet.getRange('A2:A8').randomize();
  Today_sheet.getRange('A9:A16').randomize();
  Today_sheet.getRange('A17:A26').randomize();
  Today_sheet.getRange('A27:A33').randomize();
  Today_sheet.getRange('A34:A44').randomize();
}


function form(e) {//フォーム受信時記録シートに（メールアドレス・時刻）を打刻する
  var name = e.namedValues["メールアドレス"];
  const last_row = log_sheet.getLastRow();
  var activerow = last_row + 1;
  let values = [new Date(), name[0], "=IFERROR(VLOOKUP(B" + activerow + ",'名簿'!A2:E,2,FALSE),IFERROR(VLOOKUP(B" + activerow + ",{'名簿'!D:D,'名簿'!B:B},2,false),IFERROR(LEFT(RIGHT(B" + activerow + ",LEN(B" + activerow + ")-FIND(\"_\",B" + activerow + ")),FIND(\"@\",RIGHT(B" + activerow + ",LEN(B" + activerow + ")-FIND(\"_\",B" + activerow + ")))-1))))"]
  log_sheet.appendRow(values)
  imagesend(name)
}

function imagesend(name) {
  let sheetid
  let todaysheet = Today_sheet.getRange("A2:D" + Today_sheet.getLastRow()).getValues();
  for (let i = 0; i < 48; i++) {
    if (todaysheet[i][3] == name) {
      sheetid = todaysheet[i][0]
      break
    }
  }
  if (sheetid == undefined) {
    return
  }

  let db = sh4.getRange("A2:E" + sh4.getLastRow()).getValues();
  for (let i = 0; i < sh4.getLastRow() - 1; i++) {
    if (db[i][3] == name) {
      if (isNaN(db[i][4])) {
        SendMessage(db[i][4], sheetid)
      }
      break
    }
  }
}