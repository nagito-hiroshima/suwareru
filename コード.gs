// @ts-nocheck
//起動時に表示するメニュー
function onOpen(e) {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('座席予約システム「スワれる」')
      .addItem('座席ランダム', 'reset')
      .addItem('モード切り替え', 'setTrigger')
      
      .addSeparator()
      .addItem('セットアップ', 'setup')
      .addItem('Googleフォームリセット', 'reset3')
      .addItem('定期リセット再現（手動ボタン）', 'clearsheet')
      .addToUi();
  ui.createMenu('登校記録監視システム')
      .addItem('日時自動入力「有効」', 'set_last')
      .addItem('日時自動入力「無効」', 'delTrigger')
      .addSeparator()
      .addItem('履歴全削除', 'reset2')
      .addToUi();
}

//外部貼り付け用として表示
function doGet(){
  //スクリプトレットを使えるようにしておく
  var url = 'https://dic.nicovideo.jp/oekaki/896737.png';
  var html = HtmlService.createTemplateFromFile("seatchart")
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=yes')
    .setTitle('座席予約システム「スワれる」')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setFaviconUrl(url);
  return html;  
}

//セットアップ
function setup(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetId = sheet.getId();
  var Properties = PropertiesService.getScriptProperties();
  var spfile = Properties.setProperty("sheetid",sheetId);
  
  SpreadsheetApp.getUi().alert("セットアップ完了");
}