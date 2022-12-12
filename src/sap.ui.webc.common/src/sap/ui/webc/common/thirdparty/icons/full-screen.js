sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/full-screen", "./v4/full-screen"], function (_exports, _Theme, _fullScreen, _fullScreen2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _fullScreen.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _fullScreen.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _fullScreen.pathData : _fullScreen2.pathData;
  _exports.pathData = pathData;
  var _default = "full-screen";
  _exports.default = _default;
});