sap.ui.define(["sap/ui/integration/Designtime"
], function (Designtime) {
	"use strict";
	return function () {
		return new Designtime({
			"form": {
				"items": {
					"numberParameter": {
						"manifestpath": "/sap.card1/configuration/parameters/numberParameter/value",
						"type": "number"
					}
				}
			}
		});
	};
});
