sap.ui.define([
	"sap/ui/thirdparty/jquery",
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller"
], function ($, Device, Controller) {
	"use strict";
	return Controller.extend("sap.uxap.sample.ObjectPageSubSectionMultiView.controller.ObjectPageSubSectionMultiView", {
		onAfterRendering: function () {
			//demokit specific
			$(".sapUiSimpleForm").css("backgroundColor", "green");
		}
	});
});

