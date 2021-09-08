var SIDEBAR_TITLE = 'SE再生プレイヤー';


/**
 * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
 * any other initializion work is done immediately.
 *
 * @param {Object} e The event parameter for a simple onInstall trigger.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar. The sidebar structure is described in the Sidebar.html
 * project file.
 */
function showSidebar() {
  var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle(SIDEBAR_TITLE);
  SpreadsheetApp.getUi().showSidebar(ui);
}