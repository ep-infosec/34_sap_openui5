/*global QUnit*/

sap.ui.define([
	"sap/ui/fl/apply/_internal/flexState/ManifestUtils",
	"sap/ui/fl/apply/_internal/preprocessors/XmlPreprocessor",
	"sap/ui/fl/ChangePersistenceFactory",
	"sap/ui/fl/ChangePersistence",
	"sap/ui/fl/FlexControllerFactory",
	"sap/ui/fl/Utils",
	"sap/base/Log",
	"sap/ui/core/Component",
	"sap/ui/thirdparty/sinon-4"
], function(
	ManifestUtils,
	XmlPreprocessor,
	ChangePersistenceFactory,
	ChangePersistence,
	FlexControllerFactory,
	Utils,
	Log,
	Component,
	sinon
) {
	"use strict";

	var sandbox = sinon.createSandbox();

	QUnit.module("XmlPreprocessor", {
		afterEach: function () {
			sandbox.restore();
		}
	}, function() {
		QUnit.test("process xml view is called if cache key could be determined", function (assert) {
			var oView = {
				sId: "testView"
			};
			var sFlexReference = "someName";
			var mProperties = {
				sync: false
			};
			var oMockedComponent = {
				getComponentClassName: function () {
					return sFlexReference;
				}
			};
			var oMockedAppComponent = {
				getManifestObject: function () {
					return {};
				},
				getManifest: function () {
					return {};
				},
				getManifestEntry: function () {}
			};
			var oChangePersistence = new ChangePersistence({name: sFlexReference});
			var oFlexControllerCreationStub = sandbox.stub(FlexControllerFactory, "create").returns({
				processXmlView: function(oView) {
					return Promise.resolve(oView);
				}
			});
			sandbox.stub(Component, "get").returns(oMockedComponent);
			sandbox.stub(Utils, "getAppComponentForControl").returns(oMockedAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReferenceForControl").returns(sFlexReference);
			sandbox.stub(Utils, "isApplication").returns(true);
			sandbox.stub(ChangePersistenceFactory, "getChangePersistenceForComponent").returns(oChangePersistence);
			sandbox.stub(oChangePersistence, "getCacheKey").returns(Promise.resolve("abc123"));

			return XmlPreprocessor.process(oView, mProperties).then(function (oProcessedView) {
				assert.equal(oFlexControllerCreationStub.callCount, 1, "a flex controller was created for processing");
				assert.deepEqual(oProcessedView, oView, "a processed view is returned");
			});
		});

		QUnit.test("xml view is returned even if problem happen when getting cache key", function (assert) {
			var oView = {
				sId: "testView"
			};
			var sFlexReference = "someName";
			var mProperties = {
				sync: false
			};
			var oMockedComponent = {
				getComponentClassName: function () {
					return sFlexReference;
				}
			};
			var oMockedAppComponent = {
				getManifest: function () {
					return {};
				}
			};
			var oChangePersistence = new ChangePersistence({name: sFlexReference});
			var oFlexControllerCreationStub = sandbox.stub(FlexControllerFactory, "create").returns({
				processXmlView: function(oView) {
					return Promise.resolve(oView);
				}
			});
			sandbox.stub(Component, "get").returns(oMockedComponent);
			sandbox.stub(Utils, "getAppComponentForControl").returns(oMockedAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReferenceForControl").returns(sFlexReference);
			sandbox.stub(Utils, "isApplication").returns(true);
			sandbox.stub(ChangePersistenceFactory, "getChangePersistenceForComponent").returns(oChangePersistence);

			return XmlPreprocessor.process(oView, mProperties).then(function (oProcessedView) {
				assert.equal(oFlexControllerCreationStub.callCount, 0, "no flex controller creation was created for processing");
				assert.deepEqual(oProcessedView, oView, "the original view is returned");
			});
		});

		QUnit.test("getCacheKey does return a cache key", function (assert) {
			var sCacheKey = "abc123";
			var sFlexReference = "theAppComponent";
			var mProperties = {
				componentId: sFlexReference
			};
			var oMockedAppComponent = {
				getManifest: function () {
					return {};
				},
				getManifestEntry: function () {}
			};
			var oChangePersistence = new ChangePersistence({name: sFlexReference});
			sandbox.stub(Component, "get");
			sandbox.stub(Utils, "getAppComponentForControl").returns(oMockedAppComponent);
			sandbox.stub(ManifestUtils, "getFlexReferenceForControl");
			sandbox.stub(ChangePersistenceFactory, "getChangePersistenceForComponent").returns(oChangePersistence);
			sandbox.stub(oChangePersistence, "getCacheKey").returns(Promise.resolve(sCacheKey));

			return XmlPreprocessor.getCacheKey(mProperties).then(function (sReturnedCacheKey) {
				assert.equal(sReturnedCacheKey, sCacheKey);
			});
		});

		QUnit.test("getCacheKey disallows view caching in case of an variant by startup parameters", function (assert) {
			var sFlexReference = "theAppComponent";
			var mProperties = {
				componentId: sFlexReference
			};
			var oComponentData = {
				startupParameters: {
					"sap-app-id": ["someId"]
				}
			};
			var oMockedAppComponent = {
				getManifest: function () {
					return {};
				},
				getComponentData: function () {
					return oComponentData;
				},
				getManifestEntry: function () {}
			};
			sandbox.stub(Component, "get");
			sandbox.stub(Utils, "getAppComponentForControl").returns(oMockedAppComponent);

			return XmlPreprocessor.getCacheKey(mProperties).then(function (response) {
				assert.ok(!response, "an 'undefined' was returned to prevent the view caching");
			});
		});

		QUnit.test("detects the app variant id and requests the changes for it", function (assert) {
			var oView = {
				sId: "testView"
			};
			var sComponentName = "someComponentName";
			var sFlexReference = "someVariantName";
			var sValidCacheKey = "someVeryValidKey";
			var mProperties = {
				sync: false
			};

			var oComponentData = {
				startupParameters: {
					"sap-app-id": [sFlexReference]
				}
			};

			var oMockedComponent = {
				getComponentClassName: function () {
					return sComponentName;
				}
			};
			var oMockedAppComponent = {
				getManifestObject: function () {
					return {};
				},
				getManifest: function () {
					return {};
				},
				getManifestEntry: function () {
					return undefined;
				},
				getComponentData: function () {
					return oComponentData;
				}
			};
			var oChangePersistence = new ChangePersistence({name: sFlexReference});
			var oFlexControllerCreationStub = sandbox.stub(FlexControllerFactory, "create").returns({
				processXmlView: function(oView) {
					return Promise.resolve(oView);
				}
			});
			sandbox.stub(Component, "get").returns(oMockedComponent);
			sandbox.stub(Utils, "getAppComponentForControl").returns(oMockedAppComponent);
			sandbox.stub(Utils, "isApplication").returns(true);
			sandbox.stub(ChangePersistenceFactory, "getChangePersistenceForComponent").returns(oChangePersistence);
			sandbox.stub(oChangePersistence, "getCacheKey").returns(Promise.resolve(sValidCacheKey));

			return XmlPreprocessor.process(oView, mProperties).then(function (oProcessedView) {
				assert.equal(oFlexControllerCreationStub.callCount, 1, "a flex controller creation was triggered for the xml processing");
				assert.equal(oFlexControllerCreationStub.getCall(0).args[0], sFlexReference, "the controller for the variant was created");
				assert.deepEqual(oProcessedView, oView, "the original view is returned");
			});
		});


		QUnit.test("skips the processing in case of a synchronous view", function (assert) {
			var oView = {
				sId: "testView"
			};
			var mProperties = {
				sync: true
			};

			var oLoggerSpy = sandbox.spy(Log, "warning");

			var oProcessedView = XmlPreprocessor.process(oView, mProperties);

			assert.equal(oLoggerSpy.callCount, 1, "one warning was raised");
			assert.equal(oLoggerSpy.getCall(0).args[0], "Flexibility feature for applying changes on an XML view is only available for " +
				"asynchronous views; merge is be done later on the JS controls.");
			assert.deepEqual(oProcessedView, oView, "the original view is returned");
		});

		QUnit.test("skips the processing in case of a component whose type is not application", function (assert) {
			var oView = {
				sId: "testView"
			};
			var mProperties = {
				sync: false
			};
			var sComponentName = "someComponentName";

			var oComponentData = {
				startupParameters: {
					"sap-app-id": ["someId"]
				}
			};

			var oMockedAppComponent = {
				getManifest: function () {
					return {};
				},
				getManifestEntry: function () {
					return undefined;
				},
				getComponentData: function () {
					return oComponentData;
				},
				getComponentClassName: function () {
					return sComponentName;
				}
			};

			sandbox.stub(Component, "get").returns(oMockedAppComponent);
			sandbox.stub(Utils, "getAppComponentForControl").returns(oMockedAppComponent);
			sandbox.stub(Utils, "isApplication").returns(true);

			return XmlPreprocessor.process(oView, mProperties).then(function (oProcessedView) {
				assert.deepEqual(oProcessedView, oView, "the original view is returned");
			});
		});
	});

	QUnit.done(function () {
		document.getElementById("qunit-fixture").style.display = "none";
	});
});
