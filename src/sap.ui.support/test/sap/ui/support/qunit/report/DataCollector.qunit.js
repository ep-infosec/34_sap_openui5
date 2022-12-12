/*global QUnit, sinon*/

sap.ui.define([
	"sap/ui/core/Core", "sap/ui/support/supportRules/report/DataCollector", "sap/ui/core/Component", "sap/ui/core/Configuration", "sap/ui/core/theming/ThemeManager"
], function (Core, DataCollector, Component, Configuration, ThemeManager) {
		"use strict";

		QUnit.module("Data collector", {
			beforeEach: function () {
				this.DataCollector = new DataCollector();
			},
			afterEach: function () {
				this.DataCollector = null;
			}
		});

		QUnit.test("Location", function (assert) {
			// Arrange
			var sLocationUrl = "https://sdk.openui5.org/nightly/resources/sap/ui/support";
			this.DataCollector.setSupportAssistantLocation(sLocationUrl);

			// Assert
			assert.equal(this.DataCollector.getSupportAssistantInfo().location, sLocationUrl, "Location is correctly set");
		});

		QUnit.test("Info", function (assert) {
			// Arrange
			var oVersion = {
				version: "1.77.0-SNAPSHOT",
				buildTimestamp: "202003270040",
				scmRevision: "67adf13a9d5e2c1c0278b790b21e065da26ce404"
			};

			this.DataCollector.setSupportAssistantVersion(oVersion);

			// Assert
			assert.equal(this.DataCollector.getSupportAssistantInfo().versionAsString, "1.77.0-SNAPSHOT (built at 202003270040, last change 67adf13a9d5e2c1c0278b790b21e065da26ce404)", "Version string is correctly set");
			assert.equal(this.DataCollector.getSupportAssistantInfo().version.version, "1.77.0-SNAPSHOT", "Version is correctly set");
			assert.equal(this.DataCollector.getSupportAssistantInfo().version.buildTimestamp, "202003270040", "buildTimestamp is correctly set");
			assert.equal(this.DataCollector.getSupportAssistantInfo().version.scmRevision, "67adf13a9d5e2c1c0278b790b21e065da26ce404", "scmRevision is correctly set");
		});

		QUnit.test("Application Info 'sap.app'", function (assert) {
			// Arrange
			var ComponentRegistryInitial = Component.registry;
			Component.registry = [
				{
					getMetadata: function(){
						return {
							getManifestEntry: function () {
								return null;
							}
						};
					}
				},
				{
					getMetadata: function(){
						return {
							getManifestEntry: function (type) {
								if (type === "sap.app") {
									return "sap.app";
								}
								return null;
							}
						};
					}
				}
			];

		// Assert
		assert.deepEqual(this.DataCollector.getAppInfo() , ["sap.app"], "App info is OK");

		// Clean up
		Component.registry = ComponentRegistryInitial;
		});

		QUnit.test("Application Info 'sap.fiori'", function (assert) {
			// Arrange
			var ComponentRegistryInitial = Component.registry;
			Component.registry = [
				{
					getMetadata: function(){
						return {
							getManifestEntry: function () {
								return null;
							}
						};
					}
				},
				{
					getMetadata: function(){
						return {
							getManifestEntry: function (type) {
								if (type === "sap.fiori") {
									return "sap.fiori";
								}
								return null;
							}
						};
					}
				}
			];

		// Assert
		assert.deepEqual(this.DataCollector.getAppInfo() , ["sap.fiori"], "App info is OK");

		// Clean up
		Component.registry = ComponentRegistryInitial;
		});

		QUnit.test("Technical Info", function (assert) {
			// Arrange
			var oGetLoadedLibrariesMock = sinon.stub(Core, "getLoadedLibraries").returns(["sap.m"]);
			var oGetThemePathMock = sinon.stub(ThemeManager, "_getThemePath").returns("http://www.example.com/");
			var oGetThemeMock = sinon.stub(Configuration, "getTheme").returns("fiori_3");

			// Assert
			assert.equal(this.DataCollector.getTechInfoJSON().themePaths[0].theme, "fiori_3", "Theme string is correctly set");
			assert.equal(this.DataCollector.getTechInfoJSON().themePaths[0].relativePath, "http://www.example.com/", "Theme path is correctly set");

			oGetLoadedLibrariesMock.restore();
			oGetThemePathMock.restore();
			oGetThemeMock.restore();
		});
});