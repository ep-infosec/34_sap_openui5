sap.ui.define(["sap/ui/Device"], function (Device) {
	"use strict";

	return {
		name: "P13n related tests", /* Just for a nice title on the pages */
		defaults: {
			group: "Personalization",
			qunit: {
				version: 2
				// Whether QUnit should be loaded and if so, what version
			},
			sinon: {
				version: 4
				// Whether Sinon should be loaded and if so, what version
			},
			ui5: {
				language: "en-US",
				rtl: false, // Whether to run the tests in RTL mode
				libs: [
					"sap.ui.mdc"
				], // Libraries to load upfront in addition to the library which is tested (sap.ui.mdc), if null no libs are loaded
				"xx-waitForTheme": true
				// Whether the start of the test should be delayed until the theme is applied
			},
			coverage: {
				only: "[sap/ui/mdc]", // Which files to show in the coverage report, if null, no files are excluded from coverage
				branchCoverage: true
				// Whether to enable standard branch coverage
			},
			loader: {
				paths: {
					"delegates": "test-resources/sap/ui/mdc/delegates",
					"sap/ui/demo/mock": "test-resources/sap/ui/documentation/sdk/",
					"sap/ui/mdc/integration": "test-resources/sap/ui/mdc/integration"
				}
			},
			page: "test-resources/sap/ui/mdc/qunit/teststarter.qunit.html?testsuite={suite}&test={name}",
			autostart: true,
			module: "./{name}.qunit"
			// Whether to call QUnit.start() when the test setup is done
		},
		tests: {
			"FlexModificationHandler": {
				group: "Modification Handling",
				module: "./modification/FlexModificationHandler.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"PersistenceProvider": {
				group: "Silent Persistence",
				module: "./PersistenceProvider.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"Engine": {
				group: "Engine",
				module: "./Engine.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"DefaultProviderRegistry": {
				group: "Silent Persistence",
				module: "./modules/DefaultProviderRegistry.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			/*
			//TODO: needs to be reworked
			"BaseController": {
				group: "SubController (generic)",
				module: "./controllers/ControllerGeneric.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"SortController": {
				group: "SubController (generic)",
				module: "./controllers/ControllerGeneric.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"GroupController": {
				group: "SubController (generic)",
				module: "./controllers/ControllerGeneric.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"ColumnController": {
				group: "SubController (generic)",
				module: "./controllers/ControllerGeneric.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"FilterController": {
				group: "SubController (generic)",
				module: "./controllers/ControllerGeneric.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"FilterController2": {
				group: "SubController (specific)",
				module: "./controllers/FilterController.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"AdaptFiltersController": {
				group: "SubController (generic)",
				module: "./controllers/ControllerGeneric.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"ActionToolbarController": {
				group: "SubController (generic)",
				module: "./controllers/ControllerGeneric.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"LinkPanelController": {
				group: "SubController (generic)",
				module: "./controllers/ControllerGeneric.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},*/
			"TableIntegration": {
				group: "Control Integration",
				module: "./integration/TableP13n.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"FilterBarIntegration": {
				group: "Control Integration",
				module: "./integration/FilterBarP13n.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},/* TO-Do: Check whether this is still needed with new MDC Chart
			"ChartIntegration": {
				group: "Control Integration",
				module: "./integration/ChartP13n.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},*/
			"AdaptFiltersPanel": {
				group: "UI Panels",
				module: "./panels/AdaptFiltersPanel.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"GroupView": {
				group: "UI Panels",
				module: "./panels/GroupView.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"FilterPanel": {
				group: "UI Panels",
				module: "./panels/FilterPanel.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"ChartItemPanel": {
				group: "UI Panels",
				module: "./ChartItemPanel.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"UIManager": {
				group: "P13n logic",
				module: "./UIManager.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"P13nBuilder": {
				group: "P13n logic",
				module: "./P13nBuilder.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"FlexUtil": {
				group: "P13n logic",
				module: "./FlexUtil.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"ChangeContent": {
				group: "P13n Logic",
				module: "./ChangeContent.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"StateHandlerRegistry": {
				group: "state handling",
				module: "./modules/StateHandlerRegistry.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc"
					]
				}
			},
			"StateUtil": {
				group: "state handling",
				module: "./StateUtil.qunit",
				ui5: {
					libs: [
						"sap.ui.mdc", "sap.ui.fl"
					]
				}
			},
			"PersonalizationChart": {
				group: "Chart UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"PersonalizationChartVariants": {
				group: "Chart UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"TableP13nGroupJourney": {
				group: "Table UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"TableP13nFilterJourney": {
				group: "Table UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"TableP13nSortJourney": {
				group: "Table UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"PersonalizationTable": {
				group: "Table UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"PersonalizationTableRTA": {
				group: "Table UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"PersonalizationTableVariants": {
				group: "Table UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"TableColumnMenuPersonalization": {
				group: "Table UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"AdaptFiltersJourneyGeneral": {
				group: "FilterBar UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"AdaptFiltersJourneyShowHide": {
				group: "FilterBar UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"PersonalizationFilterBarVariants": {
				group: "FilterBar UI Test - variant based",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"PersonalizationFilterBarRTA": {
				group: "FilterBar UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"InternalAndExternalFiltering": {
				group: "FilterBar UI Test",
				autostart: false,
				module: "./OpaTests/P13nOpa.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"SortFlex": {
				group: "changehandler tests",
				module: "./flexibility/SortFlex.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"ItemBaseFlex": {
				group: "changehandler tests",
				module: "./flexibility/ItemBaseFlex.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			}/*,
			"xConfigFlex": {
				group: "xConfig tests",
				module: "./xConfigFlex.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			},
			"xConfigAPI": {
				group: "xConfig tests",
				module: "./modules/xConfigAPI.qunit",
				ui5: {
					libs: [
						"sap.ui.fl", "sap.ui.mdc"
					]
				}
			}*/
		}
	};
});
