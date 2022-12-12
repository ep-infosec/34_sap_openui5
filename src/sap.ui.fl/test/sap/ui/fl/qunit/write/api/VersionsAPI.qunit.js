/* global QUnit */

sap.ui.define([
	"sap/ui/fl/write/api/Version",
	"sap/ui/fl/write/api/VersionsAPI",
	"sap/ui/fl/write/_internal/Versions",
	"sap/ui/fl/write/_internal/Storage",
	"sap/ui/fl/registry/Settings",
	"sap/ui/fl/apply/_internal/flexState/FlexState",
	"sap/ui/fl/Layer",
	"sap/ui/fl/Utils",
	"sap/ui/fl/apply/_internal/flexState/ManifestUtils",
	"sap/base/util/UriParameters",
	"sap/ui/core/Control",
	"sap/ui/thirdparty/sinon-4"
], function(
	Version,
	VersionsAPI,
	Versions,
	Storage,
	Settings,
	FlexState,
	Layer,
	Utils,
	ManifestUtils,
	UriParameters,
	Control,
	sinon
) {
	"use strict";

	document.getElementById("qunit-fixture").style.display = "none";
	var sandbox = sinon.createSandbox();

	function stubSettings(sandbox) {
		sandbox.stub(Settings, "getInstance").resolves({
			isVersioningEnabled: function () {
				return true;
			},
			isSystemWithTransports: function() {
				return false;
			}
		});
	}

	QUnit.module("getVersionsModel", {
		before: function() {
			this.oAppComponent = {
				getManifest: function () {
					return {};
				},
				getManifestObject: function () {
					return {
						"sap.app": {
							id: "com.sap.test.app"
						}
					};
				},
				getId: function () {
					return "sComponentId";
				},
				getComponentData: function () {
					return {
						startupParameters: ["sap-app-id"]
					};
				}
			};
		}
	}, function () {
		QUnit.test("Given isDraftAvailable is called", function (assert) {
			var oGetModelStub = sandbox.stub(Versions, "getVersionsModel").returns({
				getProperty: function () {
					return [];
				}
			});

			var sNormalizedReference = "com.sap.test.app";

			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);

			VersionsAPI.isDraftAvailable({
				layer: Layer.CUSTOMER,
				control: new Control()
			});

			assert.equal(oGetModelStub.callCount, 1, "then the model was requested once");
			assert.equal(oGetModelStub.getCall(0).args[0].reference, sNormalizedReference, "the model was requested without '.Component	'");
		});
	});

	QUnit.module("Given VersionsAPI.isDraftAvailable is called", {
		before: function() {
			this.oAppComponent = {
				getManifest: function () {
					return {};
				},
				getManifestObject: function () {
					return {
						"sap.app": {
							id: "com.sap.test.app"
						}
					};
				},
				getId: function () {
					return "sComponentId";
				},
				getComponentData: function () {
					return {
						startupParameters: ["sap-app-id"]
					};
				}
			};
		},
		beforeEach: function () {
			stubSettings(sandbox);
		},
		afterEach: function() {
			sandbox.restore();
		}
	}, function() {
		QUnit.test("when no control is provided", function (assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER
			};

			assert.throws(
				VersionsAPI.isDraftAvailable.bind(undefined, mPropertyBag),
				new Error("No control was provided"),
				"then an Error is thrown"
			);
		});

		QUnit.test("when no layer is provided", function (assert) {
			var mPropertyBag = {
				control: new Control()
			};

			assert.throws(
				VersionsAPI.isDraftAvailable.bind(undefined, mPropertyBag),
				new Error("No layer was provided"),
				"then an Error is thrown"
			);
		});

		QUnit.test("when a control and a layer were provided, but no app ID could be determined", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control()
			};

			assert.throws(
				VersionsAPI.isDraftAvailable.bind(undefined, mPropertyBag),
				new Error("The application ID could not be determined"),
				"then an Error is thrown"
			);
		});

		QUnit.test("when a control and a layer were provided and a draft exists", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control()
			};

			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReference").returns("com.sap.app");
			var aReturnedVersions = [
				{version: Version.Number.Draft},
				{version: "2"},
				{version: "1"}
			];
			sandbox.stub(Storage.versions, "load").resolves(aReturnedVersions);

			return VersionsAPI.initialize(mPropertyBag).then(function () {
				assert.equal(VersionsAPI.isDraftAvailable(mPropertyBag), true, "then a 'true' is returned");
			});
		});

		QUnit.test("when a control and a layer were provided and a draft does not exists", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control()
			};

			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReference").returns("com.sap.app");
			var aReturnedVersions = [
				{version: "2"},
				{version: "1"}
			];
			sandbox.stub(Storage.versions, "load").resolves(aReturnedVersions);

			return VersionsAPI.initialize(mPropertyBag).then(function () {
				assert.equal(VersionsAPI.isDraftAvailable(mPropertyBag), false, "then a 'false' is returned");
			});
		});
	});

	QUnit.module("Given VersionsAPI.isOldVersionDisplayed is called", {
		before: function() {
			this.oAppComponent = {
				getManifest: function () {
					return {};
				},
				getManifestObject: function () {
					return {
						"sap.app": {
							id: "com.sap.test.app"
						}
					};
				},
				getId: function () {
					return "sComponentId";
				},
				getComponentData: function () {
					return {
						startupParameters: ["sap-app-id"]
					};
				}
			};
		},
		beforeEach: function () {
			stubSettings(sandbox);
		},
		afterEach: function() {
			sandbox.restore();
		}
	}, function() {
		QUnit.test("when no control is provided", function (assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER
			};

			assert.throws(
				VersionsAPI.isOldVersionDisplayed.bind(undefined, mPropertyBag),
				new Error("No control was provided"),
				"then an Error is thrown"
			);
		});

		QUnit.test("when no layer is provided", function (assert) {
			var mPropertyBag = {
				control: new Control()
			};

			assert.throws(
				VersionsAPI.isOldVersionDisplayed.bind(undefined, mPropertyBag),
				new Error("No layer was provided"),
				"then an Error is thrown"
			);
		});

		QUnit.test("when a control and a layer were provided, but no app ID could be determined", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control()
			};

			assert.throws(
				VersionsAPI.isOldVersionDisplayed.bind(undefined, mPropertyBag),
				new Error("The application ID could not be determined"),
				"then an Error is thrown"
			);
		});

		QUnit.test("when a control and a layer were provided and a draft exists", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control()
			};

			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReference").returns("com.sap.app");
			var aReturnedVersions = [
				{version: Version.Number.Draft},
				{version: "2"},
				{version: "1"}
			];
			sandbox.stub(Storage.versions, "load").resolves(aReturnedVersions);

			return VersionsAPI.initialize(mPropertyBag).then(function () {
				assert.equal(VersionsAPI.isOldVersionDisplayed(mPropertyBag), false, "then a 'false' is returned");
			});
		});

		QUnit.test("when a control and a layer were provided and display version is equal to active version", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control()
			};

			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReference").returns("com.sap.app");
			var aReturnedVersions = [
				{version: "2"},
				{version: "1"}
			];
			sandbox.stub(Storage.versions, "load").resolves(aReturnedVersions);

			return VersionsAPI.initialize(mPropertyBag).then(function () {
				assert.equal(VersionsAPI.isOldVersionDisplayed(mPropertyBag), false, "then a 'false' is returned");
			});
		});

		QUnit.test("when a control and a layer were provided and display version is not equal to active version", function(assert) {
			sandbox.stub(UriParameters, "fromQuery").returns({
				get: function () {
					return "1";
				}
			});
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control()
			};

			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReference").returns("com.sap.app");
			var aReturnedVersions = [
				{version: "2"},
				{version: "1"}
			];
			sandbox.stub(Storage.versions, "load").resolves(aReturnedVersions);

			return VersionsAPI.initialize(mPropertyBag).then(function () {
				assert.equal(VersionsAPI.isOldVersionDisplayed(mPropertyBag), true, "then a 'true' is returned");
			});
		});
	});

	QUnit.module("Given VersionsAPI.loadDraftForApplication is called", {
		before: function() {
			this.oAppComponent = {
				getManifest: function () {
					return {};
				},
				getManifestObject: function () {
					return {};
				},
				getId: function () {
					return "sComponentId";
				},
				getComponentData: function () {
					return {
						startupParameters: ["sap-app-id"]
					};
				}
			};
		},
		beforeEach: function () {
			stubSettings(sandbox);
		},
		afterEach: function() {
			sandbox.restore();
			Versions.clearInstances();
		}
	}, function() {
		QUnit.test("when no control is provided", function (assert) {
			var oControl = new Control();
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: oControl
			};

			var oLoadVersionForApplicationStub = sandbox.stub(VersionsAPI, "loadVersionForApplication").resolves();

			return VersionsAPI.loadDraftForApplication(mPropertyBag)
			.then(function () {
				assert.equal(oLoadVersionForApplicationStub.callCount, 1, "loadVersionsForApplication was called once");
				var oParameters = oLoadVersionForApplicationStub.getCall(0).args[0];
				assert.equal(oParameters.layer, Layer.CUSTOMER, "and the layer was passed");
				assert.equal(oParameters.control, oControl, "as well as the control was passed");
				assert.equal(oParameters.version, Version.Number.Draft, "and the version number of the draft was passed");
			});
		});
	});

	QUnit.module("Given VersionsAPI.loadVersionForApplication is called", {
		before: function() {
			this.oAppComponent = {
				getManifest: function () {
					return {};
				},
				getManifestObject: function () {
					return {
						"sap.app": {
							id: "com.sap.app"
						}
					};
				},
				getId: function () {
					return "sComponentId";
				},
				getComponentData: function () {
					return {
						startupParameters: ["sap-app-id"]
					};
				}
			};
		},
		beforeEach: function () {
			stubSettings(sandbox);
		},
		afterEach: function() {
			sandbox.restore();
			Versions.clearInstances();
		}
	}, function() {
		QUnit.test("when no control is provided", function (assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER
			};

			return VersionsAPI.loadVersionForApplication(mPropertyBag).catch(function (sErrorMessage) {
				assert.equal(sErrorMessage, "No control was provided", "then an Error is thrown");
			});
		});

		QUnit.test("when no layer is provided", function (assert) {
			var mPropertyBag = {
				control: new Control()
			};

			return VersionsAPI.loadVersionForApplication(mPropertyBag).catch(function (sErrorMessage) {
				assert.equal(sErrorMessage, "No layer was provided", "then an Error is thrown");
			});
		});

		QUnit.test("when a control, a layer and a version were provided, but no app ID could be determined", function (assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control(),
				version: Version.Number.Original
			};

			assert.throws(
				VersionsAPI.loadVersionForApplication.bind(undefined, mPropertyBag),
				new Error("The application ID could not be determined"),
				"then an Error is thrown"
			);
		});

		QUnit.test("when a control, a layer and context parameter were provided and the request returns a list", function (assert) {
			var sComponentId = "sComponentId";
			var sLayer = Layer.CUSTOMER;
			var mPropertyBag = {
				layer: sLayer,
				control: new Control(),
				allContexts: true
			};
			sandbox.stub(Versions, "getVersionsModel").returns({
				getProperty: function () {
					return [];
				}
			});
			var sReference = "com.sap.app.Component";
			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReference").returns(sReference);
			var aReturnedVersions = [];
			var oClearAndInitializeStub = sandbox.stub(FlexState, "clearAndInitialize").resolves(aReturnedVersions);

			return VersionsAPI.loadVersionForApplication(mPropertyBag)
				.then(function () {
					assert.equal(oClearAndInitializeStub.callCount, 1, "and reinitialized");
					var oInitializePropertyBag = oClearAndInitializeStub.getCall(0).args[0];
					assert.equal(oInitializePropertyBag.reference, sReference, "for the same application");
					assert.equal(oInitializePropertyBag.componentId, sComponentId, "and passing the componentId accordingly");
					assert.equal(oInitializePropertyBag.allContexts, true, "and passing all contexts as true");
				});
		});

		QUnit.test("when a control and a layer were provided and the request returns a list of versions", function (assert) {
			var sComponentId = "sComponentId";
			var sLayer = Layer.CUSTOMER;
			var mPropertyBag = {
				layer: sLayer,
				control: new Control(),
				componentData: {},
				manifest: {},
				version: Version.Number.Draft
			};

			var sReference = "com.sap.app.Component";
			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReference").returns(sReference);
			var aReturnedVersions = [];
			var oClearAndInitializeStub = sandbox.stub(FlexState, "clearAndInitialize").resolves(aReturnedVersions);

			return VersionsAPI.loadVersionForApplication(mPropertyBag)
				.then(function () {
					assert.equal(oClearAndInitializeStub.callCount, 1, "and reinitialized");
					var oInitializePropertyBag = oClearAndInitializeStub.getCall(0).args[0];
					assert.equal(oInitializePropertyBag.reference, sReference, "for the same application");
					assert.equal(oInitializePropertyBag.componentId, sComponentId, "and passing the componentId accordingly");
					assert.equal(oInitializePropertyBag.version, Version.Number.Draft, "and passing the version number accordingly");
				});
		});

		QUnit.test("when a control and a layer but no version were provided and the request returns a list of versions", function (assert) {
			var sComponentId = "sComponentId";
			var sLayer = Layer.CUSTOMER;
			var mPropertyBag = {
				layer: sLayer,
				control: new Control(),
				componentData: {},
				manifest: {}
			};

			var sActiveVersion = 1;
			sandbox.stub(Versions, "getVersionsModel").returns({
				getProperty: function () {
					return sActiveVersion;
				}
			});

			var sReference = "com.sap.app.Component";
			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReference").returns(sReference);
			var aReturnedVersions = [];
			var oClearAndInitializeStub = sandbox.stub(FlexState, "clearAndInitialize").resolves(aReturnedVersions);

			return VersionsAPI.loadVersionForApplication(mPropertyBag)
			.then(function () {
				assert.equal(oClearAndInitializeStub.callCount, 1, "and reinitialized");
				var oInitializePropertyBag = oClearAndInitializeStub.getCall(0).args[0];
				assert.equal(oInitializePropertyBag.reference, sReference, "for the same application");
				assert.equal(oInitializePropertyBag.componentId, sComponentId, "and passing the componentId accordingly");
				assert.equal(oInitializePropertyBag.version, sActiveVersion, "and passing the version number accordingly");
			});
		});
	});

	QUnit.module("Given VersionsAPI.activate is called", {
		before: function() {
			this.oAppComponent = {
				getManifest: function () {
					return {};
				},
				getManifestObject: function () {
					return {};
				},
				getId: function () {
					return "sComponentId";
				},
				getComponentData: function () {
					return {
						startupParameters: ["sap-app-id"]
					};
				}
			};
		},
		afterEach: function() {
			sandbox.restore();
		}
	}, function() {
		QUnit.test("when no control is provided", function (assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER
			};

			return VersionsAPI.activate(mPropertyBag).catch(function (sErrorMessage) {
				assert.equal(sErrorMessage, "No control was provided", "then an Error is thrown");
			});
		});

		QUnit.test("when no layer is provided", function (assert) {
			var mPropertyBag = {
				control: new Control()
			};

			return VersionsAPI.activate(mPropertyBag).catch(function (sErrorMessage) {
				assert.equal(sErrorMessage, "No layer was provided", "then an Error is thrown");
			});
		});

		QUnit.test("when no version title is provided", function (assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control()
			};

			return VersionsAPI.activate(mPropertyBag).catch(function (sErrorMessage) {
				assert.equal(sErrorMessage, "No version title was provided", "then an Error is thrown");
			});
		});

		QUnit.test("when a control and a layer were provided, but no app ID could be determined", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control(),
				title: "new Title"
			};
			sandbox.stub(Utils, "getAppComponentForControl").returns(undefined);

			assert.throws(
				VersionsAPI.activate.bind(undefined, mPropertyBag),
				new Error("The application ID could not be determined"),
				"then an Error is thrown"
			);
		});

		QUnit.test("when a control and a layer were provided and the request returns a list of versions", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control(),
				title: "new Title"
			};
			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReferenceForControl").returns("com.sap.app.Component");
			var aReturnedVersions = [];
			sandbox.stub(Versions, "activate").resolves(aReturnedVersions);

			return VersionsAPI.activate(mPropertyBag)
				.then(function(oResult) {
					assert.equal(oResult, aReturnedVersions, "then the returned version list is passed");
				});
		});
	});

	QUnit.module("Given VersionsAPI.discardDraft is called", {
		beforeEach: function() {
			this.oAppComponent = {
				getManifest: function () {
					return {};
				},
				getManifestObject: function () {},
				getId: function () {
					return "sComponentId";
				},
				getComponentData: function () {
					return {
						startupParameters: ["sap-app-id"]
					};
				}
			};
			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);
		},
		afterEach: function() {
			sandbox.restore();
		}
	}, function() {
		QUnit.test("when no control is provided", function (assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER
			};

			return VersionsAPI.discardDraft(mPropertyBag).catch(function (sErrorMessage) {
				assert.equal(sErrorMessage, "No control was provided", "then an Error is thrown");
			});
		});
		QUnit.test("when no layer is provided", function (assert) {
			var mPropertyBag = {
				control: new Control()
			};

			return VersionsAPI.discardDraft(mPropertyBag).catch(function (sErrorMessage) {
				assert.equal(sErrorMessage, "No layer was provided", "then an Error is thrown");
			});
		});

		QUnit.test("when a control and a layer were provided, but no app ID could be determined", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control()
			};

			sandbox.stub(ManifestUtils, "getFlexReferenceForControl");

			assert.throws(
				VersionsAPI.discardDraft.bind(undefined, mPropertyBag),
				new Error("The application ID could not be determined"),
				"then an Error is thrown"
			);
		});

		QUnit.test("when a control, a layer and a flag to update the state were provided and the request returns a list of versions", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control()
			};

			var sReference = "com.sap.app";
			sandbox.stub(ManifestUtils, "getFlexReferenceForControl").returns("com.sap.app.Component");
			var oClearAndInitStub = sandbox.stub(FlexState, "clearAndInitialize").resolves();
			var oDiscardStub = sandbox.stub(Versions, "discardDraft").resolves({backendChangesDiscarded: true, dirtyChangesDiscarded: true});
			return VersionsAPI.discardDraft(mPropertyBag)
				.then(function(oDiscardInfo) {
					assert.equal(oClearAndInitStub.calledOnce, true, "then the FlexState was cleared and initialized");
					assert.equal(oDiscardInfo.backendChangesDiscarded, true, "then the discard outcome was returned");
					assert.equal(oDiscardInfo.dirtyChangesDiscarded, true, "then the discard outcome was returned");					var oCallingPropertyBag = oDiscardStub.getCall(0).args[0];
					assert.equal(oCallingPropertyBag.reference, sReference, "the reference was passed");
					assert.equal(oCallingPropertyBag.layer, mPropertyBag.layer, "the layer was passed");
				});
		});

		QUnit.test("when a AppComponent was found", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				control: new Control()
			};

			var sReference = "com.sap.app";
			sandbox.stub(ManifestUtils, "getFlexReferenceForControl").returns(sReference);
			var oClearAndInitStub = sandbox.stub(FlexState, "clearAndInitialize").resolves();
			var oDiscardStub = sandbox.stub(Versions, "discardDraft").resolves({backendChangesDiscarded: true, dirtyChangesDiscarded: true});
			return VersionsAPI.discardDraft(mPropertyBag)
				.then(function(oDiscardInfo) {
					assert.equal(oClearAndInitStub.calledOnce, true, "then the FlexState was cleared and initialized");
					assert.equal(oDiscardInfo.backendChangesDiscarded, true, "then the discard outcome was returned");
					assert.equal(oDiscardInfo.dirtyChangesDiscarded, true, "then the discard outcome was returned");
					assert.deepEqual(oDiscardStub.getCall(0).args[0].reference, sReference, "the reference was passed");
					assert.deepEqual(oDiscardStub.getCall(0).args[0].layer, Layer.CUSTOMER, "the layer was passed");
				});
		});
	});

	QUnit.module("Given VersionsAPI.publish is called", {
		beforeEach: function() {
			this.oAppComponent = {
				getManifest: function () {
					return {};
				},
				getManifestObject: function () {
					return {};
				},
				getId: function () {
					return "sComponentId";
				},
				getComponentData: function () {
					return {
						startupParameters: ["sap-app-id"]
					};
				}
			};
			sandbox.stub(Utils, "getAppComponentForControl").returns(this.oAppComponent);
		},
		afterEach: function() {
			sandbox.restore();
		}
	}, function() {
		QUnit.test("when no selector is provided", function (assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER
			};

			return VersionsAPI.publish(mPropertyBag).catch(function (sErrorMessage) {
				assert.equal(sErrorMessage, "No selector was provided", "then an Error is thrown");
			});
		});
		QUnit.test("when no layer is provided", function (assert) {
			var mPropertyBag = {
				selector: new Control()
			};

			return VersionsAPI.publish(mPropertyBag).catch(function (sErrorMessage) {
				assert.equal(sErrorMessage, "No layer was provided", "then an Error is thrown");
			});
		});
		QUnit.test("when no version is provided", function (assert) {
			var mPropertyBag = {
				selector: new Control(),
				layer: "CUSTOMER"
			};

			return VersionsAPI.publish(mPropertyBag).catch(function (sErrorMessage) {
				assert.equal(sErrorMessage, "No version was provided", "then an Error is thrown");
			});
		});
		QUnit.test("when a selector, a layer amd a version were provided and the reference can be determined", function(assert) {
			var mPropertyBag = {
				layer: Layer.CUSTOMER,
				selector: new Control(),
				version: "abc"
			};

			var sReference = "com.sap.app";
			sandbox.stub(ManifestUtils, "getFlexReferenceForControl").returns(sReference);
			var oPublishStub = sandbox.stub(Versions, "publish").resolves("Success");
			return VersionsAPI.publish(mPropertyBag)
				.then(function(sMessage) {
					assert.equal(sMessage, "Success", "a message was returned");
					assert.deepEqual(oPublishStub.getCall(0).args[0].reference, sReference, "the reference was passed");
					assert.deepEqual(oPublishStub.getCall(0).args[0].version, "abc", "the version was passed");
				});
		});
	});
});
