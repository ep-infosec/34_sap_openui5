/*!
 * ${copyright}
 */

/**
 * @namespace Provides utitlity functions for OPA tests
 * @name sap.ui.mdc.qunit.p13n.OpaTests.utility.Util
 * @author SAP SE
 * @version ${version}
 * @private
 * @since 1.30.0
 */
sap.ui.define([
	'sap/ui/base/Object',
	'sap/ui/core/Core',
	'sap/ui/Device'
], function(BaseObject, Core, Device) {
	"use strict";

	var Util = BaseObject.extend("sap.ui.mdc.qunit.p13n.test.Util",
	{});

	/**
	 * @param {sap.m.SegmentedButton | sap.m.List} oNavigationControl
	 */
	Util.getNavigationItem = function(oNavigationControl, sPanelName) {
		if (!oNavigationControl || sPanelName === "") {
			return null;
		}
		var oNavigationItem = null;
		if (Device.system.phone) {
			oNavigationControl.getItems().some(function(oNavigationItem_) {
				if (oNavigationItem_.getTitle() === sPanelName) {
					oNavigationItem = oNavigationItem_;
					return true;
				}
			});
		} else {
			oNavigationControl.getButtons().some(function(oNavigationItem_) {
				if (oNavigationItem_.getText() === sPanelName) {
					oNavigationItem = oNavigationItem_;
					return true;
				}
			});
		}
		return oNavigationItem;
	};

	Util.getTextFromResourceBundle = function(sLibraryName, sTextKey, iCount) {
		return Core.getLibraryResourceBundle(sLibraryName).getText(sTextKey, iCount);
	};

	Util.getTextOfChartType = function(sChartType) {
		var oBundle = Core.getLibraryResourceBundle("sap.chart.messages");
		return oBundle.getText("info/" + sChartType);
	};

	Util.waitForColumnMenu = function(mConfig) {
		return this.waitFor({
			searchOpenDialogs: true,
			controlType: "sap.m.table.columnmenu.Menu",
			success: function(aColumnMenu) {
				if (mConfig && mConfig.success) {
					mConfig.success.call(this, mConfig.findAll ? aColumnMenu : aColumnMenu[0]);
				}
			},
			errorMessage: "No column menu is open"
		});
	};

	return Util;
});
