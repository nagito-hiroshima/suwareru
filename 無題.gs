function set_last_update() {

  var sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("記録");
  
  
  var activerange=sh.getActiveRange();
  
  var activerow=activerange.getRow();
  
  const last_row = sh.getLastRow();　 //F列の値を全て取得
  sh.getRange(last_row+1,3).activate();
  sh.getRange(activerow, 1).setNumberFormat('yyyy/MM/dd').setValue(new Date());
  sh.getRange(activerow, 2).setValue("=A"+ activerow);
  sh.getRange(activerow,4).setValue("=IFERROR(VLOOKUP(C"+activerow+",'名簿'!A2:E,2,FALSE),IFERROR(VLOOKUP(C"+activerow+",{'名簿'!D:D,'名簿'!B:B},2,false),IFERROR(LEFT(RIGHT(C"+activerow+",LEN(C"+activerow+")-FIND(\"_\",C"+activerow+")),FIND(\"@\",RIGHT(C"+activerow+",LEN(C"+activerow+")-FIND(\"_\",C"+activerow+")))-1))))");
  
  

  
}
 
function reset() {//座席ランダム関数
  var sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("この日の出席");
  sh.getRange('A2:A33').randomize();
  var onChangeTrigger2 = ScriptApp.newTrigger("set_last_update")
                .forSpreadsheet(sheet)
                .onEdit()
                .create();
}

function reset2(){
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

function form(e) {
var name = e.namedValues["メールアドレス"];
var sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("記録");
sh.getRange('A1').setValue("日付");
const last_row = sh.getLastRow();
var activerow = last_row +2;
sh.getRange(last_row+2,4).setValue("=IFERROR(VLOOKUP(C"+activerow+",'名簿'!A2:E,2,FALSE),IFERROR(VLOOKUP(C"+activerow+",{'名簿'!D:D,'名簿'!B:B},2,false),IFERROR(LEFT(RIGHT(C"+activerow+",LEN(C"+activerow+")-FIND(\"_\",C"+activerow+")),FIND(\"@\",RIGHT(C"+activerow+",LEN(C"+activerow+")-FIND(\"_\",C"+activerow+")))-1))))");
sh.getRange(last_row+2 , 3).setValue(name);
sh.getRange(last_row+2, 2).setValue("=A"+ (last_row+2));
sh.getRange(last_row+2, 1).setNumberFormat('yyyy/MM/dd').setValue(new Date());


}


function cellCopy(){
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