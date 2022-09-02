/* 廃止機能 */

/*
//トリガーを全削除する
function deleteTrigger() {
  var allTriggers = ScriptApp.getScriptTriggers();
  for (var i = 0; i < allTriggers.length; i++) {
    ScriptApp.deleteTrigger(allTriggers[i]);
  }
}

//トリガーを設置しなおすルーチン
function setTrigger() {
  //シートIDを取得する
  var Properties = PropertiesService.getScriptProperties();
  var ssid = Properties.getProperty("sheetid");
  var sheet = SpreadsheetApp.openById(ssid);
  var ui = SpreadsheetApp.getUi();

  //設置済みトリガーの数を計測する
  var Triggers = ScriptApp.getProjectTriggers();
  var TriLength = Triggers.length;

  var result = ui.alert('座席フリーモードにしますか？『はい：フリーモード』　　　　『いいえ：ランダムモード』', ui.ButtonSet.YES_NO);
  switch (result) {
    case result.YES:
      SpreadsheetApp.getActiveSpreadsheet().rename("座席予約システム「スワれる」【フリーモード】");
      var deleteman = deleteTrigger();
      var onChangeTrigger = ScriptApp.newTrigger("clearsheet")
        .timeBased()
        .atHour(15)
        .everyDays(1)
        .create();
      var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シートデータ");
      sh.getRange('C18:C').clearContent();
      sh.getRange('B18:B').setValue("False");
      var myForm = FormApp.openByUrl("https://docs.google.com/forms/d/1l0Olx6XPJDun3CwiXoyotaqAoKBTa0mN5f2LWnypexk/edit");
      myForm.setAcceptingResponses(false);
      ui.alert("座席フリーモードになりました。");

      break;
    case result.NO:
      SpreadsheetApp.getActiveSpreadsheet().rename("座席予約システム「スワれる」【ランダムモード】");
      var deleteman = deleteTrigger();
      var onChangeTrigger2 = ScriptApp.newTrigger("set_last_update")
        .forSpreadsheet(sheet)
        .onEdit()
        .create();
      var onChangeTrigger3 = ScriptApp.newTrigger("form")
        .forSpreadsheet(sheet)
        .onFormSubmit()
        .create();
      var onChangeTrigger3 = ScriptApp.newTrigger("reset")
        .timeBased()
        .atHour(0)
        .everyDays(1)
        .create();
      cellCopy();
      var myForm = FormApp.openByUrl("https://docs.google.com/forms/d/1l0Olx6XPJDun3CwiXoyotaqAoKBTa0mN5f2LWnypexk/edit");
      myForm.setAcceptingResponses(true);
      ui.alert("座席ランダムモードになりました。")
      break;
  }
}



function delTrigger() {//トリガーからset_last_updateを削除する

  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    if (trigger.getHandlerFunction() == "set_last_update") {
      ScriptApp.deleteTrigger(trigger);
    }
  }

}

function set_last() {//トリガーにset_last_updateを追加する
  var Properties = PropertiesService.getScriptProperties();
  var ssid = Properties.getProperty("sheetid");
  var sheet = SpreadsheetApp.openById(ssid);
  var onChangeTrigger2 = ScriptApp.newTrigger("set_last_update")
    .forSpreadsheet(sheet)
    .onEdit()
    .create();
}*/