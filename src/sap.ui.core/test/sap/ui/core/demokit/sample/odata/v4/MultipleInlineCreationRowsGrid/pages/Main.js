/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ui/core/sample/common/Helper",
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/Properties"
], function (Helper, Opa5, Press, Properties) {
	"use strict";
	var sViewName = "sap.ui.core.sample.odata.v4.MultipleInlineCreationRowsGrid.Main";

	Opa5.createPageObjects({
		onTheListReport : {
			actions : {
				enterProductId : function (iRow, sId, bPressSave) {
					Helper.changeInputValue(this, sViewName, /productId/, sId, iRow);
					if (bPressSave) {
						Helper.pressButton(this, sViewName, "save");
					}
				},
				pressRefresh : function () {
					Helper.pressButton(this, sViewName, "refresh");
				},
				selectProduct : function (iRow) {
					this.waitFor({
						actions : new Press(),
						controlType : "sap.m.ColumnListItem",
						id : /highlight/,
						matchers : function (oControl) {
							return oControl.getBindingContext().getIndex() === iRow;
						},
						success : function (aControls) {
							Opa5.assert.ok(true, "Product selected: "
								+ aControls[0].getCells()[2].getValue());
						},
						viewName : sViewName
					});
				}
			},
			assertions : {
				checkProduct : function (iRowNumber, sExpectedProductId) {
					Helper.checkInputValue(this, sViewName, /productId/, sExpectedProductId,
						iRowNumber, undefined, false);
				},
				checkProductsLength : function (iExpectedLength) {
					this.waitFor({
						controlType : "sap.m.Table",
						id : "products",
						success : function (oProductsTable) {
							Opa5.assert.strictEqual(
								oProductsTable.getBinding("items").getLength(),
								iExpectedLength,
								"Products length is: " + iExpectedLength);
						},
						viewName : sViewName
					});
				},
				checkProductsTableTitle : function (sTableTitle) {
					this.waitFor({
						controlType : "sap.m.Title",
						id : "productsTitle",
						success : function (oTitle) {
							Opa5.assert.ok(oTitle.getText(), sTableTitle);
						},
						viewName : sViewName
					});
				}
			}
		},
		onTheMessagePopover : {
			actions : {
				close : function () {
					this.waitFor({
						actions : function (oMessagePopover) {
							oMessagePopover.close();
						},
						controlType : "sap.m.MessagePopover",
						success : function (aControls) {
							Opa5.assert.strictEqual(aControls.length, 1, "Message Popover closed");
						}
					});
				}
			}, assertions : {
				checkMessages : function (aExpectedMessages) {
					this.waitFor({
						controlType : "sap.m.MessagePopover",
						success : function (aMessagePopover) {
							var iExpectedCount = aExpectedMessages.length,
								aItems = aMessagePopover[0].getItems();

							Opa5.assert.ok(aMessagePopover.length === 1);
							Opa5.assert.strictEqual(aItems.length, iExpectedCount,
								"Check Messages: message count is as expected: " + iExpectedCount
							);
							aExpectedMessages.forEach(function (oExpectedMessage, i) {
								var bFound;

								bFound = aItems.some(function (oItem) {
									return oItem.getTitle() === oExpectedMessage.message
										&& oItem.getType() === oExpectedMessage.type;
								});
								Opa5.assert.ok(bFound, "Check Messages: expected message[" + i
									+ "]: " + oExpectedMessage.message + " type: "
									+ oExpectedMessage.type);
							});
						}
					});
				}
			}
		},
		onTheObjectPage : {
			actions : {
				confirmDeletion : function () {
					this.waitFor({
						controlType : "sap.m.Dialog",
						matchers : new Properties({title : "Confirm Deletion"}),
						success : function (aControls) {
							new Press().executeOn(aControls[0].getButtons()[0]);
							Opa5.assert.ok(true, "Confirm Deletion");
						}
					});
				},
				enterPartId : function (iRow, sId, bPressSave) {
					Helper.changeInputValue(this, sViewName, /partId/, sId, iRow);
					if (bPressSave) {
						Helper.pressButton(this, sViewName, "save");
					}
				},
				enterPartDescription : function (iRow, sId) {
					Helper.changeInputValue(this, sViewName, /description/, sId, iRow);
				},
				pressCancel : function () {
					Helper.pressButton(this, sViewName, "cancel");
				},
				pressDeletePartButton : function (iRow) {
					this.waitFor({
						actions : new Press(),
						controlType : "sap.m.Button",
						id : /partDelete/,
						matchers : function (oControl) {
							return oControl.getBindingContext().getIndex() === iRow;
						},
						success : function (aControls) {
							Opa5.assert.ok(true, "Button pressed: " + aControls[0].getTooltip());
						},
						viewName : sViewName
					});
				},
				pressSortPartsQuantity : function () {
					Helper.pressButton(this, sViewName, "sortByPartsQuantity");
				}
			},
			assertions : {
				checkPartsLength : function (iExpectedLength) {
					this.waitFor({
						controlType : "sap.ui.table.Table",
						id : "parts",
						success : function (oPartsTable) {
							Opa5.assert.strictEqual(
								oPartsTable.getBinding("rows").getLength(),
								iExpectedLength,
								"Parts length is: " + iExpectedLength);
						},
						viewName : sViewName
					});
				},
				checkPartsTableTitle : function (sTableTitle) {
					this.waitFor({
						controlType : "sap.m.Title",
						id : "partsTitle",
						success : function (oTitle) {
							Opa5.assert.ok(oTitle.getText(), sTableTitle);
						},
						viewName : sViewName
					});
				},
				checkPart : function (iRow, sExpectedPartId, sExpectedState, sExpectedDescription) {
					Helper.waitForSortedByID(this, {
						autoWait : false, // to match also disabled delete buttons
						matchers : function (oControl) {
							return oControl.getBindingContext()
								&& oControl.getBindingContext().getIndex() === iRow;
						},
						id : /partDelete|partId|partState|description/,
						success : function (aControls) {
							var sDescription = aControls[0].getValue(),
								bDeletable = aControls[1].getEnabled(),
								sPartId = aControls[2].getValue(),
								sState = aControls[3].getTooltip();

							Opa5.assert.strictEqual(aControls.length, 4, "exactly 4 controls");
							Opa5.assert.strictEqual(sPartId, sExpectedPartId,
								"Row: " + iRow + ", Part ID: " + sPartId);
							Opa5.assert.strictEqual(bDeletable, sExpectedState !== "Inactive",
								"Row: " + iRow + ", deletable: " + bDeletable);
							Opa5.assert.strictEqual(sState, sExpectedState,
								"Row: " + iRow + ", state: " + sState);
							if (sExpectedDescription) {
								Opa5.assert.strictEqual(sDescription, sExpectedDescription,
									"Row: " + iRow + ", description: " + sDescription);
							}
						},
						viewName : sViewName
					});
				},
				checkPartIdErrorState : function (iRow, sMessage) {
					Helper.checkValueState(this, sViewName, /partId/, "Error", sMessage, false,
						iRow);
				}
			}
		}
	});
});
