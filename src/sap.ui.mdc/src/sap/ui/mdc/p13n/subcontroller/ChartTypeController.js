/*!
 * ${copyright}
 */

sap.ui.define([
	"./SelectionController"
], function (BaseController) {
	"use strict";

    var ChartTypeController = BaseController.extend("sap.ui.mdc.p13n.subcontroller.ChartTypeController", {
        constructor: function() {
			BaseController.apply(this, arguments);
			this._bResetEnabled = true;
		}
    });

    ChartTypeController.prototype.getCurrentState = function() {
		return {properties: {chartType: this.getAdaptationControl().getChartType()}};
	};

    ChartTypeController.prototype.getStateKey = function() {
		return "supplementaryConfig";
	};

    ChartTypeController.prototype.getDelta = function(mPropertyBag) {

        var sNewType = mPropertyBag.changedState.type ? mPropertyBag.changedState.type : mPropertyBag.changedState.properties.chartType;
        var sOldType = this.getAdaptationControl().getChartType();

        var aChartTypeChanges = [];

        if (sNewType !== sOldType) {
            aChartTypeChanges = [{
                selectorElement: mPropertyBag.control,
                changeSpecificData: {
                    changeType: "setChartType",
                    content: {
                        chartType: sNewType
                    }
                }
            }];
        }

        return aChartTypeChanges;
	};

	return ChartTypeController;

});
