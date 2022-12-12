sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/horizontal-bar-chart", "./v4/horizontal-bar-chart"], function (_exports, _Theme, _horizontalBarChart, _horizontalBarChart2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _horizontalBarChart.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _horizontalBarChart.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _horizontalBarChart.pathData : _horizontalBarChart2.pathData;
  _exports.pathData = pathData;
  var _default = "horizontal-bar-chart";
  _exports.default = _default;
});