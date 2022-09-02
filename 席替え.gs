/* 座席入れ替え機能 */

function ChangeSheet() {
  let fromdesk, todesk, memory1, memory2, finder, results
  let sh = SpreadsheetApp.getActiveSpreadsheet()
  let targetSheet = sh.getSheetByName("【】");
  let fromename = targetSheet.getRange("B14:B16").getValues();
  let toname = targetSheet.getRange("D14:D16").getValues();

  //動作表示クリア
  targetSheet.getRange("E14").setValue("");

  //入力された座席を入れ替える
  for (let i = 0; i < 3; i++) {
    if (fromename[i][0] != "" && toname[i][0] != "") {//fromename[i][0]&toname[i][0]は座席入力ボックスのこと

      //入力された名前を座席識別番号(ex.D10)に変換
      //A座席
      finder = targetSheet.getRange("A3:K10").createTextFinder(fromename[i][0]);
      results = finder.findAll();
      results.forEach(function (rng) {
        fromdesk = rng.getA1Notation()
      });

      //B座席
      finder = targetSheet.getRange("A3:K10").createTextFinder(toname[i][0]);
      results = finder.findAll();
      results.forEach(function (rng) {
        todesk = rng.getA1Notation()
      });

      //入力された座席識別番号（ex.D10）をシートデータの何行目(ex.A1)に変換
      //新A座席
      finder = Today_sheet.getRange("A2:A49").createTextFinder(fromdesk);
      results = finder.findAll();
      results.forEach(function (rng) {
        memory1 = rng.getA1Notation()
      });

      //新B座席
      finder = Today_sheet.getRange("A2:A49").createTextFinder(todesk);
      results = finder.findAll();
      results.forEach(function (rng) {
        memory2 = rng.getA1Notation()
      });

      //シートデータの座席を入力された座席と変更
      Today_sheet.getRange(memory1).setValue(todesk);
      Today_sheet.getRange(memory2).setValue(fromdesk);

      //出力ボックスの処理
      targetSheet.getRange("B14:D14").setValues([[toname[0], "↔", fromename[0]]])
      targetSheet.getRange("E14").setValue(targetSheet.getRange("E14").getValue() + "\n" + fromename[i][0] + "を" + toname[i][0] + "と入れ替えました。")
      targetSheet.getRange("M16").setValue(targetSheet.getRange("M16").getValue() + "\n" + fromename[i][0] + "(" + fromdesk + ") " + "を" + toname[i][0] + "(" + todesk + ") " + "と入れ替えました。")
    }
  }
}
