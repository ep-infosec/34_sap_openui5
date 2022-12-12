sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/asset-registries/Themes", "sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css", "./sap_fiori_3/parameters-bundle.css"], function (_exports, _Themes, _parametersBundle, _parametersBundle2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _parametersBundle = _interopRequireDefault(_parametersBundle);
  _parametersBundle2 = _interopRequireDefault(_parametersBundle2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  (0, _Themes.registerThemePropertiesLoader)("@ui5/webcomponents-theming", "sap_fiori_3", () => _parametersBundle.default);
  (0, _Themes.registerThemePropertiesLoader)("@ui5/webcomponents-fiori", "sap_fiori_3", () => _parametersBundle2.default);
  var _default = {
    packageName: "@ui5/webcomponents-fiori",
    fileName: "themes/UploadCollectionItem.css",
    content: ":host{height:auto}:host(:not([hidden])){display:block}.ui5-li-root.ui5-uci-root{padding:1rem}.ui5-uci-edit-buttons{display:flex}.ui5-uci-thumbnail{width:3rem;height:3rem;margin-right:.75rem}::slotted([ui5-icon][slot=thumbnail]){width:3rem;height:3rem;font-size:2.5rem}::slotted(img[slot=thumbnail]){width:3rem;height:3rem}:host([actionable]) ::slotted([ui5-icon][slot=thumbnail]){color:var(--sapContent_IconColor)}.ui5-uci-content-and-edit-container{flex:1 1 auto;min-width:0;display:flex;align-items:center}.ui5-uci-content-and-progress{max-width:100%;min-width:0;display:flex;flex:1 1 auto}.ui5-uci-content{flex:1 1 auto;margin-right:.5rem;width:100%;min-width:0}.ui5-uci-file-name{display:block;font-family:\"72override\",var(--sapFontFamily);font-size:var(--sapFontLargeSize);margin-bottom:.25rem;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.ui5-uci-file-name-text{color:var(--sapList_TextColor)}[ui5-link].ui5-uci-file-name{pointer-events:all}.ui5-uci-description{margin-top:.375rem;font-family:\"72override\",var(--sapFontFamily);font-size:var(--sapFontMediumSize);color:var(--sapContent_LabelColor);white-space:normal;overflow:hidden;text-overflow:ellipsis}.ui5-uci-edit-container{display:flex;align-items:center}.ui5-uci-edit-container [ui5-input]{width:60%;pointer-events:all;min-width:auto}.ui5-uci-file-extension{font-family:\"72override\",var(--sapFontFamily);font-size:var(--sapFontMediumSize);color:var(--sapTextColor);white-space:no-wrap;overflow:hidden;margin-left:.5rem;width:40%;display:inline-block;vertical-align:middle}.ui5-uci-root-editing .ui5-li-deletebtn,.ui5-uci-root-editing .ui5-li-detailbtn,.ui5-uci-root-uploading .ui5-li-deletebtn,.ui5-uci-root-uploading .ui5-li-detailbtn{display:none}.ui5-uci-edit-buttons{pointer-events:all;margin-inline-start:1rem}.ui5-uci-edit-rename-btn{margin-right:.125rem}@media(max-width:30rem){.ui5-uci-content-and-edit-container{display:block}.ui5-uci-content-and-progress{flex-wrap:wrap}.ui5-uci-progress-box{width:100%;margin-top:.5rem}.ui5-uci-content{width:100%}.ui5-uci-edit-buttons{margin-inline-start:0;margin-block-start:var(--ui5_upload_collection_small_size_buttons_margin_block_start)}.ui5-uci-edit-buttons [ui5-button]{margin-block-end:var(--ui5_upload_collection_button_margin_block_end)}}.ui5-uci-progress-indicator{height:1.125rem;margin-bottom:.5rem;padding:5px 0;box-sizing:border-box}.ui5-uci-progress-labels{display:flex;justify-content:space-between}[ui5-button]{margin-inline:.5rem}[ui5-button]:first-of-type{margin-inline-start:0}[ui5-button]:last-of-type{margin-inline-end:var(--ui5_upload_collection_last_button_inline_end)}"
  };
  _exports.default = _default;
});