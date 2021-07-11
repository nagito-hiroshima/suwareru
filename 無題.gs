function set_last_update() {
  
  var sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("記録");
  
  var activerange=sh.getActiveRange();
  
  var activerow=activerange.getRow();

  sh.getRange(activerow, 1).setNumberFormat('yyyy/MM/dd').setValue(new Date());
  sh.getRange('A1').setValue("日付");
  
}
 
function reset() {//座席ランダム関数
  var sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("この日の出席");
  sh.getRange('A2:A33').randomize();
}

function reset2(){
  var ui =SpreadsheetApp.getUi();
  var result = ui.alert('全記録を削除しますか？', ui.ButtonSet.YES_NO);
  switch(result){
       case result.YES:
          var sh=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("記録");
          sh.getRange('A2:A').clearContent();
          sh.getRange('C2:C').clearContent();
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
const FValues = sh.getRange('C:C').getValues();　 //F列の値を全て取得
const last_row = FValues.filter(String).length;　　//空白の要素を除いた長さを取得
sh.getRange(last_row + 1, 3).setValue(name);
sh.getRange(last_row+ 1, 1).setNumberFormat('yyyy/MM/dd').setValue(new Date());
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