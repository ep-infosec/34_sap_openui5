/*!
 * ${copyright}
 */

sap.ui.define([
	'sap/m/p13n/Engine', './ItemBaseFlex'
], function(Engine, ItemBaseFlex) {
	"use strict";

	var ColumnFlex = Object.assign({}, ItemBaseFlex);

	// Rebind triggered on the Control only during runtime JS change
	var fRebindControl = function(oControl) {
		if (oControl && oControl.isA && oControl.isA("sap.ui.mdc.Table") && oControl.isTableBound()) {
			if (!oControl._bWaitForBindChanges) {
				oControl._bWaitForBindChanges = true;
				Engine.getInstance().waitForChanges(oControl).then(function() {
					oControl.rebind();
					delete oControl._bWaitForBindChanges;
				});

			}
		}
	};

	ColumnFlex.findItem = function(oModifier, aColumns, sName) {
		return aColumns.reduce(function(oPreviousPromise, oColumn) {
			return oPreviousPromise
				.then(function(oFoundColumn) {
					if (!oFoundColumn) {
						return Promise.resolve()
							.then(oModifier.getProperty.bind(oModifier, oColumn, "dataProperty"))
							.then(function(sDataProperty) {
								if (sDataProperty === sName) {
									return oColumn;
								}
							});
					}
					return oFoundColumn;
				});
		}, Promise.resolve());
	};

	ColumnFlex.afterApply = function(sChangeType, oTable, bIsRevert) {
		fRebindControl(oTable);
	};

	ColumnFlex.addColumn = ColumnFlex.createAddChangeHandler();
	ColumnFlex.removeColumn = ColumnFlex.createRemoveChangeHandler();
	ColumnFlex.moveColumn = ColumnFlex.createMoveChangeHandler();

	return ColumnFlex;

});
