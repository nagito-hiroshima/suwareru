function set_last_update() {　//編集時A列に時刻記入
  var sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("記録"); 
  var activerange=sh.getActiveRange();
  var activerow=activerange.getRow();
  sh.getRange(activerow, 1).setNumberFormat('yyyy/MM/dd').setValue(new Date());
  sh.getRange(activerow, 2).setValue("=A"+ activerow);
  sh.getRange(activerow,4).setValue("=IFERROR(VLOOKUP(C"+activerow+",'名簿'!A2:E,2,FALSE),IFERROR(VLOOKUP(C"+activerow+",{'名簿'!D:D,'名簿'!B:B},2,false),IFERROR(LEFT(RIGHT(C"+activerow+",LEN(C"+activerow+")-FIND(\"_\",C"+activerow+")),FIND(\"@\",RIGHT(C"+activerow+",LEN(C"+activerow+")-FIND(\"_\",C"+activerow+")))-1))))");
  
  
  var last_row = sh.getLastRow();
  var myRange = sh.getRange('C'+(activerow+1));
  
  if(myRange.isBlank()){//下の行が空白か

    //空白ではない
    sh.getRange(last_row+1,3).activate();
  
  }else{

    //空白
    sh.getRange(last_row+1,3).activate();
    var last_row = sh.getLastRow();
    let pasteRange = sh.getRange('A'+(last_row+1)+":A"+(last_row+1));
    sh.getRange(activerow, 1).setNumberFormat('yyyy/MM/dd').setValue(new Date());
    sh.getRange(activerow, 2).setValue("=A"+ activerow);
    sh.getRange(activerow,4).setValue("=IFERROR(VLOOKUP(C"+activerow+",'名簿'!A2:E,2,FALSE),IFERROR(VLOOKUP(C"+activerow+",{'名簿'!D:D,'名簿'!B:B},2,false),IFERROR(LEFT(RIGHT(C"   +activerow+",LEN(C"+activerow+")-FIND(\"_\",C"+activerow+")),FIND(\"@\",RIGHT(C"+activerow+",LEN(C"+activerow+")-FIND(\"_\",C"+activerow+")))-1))))");
    
    let copyRange = sh.getRange('A'+ activerow+":"+'D'+(activerow));
    copyRange.copyTo(pasteRange);
    var last_row = sh.getLastRow();　 //F列の値を全て取得
    sh.deleteRows(activerow);
  }  
}

 
function reset() {//座席ランダム関数
　delTrigger();
  var sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("この日の出席");
  sh.getRange('A2:A25').randomize();
  
  var Properties = PropertiesService.getScriptProperties();
  var ssid = Properties.getProperty("sheetid");
  var sheet = SpreadsheetApp.openById(ssid);
  var onChangeTrigger2 = ScriptApp.newTrigger("set_last_update")
                .forSpreadsheet(sheet)
                .onEdit()
                .create();
}

function reset2(){//記録シート全削除
  var ui =SpreadsheetApp.getUi();
  var result = ui.alert('全記録を削除しますか？', ui.ButtonSet.YES_NO);
  switch(result){
       case result.YES:
          var sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("記録");
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
  var sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("記録");
  sh.getRange('A1').setValue("日付");
  const last_row = sh.getLastRow();
  var activerow = last_row +2;
  sh.getRange(last_row+2,4).setValue("=IFERROR(VLOOKUP(C"+activerow+",'名簿'!A2:E,2,FALSE),IFERROR(VLOOKUP(C"+activerow+",{'名簿'!D:D,'名簿'!B:B},2,false),IFERROR(LEFT(RIGHT(C"  +activerow+",LEN(C"+activerow+")-FIND(\"_\",C"+activerow+")),FIND(\"@\",RIGHT(C"+activerow+",LEN(C"+activerow+")-FIND(\"_\",C"+activerow+")))-1))))");
  sh.getRange(last_row+2 , 3).setValue(name);
  sh.getRange(last_row+2, 2).setValue("=A"+ (last_row+2));
  sh.getRange(last_row+2, 1).setNumberFormat('yyyy/MM/dd').setValue(new Date());
}

function cellCopy(){//ランダムモード・フリーモード切り替え用
//スクリプトに紐付いたアクティブなシートを読み込む
var sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シートデータ");
//コピー対象のセル範囲を選択する
let copyRange = sh.getRange('E18:F');
//貼り付け先のセル範囲を選択する
let pasteRange = sh.getRange('B18:C');
//コピー対象のセル範囲のデータを貼り付け先のセルにコピーする
//オプション指定で書式についてはコピー対象から除外する
copyRange.copyTo(pasteRange);
}