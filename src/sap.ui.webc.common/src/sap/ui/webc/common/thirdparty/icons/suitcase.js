sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/suitcase", "./v4/suitcase"], function (_exports, _Theme, _suitcase, _suitcase2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _suitcase.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _suitcase.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _suitcase.pathData : _suitcase2.pathData;
  _exports.pathData = pathData;
  var _default = "suitcase";
  _exports.default = _default;
});