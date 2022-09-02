function irekae() {
  let fromdesk, todesk, memory1, memory2, finder, results
  let targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("【】");
  let toSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("この日の出席");
  let fromename = targetSheet.getRange("B14:B16").getValues();
  let toname = targetSheet.getRange("D14:D16").getValues();
  //targetSheet.getRange("M16").setValue("");
  targetSheet.getRange("E14").setValue("");

  for (let i = 0; i < 3; i++) {
    if (fromename[i][0] != "" && toname[i][0] != "") {

      finder = targetSheet.getRange("A3:K10").createTextFinder(fromename[i][0]); //[正規表現を使用した検索]有効
      results = finder.findAll();
      results.forEach(function (rng) {
        fromdesk = rng.getA1Notation()
      });

      finder = targetSheet.getRange("A3:K10").createTextFinder(toname[i][0]); //[正規表現を使用した検索]有効
      results = finder.findAll();
      results.forEach(function (rng) {
        todesk = rng.getA1Notation()
      });


      finder = toSheet.getRange("A2:A49").createTextFinder(fromdesk);
      results = finder.findAll();
      results.forEach(function (rng) {
        memory1 = rng.getA1Notation()
      });

      finder = toSheet.getRange("A2:A49").createTextFinder(todesk);
      results = finder.findAll();
      results.forEach(function (rng) {
        memory2 = rng.getA1Notation()
      });


      toSheet.getRange(memory1).setValue(todesk);
      toSheet.getRange(memory2).setValue(fromdesk);

      targetSheet.getRange("B14:D14").setValues([[toname[0], "↔", fromename[0]]])

      fromename[i][0]

      Logger.log(fromename[i][0] + "(" + fromdesk + ") " + "を" + toname[i][0] + "(" + todesk + ") " + "に変更しました。")
      targetSheet.getRange("E14").setValue(targetSheet.getRange("E14").getValue() + "\n" + fromename[i][0] + "を" + toname[i][0] + "と入れ替えました。")
      targetSheet.getRange("M16").setValue(targetSheet.getRange("M16").getValue() + "\n" + fromename[i][0] + "(" + fromdesk + ") " + "を" + toname[i][0] + "(" + todesk + ") " + "と入れ替えました。")


    }


    //targetSheet.getRange("B14:B16").clearContent();;
    //targetSheet.getRange("D14:D16").clearContent();;
  }
  //let finder = targetSheet.getRange("A3:K10").createTextFinder(name); //[正規表現を使用した検索]有効
  //let results = finder.findAll();
  //results.forEach(function(rng) {
  //Logger.log(rng.getSheet().getName() + ", " + rng.getA1Notation() + ", " + rng.getValue());
  //fromsheet = rng.getA1Notation()
  //});



}
