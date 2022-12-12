sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/line-charts", "./v4/line-charts"], function (_exports, _Theme, _lineCharts, _lineCharts2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _lineCharts.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _lineCharts.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _lineCharts.pathData : _lineCharts2.pathData;
  _exports.pathData = pathData;
  var _default = "line-charts";
  _exports.default = _default;
});