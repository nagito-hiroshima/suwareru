function test2() {
  return "hello world"
}
var sh = SpreadsheetApp.openById("1me16_aYkFxSZmOrG24Vkr12VIFQx-xefNPeMlHKs1-E").getSheetByName("記録");
var sh2 = SpreadsheetApp.openById("1me16_aYkFxSZmOrG24Vkr12VIFQx-xefNPeMlHKs1-E").getSheetByName("バーコード");
var sh3 = SpreadsheetApp.openById("1me16_aYkFxSZmOrG24Vkr12VIFQx-xefNPeMlHKs1-E").getSheetByName("この日の出席");
var sh4 = SpreadsheetApp.openById("1me16_aYkFxSZmOrG24Vkr12VIFQx-xefNPeMlHKs1-E").getSheetByName("名簿");



function set_last_update() {　//編集時A列に時刻記入
  return

  lastRow = sh2.getLastRow();
  let barcode = sh2.getRange('A' + lastRow).getValue();

  let activerow = sh3.getLastRow() + 1;
  sh3.getRange(activerow, 1).setNumberFormat('yyyy/MM/dd').setValue(new Date());
  sh3.getRange(activerow, 2).setValue("=A" + activerow);
  sh3.getRange(activerow, 3).setValue(barcode);
  sh3.getRange(activerow, 4).setValue("=IFERROR(VLOOKUP(C" + activerow + ",'名簿'!A2:E,2,FALSE),IFERROR(VLOOKUP(C" + activerow + ",{'名簿'!D:D,'名簿'!B:B},2,false),IFERROR(LEFT(RIGHT(C" + activerow + ",LEN(C" + activerow + ")-FIND(\"_\",C" + activerow + ")),FIND(\"@\",RIGHT(C" + activerow + ",LEN(C" + activerow + ")-FIND(\"_\",C" + activerow + ")))-1))))");

  return
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("記録");
  var activerange = sh.getActiveRange();
  //var activerow=activerange.getRow();
  sh.getRange(activerow, 1).setNumberFormat('yyyy/MM/dd').setValue(new Date());
  sh.getRange(activerow, 2).setValue("=A" + activerow);
  sh.getRange(activerow, 4).setValue("=IFERROR(VLOOKUP(C" + activerow + ",'名簿'!A2:E,2,FALSE),IFERROR(VLOOKUP(C" + activerow + ",{'名簿'!D:D,'名簿'!B:B},2,false),IFERROR(LEFT(RIGHT(C" + activerow + ",LEN(C" + activerow + ")-FIND(\"_\",C" + activerow + ")),FIND(\"@\",RIGHT(C" + activerow + ",LEN(C" + activerow + ")-FIND(\"_\",C" + activerow + ")))-1))))");


  var last_row = sh.getLastRow();
  var myRange = sh.getRange('C' + (activerow + 1));

  if (myRange.isBlank()) {//下の行が空白か

    //空白ではない
    sh.getRange(last_row + 1, 3).activate();

  } else {

    //空白
    sh.getRange(last_row + 1, 3).activate();
    var last_row = sh.getLastRow();
    let pasteRange = sh.getRange('A' + (last_row + 1) + ":A" + (last_row + 1));
    sh.getRange(activerow, 1).setNumberFormat('yyyy/MM/dd').setValue(new Date());
    sh.getRange(activerow, 2).setValue("=A" + activerow);
    sh.getRange(activerow, 4).setValue("=IFERROR(VLOOKUP(C" + activerow + ",'名簿'!A2:E,2,FALSE),IFERROR(VLOOKUP(C" + activerow + ",{'名簿'!D:D,'名簿'!B:B},2,false),IFERROR(LEFT(RIGHT(C" + activerow + ",LEN(C" + activerow + ")-FIND(\"_\",C" + activerow + ")),FIND(\"@\",RIGHT(C" + activerow + ",LEN(C" + activerow + ")-FIND(\"_\",C" + activerow + ")))-1))))");

    let copyRange = sh.getRange('A' + activerow + ":" + 'D' + (activerow));
    copyRange.copyTo(pasteRange);
    var last_row = sh.getLastRow();　 //F列の値を全て取得
    sh.deleteRows(activerow);
  }
}


function reset() {//座席ランダム関数
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert('席をシャッフルしますか？（元に戻すには編集履歴からしか戻せません）', ui.ButtonSet.YES_NO);
  switch (result) {
    case result.YES:
      //スクリプトに紐付いたアクティブなシートを読み込む
      var sh2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("この日の出席");
      //コピー対象のセル範囲を選択する
      let copyRange = sh2.getRange('F2:F49');
      //貼り付け先のセル範囲を選択する
      let pasteRange = sh2.getRange('A2:A49');
      //コピー対象のセル範囲のデータを貼り付け先のセルにコピーする
      //オプション指定で書式についてはコピー対象から除外する
      copyRange.copyTo(pasteRange);





      var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("この日の出席");
      sh.getRange('A2:A8').randomize();
      sh.getRange('A9:A16').randomize();
      sh.getRange('A17:A26').randomize();
      sh.getRange('A27:A33').randomize();
      sh.getRange('A34:A44').randomize();
      ui.alert("座席をシャッフルしました");
      break;
    case result.NO:
      ui.alert("キャンセルしました");
      return 0;
  }
}


function resets() {
  var sh2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("この日の出席");
  //コピー対象のセル範囲を選択する
  let copyRange = sh2.getRange('F2:F49');
  //貼り付け先のセル範囲を選択する
  let pasteRange = sh2.getRange('A2:A49');
  //コピー対象のセル範囲のデータを貼り付け先のセルにコピーする
  //オプション指定で書式についてはコピー対象から除外する
  copyRange.copyTo(pasteRange);
  sh2.getRange('A2:A8').randomize();
  sh2.getRange('A9:A16').randomize();
  sh2.getRange('A17:A26').randomize();
  sh2.getRange('A27:A33').randomize();
  sh2.getRange('A34:A44').randomize();


}

function reset2() {//記録シート全削除
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert('全記録を削除しますか？', ui.ButtonSet.YES_NO);
  switch (result) {
    case result.YES:
      var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("記録");
      sh.getRange('A2:D').clearContent();
      ui.alert("累計記録を削除しました");
      break;
    case result.NO:
      ui.alert("キャンセルしました");
      return 0;
      break;
  }
}

function form(e) {//フォーム受信時記録シートに（メールアドレス・時刻）を打刻する
  var name = e.namedValues["メールアドレス"];
  const last_row = sh.getLastRow();
  var activerow = last_row + 1;
  let values = [new Date(), name[0], "=IFERROR(VLOOKUP(B" + activerow + ",'名簿'!A2:E,2,FALSE),IFERROR(VLOOKUP(B" + activerow + ",{'名簿'!D:D,'名簿'!B:B},2,false),IFERROR(LEFT(RIGHT(B" + activerow + ",LEN(B" + activerow + ")-FIND(\"_\",B" + activerow + ")),FIND(\"@\",RIGHT(B" + activerow + ",LEN(B" + activerow + ")-FIND(\"_\",B" + activerow + ")))-1))))"]
  sh.appendRow(values)
  imagesend(name)
}

function imagesend(name) {
  let sheetid
  let todaysheet = sh3.getRange("A2:D" + sh3.getLastRow()).getValues();
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
        postMessage(db[i][4], sheetid)
      }
      break
    }
  }
}

function cellCopy() {//ランダムモード・フリーモード切り替え用
  //スクリプトに紐付いたアクティブなシートを読み込む
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シートデータ");
  //コピー対象のセル範囲を選択する
  let copyRange = sh.getRange('E18:F');
  //貼り付け先のセル範囲を選択する
  let pasteRange = sh.getRange('B18:C');
  //コピー対象のセル範囲のデータを貼り付け先のセルにコピーする
  //オプション指定で書式についてはコピー対象から除外する
  copyRange.copyTo(pasteRange);
}