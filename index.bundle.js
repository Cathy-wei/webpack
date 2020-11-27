/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "a77ec35644692113dfbe";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.jsx","vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".text-center {\r\n    text-align: center;\r\n}", "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;AACtB","sourcesContent":[".text-center {\r\n    text-align: center;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/assets/imgs/pic1.png":
/*!**********************************!*\
  !*** ./src/assets/imgs/pic1.png ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/assets/imgs/pic2.png":
/*!**********************************!*\
  !*** ./src/assets/imgs/pic2.png ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAfrklEQVR4Xu1dW24UORc+rqQR0B39IM00j5N5I3mZsALCCggrIKyAsIIJKyCsgM4KCCuYzAomeUl4IzzSMxIgQoJIUufXcVV1qqtdvtXN1eWWRhoR22Uf+/O5+FwY+J+ngKdALgWYp42ngKdAPgU8QPzp8BSQUMADxB8PTwEPEH8GPAXsKOA5iB3dfK+OUMADpCMb7ZdpRwEPEDu6+V4doYAHSEc22i/TjgIeIHZ08706QgEPkI5stF+mHQU8QOzo5nt1hAIeII5s9Pnn+8tXF+wxY+wOTQkxPOn3frxjd0++ODLFTk7DA6ThbcfPy3e+X9x+BQCb4qngTr93/tIDpZmN8gBphu78q6fj1TUE+IsBcK4h+R30e2ePPEjq3ywPkPppzr8Yc46/AGBNbwq4PxgeP9Jr61uVRQEPkLIoaTjOt0+r24zBnybdkIWPln59v2/Sx7ctRgEPkGL0s+odKeTBB/POuDsYHufoKuaj+R5qCniAqGlUeovT8coIgD21GPhgMDx6YNHPd7GkgAeIJeFsu3379/46w4B0D6vfYHjk98yKcnadPLHt6Gbd63S88hcAW7cdwAPElnJ2/TxA7Ohm1ev7fysbGLK3Vp3jTh4gRahn3tcDxJxm1j1OP618AMaWrQcAAA+QItQz7+sBYk4zqx6n4/ubAMEbVWcE/MqA/S+vnQeIioLl/t0DpFx65o6mzz1wFwE28kDiAVLThsWf8QCpgd663IOmwgJ8EoawxYA9FE3NA6SGDUt9wgOkBnrrcg8Sr5aGx3dkr+weIDVsmAdIfUQ24R4A0Uu5rI8HSH17xzl6vZ/r3tdOx6v/6Dskhs8Gw/cj8vIFAOo38/MAqfcMeYBUSG/ZQRd9dqEX/n7r7vsT+tvpeBVFbfq9s7ve7b3CTcsM7QFSIa0Nfa4OB8Ojiev7t/HKvkhR9x69FW6YYGgPkArp/W28+lkjGCqeAb4eDI+3kunkKeoeIBVumAdIfcQ1dSsh827/l+O9CUBynBo9QOrbw9Yp6RSF9+Py5h+3fn3/d71kMv/a6XhlB4A91+0pUr5FeggivFy6d7StO65vV4wCzotYBIqzy9vPMcTNtB8TIu5BgK9djbAzsV4hwrule0cb2a389ml1jzF4nP53D5BiB960t9MAiSPvyPtVErcdmUZNF15l+zje/LP2Nxi+GPx6vJNtf/rvyhYgo4wnqd+0rqL9Dd/QigLOAsQsqYFbIDENikqbd9O7KArNRcC/l4bH1vEkVqekgk6RCRwfIsI6Y0lWF3bCAtjr/3L0roJPWg3pLEDMkxq4AxLDuU+Zd2fErIy5t60AicAODxHZBjC2LrXuIZ5ggM9cEJ+dBYiJDH99qNwAiZGCniNeJWvKup0gwJel4dFdq+uw5k6RFHDzMQDbtIuibH4/XQaI8CVZtcdZc6mqfRV/z3vkE30rT7xKt/02XvmSdn933d0kTqP6HIFt6r8DiXeiabN26wBCNygAsrx4Cfo7A3g0GB4dVHH4dcbUBgjix8G9Y2WEYVZka/rQ5NEg1pko11eZqYkazeTSOoBEm4O7iOwkL/Fa0yDRBYiuyZZEldOLWyfJpeACl5yyq8Wm+BApjkWZRlXnjsm2edDUhecsQERvAGmqkWhyeQnLgGxPxE2aBIkuQHTEq2TNaS6iCyybk2jah1vsQvamaKy97LtNrtdZgIjfAKbuLe67xG/Xn7dH2Qc1zmcaErd0AGJqjUpzkbyHRdPDXbT96XjlFQCb+I/ZjhfvkySBd3MZJZ0FiCo9JxF10Dv7PXH9jm+yETD22xSMGgCJDkAAzC00Ey6CeDK4d/y77YEs2i+yTt16a2eZsvm6B4iQaqefVk6yB37q8Av8kugQAUOK6Z5kBqmbk6gAkoTWmh6VNBdpypIVx7hQdhbNrPSmq5xt70WsHBqq3hOyXCQZJha7ttJAobZBgM/SHrPFt048gkx/4ml9GGyLXEt05kPgo8NJses67ctsY1DPpMzP0lheSRdRVCciT3a7iIBiI9qY7rb8Jd3elyriILc/MMB3dWd5J5H38iL4pyIrVS6JTXU1071StXdWB0kmrhSzMrqIaMFZoJAn8ODG+bOqQldV+hMAxjU+uKmah9hSTcKF+P+vMPiaNWumSrU96PfO1quaex79vl/cNij2Izl2iB9lYvO0/siT6K03ZeKlubgPEI24ChMZlbtuINtGxv4HLHxSlb+PYbit6iKDKOMi7PV751t1goMmZuf2M70k4gQMkIwod2Y9lAV6R5RhslFwtAQg+Rk+0mQ1eVOINj0CCjD4AMBelH1LxTc+cYo/lKcf4JC4CgtgP0T8UhVoNeYx0+R0vEoKudXLeAJqALZD9NURmTk3dQQcrQAIP8wKa1a0q3Y1/NJAQYYvyzycsjcazcN6AIBJGWj6/wOAgLx/a3GjMcvpdb0ieqdhLNzr937spbmdDidyCRytAYiu+3gRF4wJUOgCY+xJGYfw/N/7D6+QbZThtCcQQog77QGwv8uYa3Z83ds+6ZcHiuTvOnvoGjhaAxC10htvA+JJ/8b5A1sZPRGLEOC3xV74IMlRpXnb82ZxsNTTKAF1JX5JAqzgCTAOlt0ywKJpsZqIhSrTue7+ueiE6bySnrqBZuKzxQfX3owaK6RxVkP919u8uHkTYJXXlixkOBoM3+/ajimqgnWtT+B+VnRSfefbp5W3jLGZmPvpfuaeBarvlvH31gDERB4uJmrFRgENd44EGBV6sdrvMeIJC9io/+vRS5NBZm973I3CYK9TEpmMpxV+rAgaM/le2W1bAxAuvmQCh/KIkffCrkO8tNUmz50j9kX6swxHPZ05FWpDQFmAF7oHPOUkeljGe4taMdfn1IXoYNm5VQBRuZ5M08DMqnU6vv80MvtGJdLyXnCpHUKwU5t+YbmxAkVlX8ecfZ3wrrjIo+L6rngly0jcKoDoKnuTBWuwbn4gruDVbDzD9AGJw0jf1OfBWhoyMgPh1mB4/Dpv9GsaFweIIvVqKRyqKiol47YKIFzMEiRTUxBJ6OgWp52heIaZFDpZ7kE3IULwqn1cQ0wZlatNzKkf9ntnj2wtgjLu4aI5N+8MtQ8gOTlrJSA5SG/0xOKEIEvfyUGV8n+yekmu+nYrMr4qBCB2lfljoRc+sTF3y6pqFTGiFFmzTd/WAYQWeTpepZdkHReOhCajwfDomV4sQ1LliVuzaot7oFsVAHJfyBnCsq6Tn+5BiEASvsjLTJk8nrIF2NJV8qP9ya/oa+I3p7uOKtu1FCB6JZUzhBupHu/okA5658vfL24vI8BfVYhUHAjI6BX8IFhA/p/JDc3dVy5vrjFga4AUtMQIyCaXheA85esbsU5Cb1BvdU3GEu4hTZJX5UG3HbuVAOG3lJZ/VkwWbRdrfA3ACEhlg+MQGI4IGGW8dGc3O07QtkH6lKyEtOyQKONqLm7tAcJnVZhAXtmHNukdaTq1FyASNp5eoDohwHXrqAQze1MG54hfnkcEuCpAITvs0SEFAsxTs5tTbrmKDSQU8/8sb025RhQNi6LZXOtp3VqAGHMRNT1J/i8eZ825FW67kHFeHFGpIkQ+SNK+aqLw5bys9k1HBapWLPt7qwGi5cZQhDomfR0ChkgEO/15eypGX3ooMtWupjhyKokdxdan9RJRqibipIs9XDPRs0zIXnXbVgMkspiskBhjKEqUR9ZY6d4Z3DjbsX0zKG828pFiF5ltVeUrEktl3szpi4neVBZv4Iuri4CSSMxY/dpmtcpSsPUAyablrOuw0XdIdFjs4WbbbscoOwnuiKropugnzYmrE98BAK2zWs0dQGhBpgUzywBR229GooH6kMtDB2TvUW21Ws0lQPQ2uwxYuBUvXcaK+OMp1XvMZKRMxpa9eueFFEcJGthW3da7MugxtwCpSR9phYOd6UGRJpjQiNLkEYiXsBwwdgdDdjIPwJhcEKbEdL195FjISL6epB4tY87kmj24cbbpuiJuu9ZYgafS1TMGj3kQJ23p0nolXbRwvtmXtyitDzkZTtwwiPUDsi+iTPAyArYhbsH2AGT75VkFTdMqlTWfpseZS4DIiCqKt1ZswlyKVQoaCUznZgFoTR/ssr7fKYCoItwERO0cOBIaiDLUu5h1pCwg5I3TLYB8WvmgWwkp8eydV51DdbDEinv3uEhnAGLBPRpLua86vHX9PX5Q3E8bPLqmi3QIIKv/aDsjttTztArgzF4sbmchKZsGnQCIoVNj690jyj4kWctWv3d2tyuiZycAYujQ2HnRKguwWX+34hlPygZxVePNPUDyYhSE7yeCmodVEb5t42Zc2aWOjG1bm2y+cw8QdTnpiDxdt1rpHOqMc2InOO3cA0RVcTY5GF12p9ABB7WZ0uUMDBnExX9c3ow8GhbhY5vCA+YaILrileceuhC5TpahE0YbhyH8OWM9RCrXQJldQsoU/85lhX+uAaL/9lGsZIL+8Wp/yzRNZdYsw9JtB4zBHncIral6lu5OzDlA9MJxu/b4pXs4hIaMdEx6Tuy6OhBLMgPOXWBnoYfvXBDF5hwg6sdBHVGhyIGax75Jln2R3macYFxOoBEAvG6Sq8wtQHT1D4Du2PTLAmsS4iwKAzArUaE7I9wvu8Cq7pfnFiC6r+devNI9KtPteDEjyrR47/j39F90rYZ2X8X9hR4+q1P0aiVAiDuoLB+acrB3K7E7qZN0S1lF/XS8ivlDRuXcwiueTxgYQ8qBTAWLKNewSQToaKEXvqwDKM4DJLGhhxCshyGuAWPrk9Sgkjp8eqzeW68s8THJ4J6NEZHlTFbpe8T1Ka6dAJSAR5aaiBLX3V48e626LG3XyEFcpHPZfcm9mgXwG2UtJzAwSgUal0RTfGvG9UGH1bepTkXZtC46XiLCZgGionte3UfZfJKkEBAG6wScdEZ7SnIXMNipCiilAeT83/sPZYu8QlhmLOD1/+iHVO8C+GIpI1/hnLhZi4pqo+JpdMJdoigY8vqTOGVB91JozgshXd1apyTdlNEegCED3O73znfL5CiFABKb9OiltPEKTHSTLA2P7iabKZeFo1Y2t1lVh62N45JvFiLsLd07mlTrUl1MVXHtJKM9AntMHCVYDHfL0FGsAUIsFjB4W0apANPDwbOTMNzm8moIo0TBS7N7FUBU8rDpnLrYnsBANU/SAFGFFlTt85bJaP+2qDJvBZAoFLP0IjMaZwx3keFo6df3VKGJ/zLWqgn79gDRIGfBJkR7YLi+NDyeFEJVWw/riUicTtRt/9ZlBxCD5AcF94C68+pMC4u4J2KZ6feOtMikBAjCu6V7RxslzK+zQ4gAorIe1s25aT4I7Omgd/a7jW5iDBB9B8AC5wbxIwIbLd4IRyo5MgWQqTcNDYC8TIsGBWbb2a5CDjJeoSQPuQYbGUBIpw2vgj/Iijkx4kTFSyPjTuSndZIQnJFHMKNaj+Fh3jm5Ph92XMQCIHoOgCanJilsyQLcz+MUsvFia8oUR/AAMdkBu7YUjIYIG1MilhIg08aU7/+tPubl4hDXNU36ksniPoEmgHD/5uKPQ+IY3z6tvGWMbdjqPsYAUVkptEgdcQgqecbdnIs6o4nMjR4gWjtRqFGkb+DyYHg8sWJqno8HAPBcVXW40OQmHCfiPrbWs9oAwotpMnzZXzwf2ciCCg4yY270ACl8vJQDcBELAKbNvKufm7BsSieL+HFw73jyBqdcWKpBbQBJffMAAEdlPuiIzI2qm8yW5ZoQd97bigCiupjqpknRQj7GAFFZKXQJEJdn3ivD3z8qPRzupSvLqgACUI+5UZcebWyXBYh+iEH1q43LcO8t9HBbZeiRzcYYICUHxMRzK+bvL77J5MaEus2N1R+J+r/AOTfD7fS7VPMcJPIY7v9yTJdv4Z8xQOiLqtdS+1nZAYVbU0J2Z0oW5gokkBuM+Id4ko1lsJ93N3sSQLJFTHmciJnrenHiUQnuAHaq0G+tACIt2VV8uWTwNgqMiWzdbHPKmsL/LfhLNh3vi1Vss4hbZGlY3eUpmuusZ0WxFc32tgIIDROno9xTlBIuNF9df39eiBLgzWB4ROZD/tMUBUvxLC20yJZ2Ti7JwfBoyhNbk+7Wq6YwX9I3+70fe2VbQ0WTsgZIMlj8WLRdFVuNlPlwazB8vyujqug2U7N7u9dV692do46J92yaa0/OxHiFah0+L2u5vGoug70qRCjVHAsDJOEm3y9uCQtAqiZg8PcDZOGLtEKY7isECLduweP8b3hLlgH9p5pG1kw8SFsOp/ejgMcF6RQM9lgA+7cXzvfr4BR5dCgFIGmx5vJnsGNaJNNsk2YV+ST/7ow8/O/KFiB7JRm/M0mYzWisbn06Xv1noRc+kZlQ1Z690XcSk2yke8J+EbOseuZmLUoFyDWLJZ0At0Qlhc2mJ2kdx6Mj4h0ARj5BM965OvKwz2piviOcrj/Zvs7rNA+X/RlsMkZRf3HF4djViHzvKJ6kqKuR+Qr0e1QCkAxH2WSAm8DYb/rTMmspey2VJRHgXzFIwmw2q/ltHXFsIB+srfldZbSySgEyLZNyrrIJCBtlgoUrcMC28m4hjZd/L2YZnnISrwDgmcs3v+GScpvXBpD0DCK/f7bG8yMxpGg0aV4k7g4PQN6/hOgDRPaFBfhFhz17MausoxKNw03qiHs64lW5X25mtEYAUvdSvV9WeRSPODIlvJh/8apWEau8LTIfSScKskuFKc0pGPVIuHGXDBud4CCzRShnj4h3f1fDhtxIELnPW2di+TsBENp6lU2eXuxtA/vVR6v9LRLukc2k2P6VyVfQGYDocBEAn6s377jETohrWd8rD5A5ooCKi9BSuyRf625tXh5e3f5tbtcZDkKbxD1Qf946kL/D4P5gePyozZta5txjmv2DDD6ms5eU+Q2Xx+oUQGgjkupI0k3xr+sT8qQeWjsZGtA5gMQKu8LLl5+PTh6I9MVxfZl0VzfrJED0FHY46PfOHjXpat2k6DHJv4z4tX/jfK2rdOgkQOjg6Twekvt1F/WROFqQwpXXumbWzV5KnQVIBBKtoJ7RYHj0rMnbvM5vp8Hhzd41evPWtcncEfIyeIqU6zX6HSz08HVeEA4VgZnEKeRPshMgmQYHHPZ7Z+tdFa2SozBXHITEJoTglTj1JW4NhsevsxjgAT0X7EAjpn6uQTIlVgF+HfTOl7sODjorcwMQnbroeQmMI4UUKW2/qhTxXIIkdiN5m6oVqbTgRZlkwj+iCyeg0hM8HGHefnMDkFNRUR8K7WRwkqQmIn+rxV74QCRu6YME9/u98yfzcrvOVguTZ3qJQmjZKyopMA0Gs1xmbQHSXABE6EKSyuidBPlEL+j5limtR0TaWV7IhT1p+615Ol55DsB4fEf00wDHRfCPJHv73JnGWw+Q/IjB6cetdKI7mWs7gSRdGDTvpovydeG2SK9x/XaMaMbeALBJbUEVODIK/PUSs1waYa4qd7UeIKfjlb+mNzrauzynw2vXifzbUl/ciqxkbYrPJq6BwLanuYCcc+SBI51JJqp6zCjT5v/myeGz1QCReOdO1SvM3uiRtYvtMCDL1vuR6MY3zT+smya1Ke5yOr7/FJBtp8uc8Vh/hht5yfi4NEkOnhe3+aOhYO5Tyvy1oWR+EvK1FiBxPl7KriH4qVOKXusl8CpPTIpLCWtnjCSxi4rY3148e+2KEi8CRkyww4VeuCFL0iYv9y0GQeKhMC8v8G0GCIFj9lYzKLcVF50fMQaf+72zF3mHWlcvSZBaZnEgG46TPJaGCFsihZpEo8GNs00ZiGXgIM4jeyeJEzv8MQ9uOq0EiDzXlZp7ZA8dF9UAn2KAz/LEjfhBcWSczT4qXbyz0MN3VabUjBXvxwCMCmqKxCGe4jMIYFNVXEblp6ZTEDPyUAh38kRYG+A30ad1AJFungH3yBL7mkvk6yXUh5uCr2DHKvldZB7epwpIGMLHImbiCBDwECDgecXyQJEyN+32e+dbKtHvdLzyilK55h9GPf0i4UBtj/NvFUDkegc9TxQzMSZJsHWsMLzsG8Mtjdd31cVHRU2/UH3vdENE/m93Mv+2DsD/TcghhMYGRebJiVgoV8aTZkb+WXGZ6DttzqHVGoBE7xi3P+Q9UqnkYtUpTVlsPusCjSvxl7c2IYQtK46iMynLNpSSNVs/UDZUnrn8Wq/CrwzYugnXS8XdGPWzXHIl3VoBEIWpMSaMue4hErMwZG9tKuDGoh+JJrF/UiX7JR30uowA2zE5yDp+bLYRljFdnqerf9VPGfsvtgIgp+PVNwBAymfeT/ruoUMeMociBDsRh9KTs0Xjct3gkm0AcmW5FrAULUsWldGWFRoqdvlQpS9AtpMusqqzJy60cR4gGuAAW5v79/9WH2MIGwiwkRbddKw0OpsXK9KkN6wDwnqJYtghVXciZb+MCkzfxquf8/2rioGD6JRYHW33SYfWVbVxGiCJ0ixbvKhwTl77xBSK0WFdF74RAP5dVXobLpNf3lxjCMuIwXKc2X4y3Wuv4+ts9oDsC7mzMBaekGey7NXb9pDk1TaP33NOyFzb7/14p7KAyekefCAnz/6N8we249iur0g/ZwGissVzpRrw62IP1/LeFyLd5eZjbgqlCEPGluVCPH7sYoKCPICkaRU7Z45k0ZlSI8CnFTJx/4aIe0v3jp8UObR19nUSIDrg4EQS5K9KQIHINmZjFvJJK6tSVeeGNPEttQ4yM6vRQi98afLwOf24W1xsq4tOzgFEFxxkxkyLQqRPhFe4aQKKaSLXu2kE5B+XNyMlfhE+6h62pN8VBl9NLFXS2318fxMgIEOI6U8bKNlYm7boI04BxAAcXLSi3eQJGkJeA1EuPkm2Xvfdw/T0iNrHDpB/il+rcR+AnTAGJ1PiDS9UCmsIbG1Kb6JCpgvwQuU6ojNvdZGh/FF0PJmzcTuy6E6d+dbVxhmA6IIjIgzuknylMP1q0tDepKv5gUkzrfecOAApUc555yDkr+xpBT0df1GG1c3UvT+79khHCSl8YDePLmTuzXgeOB+B6ARAVC4kpgfRoH3h9xODb83UKIn0Htwi69Rg8ceBqXVnItcjngzuHf9uMhcJd9sGYM+tx0I8yXP6FHEp15V2JwBioSRa71+qo5FfURkfzCaWKHrzp83gZcr01p7L00QaZUMI8va5ThHXdB8bB4hOFVrTRWm0rx0cNKesObUwQFLhxlUcskKey9wMPy12yeqzFKWFxp5bNWkcIJp+QFaLE4oRgH8PeucbpuJMGROYeW8oIBpl6VYFQLi2x9+SbhUTuyBKCXT5M9hkDP4U74ubJfCaBwgFK+UQLSFk/EahSuqmcYbrU8hFkzmNH8um/2ZnXs5635p4FGgQaqYJB2TIRrbuMvFD44Eowcb1x9xLFt44QLRzUdnsatxHN5KuwCe0uoqTZZsfChHXzb4LaU3IsFE6dZJhV/3mjhUvahwgVVuwdOKv9XevWMs83zKdAK30l0WxG3UAJJmDPOS5GI1cqzbcOEC48ioUPYoRGgAOkYVbVTj32c4s/zLQr+CU+15UQJ+xWc916iRlPmPj4avSp4wn4kryarNHQuUyD11OFiB0DNQ83ElBzTyvgcHwqNYLzzDBnnLjUg0OXAmwqpWgMgppFrPJHYJEKQjCHZc4hlBRz69HosyoripjXTdAOPfXz4xvAhBoYi2iCToDkIjYWhWf0us4BIaj/uL5qAmzrdGOx43z1yi3sEWPd9LE0Y0dqvgta08ngjKOMZlKRiGiowdIzuni4laUIvO3mSaIH4HBPmVo7/d+7LUFFFMK9r8rW4DsVXZtdHCWhkd380Cnc3k0eaiK+nJNrbtA+iabS0vWxykOMm2p4QVa1njkXRDuLy7Cia5LeNlEKnM8xcOoUMzS9TZoEiBEo7JAUvWbjsl+OgsQk0W0qa3ssOdZb3S4B9GgaYCUBZIy/cqKng0PkKIUtOifHwM+Gw+vyz1cAUhRkNT5nqOzdR4gOlQquY0gLmLyhX7v7G5at9LlHvTuMxgeaWdcLHlJs+pi5MOlnRmfA8vB4qEeIFWfFMH4sui9tFerCfdw7eZNlm3w6n5IAXBlhRGXta0eIGVR0mAceXjr9au6weGi+/e1qzlw+VsJAjmlPp5lNfgRgY0GN852XLRKeoAYHOyymsoe/BJOoMpFPDsXO6/gstakM06SFwzCYJ0skwyDL65xjOw6PEB0drbkNjov4qbuN6YOjyUvaW6H8wBpYGtVAKHDfnURvNUuc+DQw1oD5Kz0kx4glZJXPLgKIPQeogoimx7ZXf2jAfKW+kkPkFLJqTdYBUFiSkdHvZn5Vl4HceAMlBqH78WrSnfUc5BKyZsjYlF8NwZUe7zwz6XgosKLcXAAD5AGNqVMDuKtV9VuoAdItfQVjl4eQJrN0tIA6Wr/pAdI7SQHKA8g4JXzivfPA6RiAouG1wGIOheY5x51bJ0HSB1UznxDByCqaXndQ0Whcv7uAVIOHY1GKZ4LzD8MGhG8QGMPkALEK9JVFhMiG9fFmIkidHC9rwdIQzukcjfJn5b7XrsNkbSSz3qAVEJW9aBxErgDk2TQLiUzUK9wPlp4gDS4j4ZJ1xqpadIgeZz4tAdIw9ugV80JX/d759suRtw1TL7KP+8BUjmJ9T4QWbZwEwGixAvIvgDAweKNcDQP+cD0qOBeKw8Q9/bEz8ghCniAOLQZfiruUcADxL098TNyiAIeIA5thp+KexTwAHFvT/yMHKKAB4hDm+Gn4h4FPEDc2xM/I4co4AHi0Gb4qbhHAQ8Q9/bEz8ghCniAOLQZfiruUcADxL098TNyiAIeIA5thp+KexTwAHFvT/yMHKLA/wGoI5XXuH6v4QAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/imgs/pic3.png":
/*!**********************************!*\
  !*** ./src/assets/imgs/pic3.png ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/assets/imgs/pic4.png":
/*!**********************************!*\
  !*** ./src/assets/imgs/pic4.png ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _pages_Battle_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/pages/Battle.jsx */ "./src/pages/Battle.jsx");
/* harmony import */ var _pages_Popular_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/pages/Popular.jsx */ "./src/pages/Popular.jsx");
/* harmony import */ var _pages_BattleResult_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/pages/BattleResult.jsx */ "./src/pages/BattleResult.jsx");
/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-hot-loader/root */ "./node_modules/react-hot-loader/root.js");
/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_11__);






(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};







 // import { setConfig , hot} from 'react-hot-loader/root';
// setConfig({
//   showReactDomPatchNotification:false
// });

var App = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, App);

    return _super.call(this, props); // this.state = { route: 'Popular' };
  } // handleMenu(key) {
  //   console.log('key', key);
  //   this.setState({
  //     route: key,
  //   });
  // }


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(App, [{
    key: "render",
    value: function render() {
      // const menuItems = [
      //   'Popular',
      //   'Battle',
      // ];
      // const { route } = this.state;
      // let page = null;
      // switch (route) {
      //   case 'Battle':
      //     page = <Battle/>;
      //     // Submit={()=>this.handleMenu().bind(this)} 
      //     break;
      //   case 'Popular':
      //     page = <Popular />;
      //     break;
      //   default:
      //     page = <Popular />;
      //     break;
      // }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Container"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["HashRouter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["ButtonGroup"], {
        "aria-label": "Basic example"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        variant: "secondary"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
        style: {
          textDecoration: 'none',
          color: 'white'
        },
        to: "/Popular/"
      }, "Popular")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        variant: "secondary"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Link"], {
        style: {
          textDecoration: 'none',
          color: 'white'
        },
        to: "/Battle/"
      }, "Battle"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Route"], {
        exact: true,
        path: "/",
        component: _pages_Popular_jsx__WEBPACK_IMPORTED_MODULE_9__["default"]
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Route"], {
        exact: true,
        path: "/Popular",
        component: _pages_Popular_jsx__WEBPACK_IMPORTED_MODULE_9__["default"]
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Route"], {
        path: "/Battle",
        component: _pages_Battle_jsx__WEBPACK_IMPORTED_MODULE_8__["default"]
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__["Route"], {
        path: "/BattleResult",
        component: _pages_BattleResult_jsx__WEBPACK_IMPORTED_MODULE_10__["default"]
      }))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

var _default = Object(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_11__["hot"])(App);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(App, "App", "E:\\reactDom\\src\\components\\App.jsx");
  reactHotLoader.register(_default, "default", "E:\\reactDom\\src\\components\\App.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);


if (true) {
  if (!_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals;

    module.hot.accept(
      /*! !../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css",
      function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css");
(function () {
        if (!isEqualLocals(oldLocals, _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals, undefined)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals;

              update(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__["default"]);
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this)
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bootstrap_dist_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.min.css */ "./node_modules/bootstrap/dist/css/bootstrap.min.css");
/* harmony import */ var font_awesome_css_font_awesome_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! font-awesome/css/font-awesome.min.css */ "./node_modules/font-awesome/css/font-awesome.min.css");
/* harmony import */ var _components_App_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/App.jsx */ "./src/components/App.jsx");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/index.css */ "./src/index.css");
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};







react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], null), document.getElementById('app'));

/***/ }),

/***/ "./src/pages/Battle.jsx":
/*!******************************!*\
  !*** ./src/pages/Battle.jsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _assets_imgs_pic2_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @/assets/imgs/pic2.png */ "./src/assets/imgs/pic2.png");
/* harmony import */ var _assets_imgs_pic3_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @/assets/imgs/pic3.png */ "./src/assets/imgs/pic3.png");
/* harmony import */ var _assets_imgs_pic4_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/assets/imgs/pic4.png */ "./src/assets/imgs/pic4.png");










(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};








var Battle = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Battle, _React$Component);

  var _super = _createSuper(Battle);

  function Battle(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Battle);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "getOne", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var val1, url, res, oneData;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //获取第一个数据
              val1 = _this.oneVal.current.value;
              url = "https://api.github.com/search/repositories?q=".concat(val1, " in:name&sort=stars&order=desc&type=Repositories&per_page=1");

              _this.setState({
                loadingOne: true
              });

              _context.prev = 3;
              _context.next = 6;
              return axios__WEBPACK_IMPORTED_MODULE_10___default.a.get(url);

            case 6:
              res = _context.sent;

              if (!(res.data.items.length == 0)) {
                _context.next = 11;
                break;
              }

              alert("未找到项目");
              _this.oneVal.current.value = "";
              return _context.abrupt("return");

            case 11:
              oneData = res.data.items[0];

              _this.setState({
                getOne: true,
                loadingOne: false,
                one: oneData
              });

              console.log(oneData);
              _context.next = 18;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](3);

            case 18:
              _this.setState({
                loadingOne: false
              });

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 16]]);
    })));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "rmOne", function () {
      //删除获取的数据
      _this.setState({
        getOne: false,
        one: ''
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "getTwo", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var val2, url, res, twoData;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              val2 = _this.twoVal.current.value;
              url = "https://api.github.com/search/repositories?q=".concat(val2, " in:name&sort=stars&order=desc&type=Repositories&per_page=1");

              _this.setState({
                loadingTwo: true
              });

              _context2.prev = 3;
              _context2.next = 6;
              return axios__WEBPACK_IMPORTED_MODULE_10___default.a.get(url);

            case 6:
              res = _context2.sent;

              if (!(res.data.items.length == 0)) {
                _context2.next = 11;
                break;
              }

              alert("未找到项目");
              _this.twoVal.current.value = "";
              return _context2.abrupt("return");

            case 11:
              // this.props.setOne(res.data.items[0])
              twoData = res.data.items[0];

              _this.setState({
                getTwo: true,
                loadingTwo: false,
                two: twoData
              });

              console.log(twoData);
              _context2.next = 18;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](3);

            case 18:
              _this.setState({
                loadingTwo: false
              });

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 16]]);
    })));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "rmTwo", function () {
      _this.setState({
        getTwo: false,
        two: ''
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "battleResult", function () {
      var _this$state = _this.state,
          one = _this$state.one,
          two = _this$state.two,
          battle = _this$state.battle; // console.log("battle:",battle)

      _this.props.history.push({
        pathname: "/BattleResult/",
        query: {
          name1: one.name,
          name2: two.name
        }
      }); // this.props.history.push("/BattleResult",{da:win})

    });

    _this.state = {
      getOne: false,
      //是否获取数据
      getTwo: false,
      loadingOne: false,
      //是否在加载
      loadingTwo: false,
      one: "",
      //获取的数据
      two: "",
      battle: false //是否可以比较 

    };
    _this.oneVal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createRef();
    _this.twoVal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createRef();
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Battle, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          getOne = _this$state2.getOne,
          getTwo = _this$state2.getTwo,
          loadingOne = _this$state2.loadingOne,
          loadingTwo = _this$state2.loadingTwo,
          one = _this$state2.one,
          two = _this$state2.two; // const {win}=this.props;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Container"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("br", null), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h3", null, "Instructions"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", null, "Enter two Github users"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("img", {
        src: _assets_imgs_pic2_png__WEBPACK_IMPORTED_MODULE_12__["default"],
        style: {
          boxShadow: '0 0 5px 3px #00000042'
        },
        alt: " "
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", null, "Battle"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("img", {
        src: _assets_imgs_pic3_png__WEBPACK_IMPORTED_MODULE_13__["default"],
        style: {
          boxShadow: '0 0 5px 3px #00000042'
        },
        alt: " "
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", null, "See the winner"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("img", {
        src: _assets_imgs_pic4_png__WEBPACK_IMPORTED_MODULE_14__["default"],
        style: {
          'boxShadow': '0 0 5px 3px #00000042'
        },
        alt: " "
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h3", null, "Players"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", null, "Player One"), loadingOne ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", null, "\u6B63\u5728\u67E5\u627E", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Spinner"], {
        animation: "border"
      })) : getOne ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"].Img, {
        src: one.owner.avatar_url,
        alt: one.name,
        style: {
          width: '200px',
          height: '200px',
          margin: '0 auto'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"].Header, null, one.name, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        variant: "light",
        onClick: this.rmOne,
        className: "button-del"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("i", {
        className: "fa fa-times-circle",
        style: {
          color: 'rgb(194, 57, 42)'
        }
      })))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["FormControl"], {
        ref: this.oneVal,
        placeholder: "github username",
        "aria-label": "github username",
        "aria-describedby": "basic-addon2"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroup"].Append, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        variant: "outline-secondary",
        onClick: this.getOne
      }, "SUBMIT")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", null, "Player Two"), loadingTwo ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", null, "\u6B63\u5728\u67E5\u627E", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Spinner"], {
        animation: "border"
      })) : getTwo ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"].Img, {
        src: two.owner.avatar_url,
        alt: two.name,
        style: {
          width: '200px',
          height: '200px',
          margin: '0 auto'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"].Header, null, two.name, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        variant: "light",
        onClick: this.rmTwo,
        className: "button-del"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("i", {
        className: "fa fa-times-circle",
        style: {
          color: 'rgb(194, 57, 42)'
        }
      })))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["FormControl"], {
        ref: this.twoVal,
        placeholder: "github username",
        "aria-label": "github username",
        "aria-describedby": "basic-addon2"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["InputGroup"].Append, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        variant: "outline-secondary",
        onClick: this.getTwo
      }, "SUBMIT"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        variant: "primary",
        onClick: this.battleResult
      }, "Battle"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "text-center text-black bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", null, "\u7248\u6743\u6240\u6709 \xA9 \u97E6\u4EF2\u831C")))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Battle;
}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component);

var _default = Battle;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Battle, "Battle", "E:\\reactDom\\src\\pages\\Battle.jsx");
  reactHotLoader.register(_default, "default", "E:\\reactDom\\src\\pages\\Battle.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/pages/BattleResult.jsx":
/*!************************************!*\
  !*** ./src/pages/BattleResult.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");










(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};





var BattleResult = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(BattleResult, _React$Component);

  var _super = _createSuper(BattleResult);

  function BattleResult(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, BattleResult);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "battle", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var _this$state, oneName, twoName, res1, res2, one, two;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //获取第一个数据
              _this$state = _this.state, oneName = _this$state.oneName, twoName = _this$state.twoName;
              _context.prev = 1;
              _context.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_10___default.a.get("https://api.github.com/search/repositories?q=".concat(oneName, " in:name&sort=stars&order=desc&type=Repositories&per_page=1"));

            case 4:
              res1 = _context.sent;
              _context.next = 7;
              return axios__WEBPACK_IMPORTED_MODULE_10___default.a.get("https://api.github.com/search/repositories?q=".concat(twoName, " in:name&sort=stars&order=desc&type=Repositories&per_page=1"));

            case 7:
              res2 = _context.sent;
              one = res1.data.items[0];
              two = res2.data.items[0];

              if (one.stargazers_count > two.stargazers_count) {
                _this.setState({
                  winner: one.name,
                  win1: true
                });
              } else if (one.stargazers_count < two.stargazers_count) {
                _this.setState({
                  winner: two.name,
                  win2: true
                });
              }

              _this.setState({
                imgUrl1: one.owner.avatar_url,
                imgUrl2: two.owner.avatar_url,
                battle: true
              });

              console.log(count1);
              _context.next = 17;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](1);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 15]]);
    })));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "goBack", function () {
      // console.log('123')
      _this.props.history.push('/Battle');
    });

    console.log("props", _this.props); //     console.log("win",this.props.match.params.win)

    _this.state = {
      oneName: _this.props.location.query.name1,
      twoName: _this.props.location.query.name2,
      imgUrl1: '',
      imgUrl2: '',
      winner: '平手',
      battle: false
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(BattleResult, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.battle();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          oneName = _this$state2.oneName,
          twoName = _this$state2.twoName,
          winner = _this$state2.winner,
          imgUrl1 = _this$state2.imgUrl1,
          imgUrl2 = _this$state2.imgUrl2,
          battle = _this$state2.battle;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Container"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("h2", null, "\u6BD4\u8F83\u7ED3\u679C"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("br", null), battle ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"].Img, {
        src: imgUrl1,
        alt: oneName,
        style: {
          width: '200px',
          height: '200px',
          margin: '0 auto'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"].Header, null, oneName, "  ", winner == oneName ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
        style: {
          color: '#efc85dd9',
          fontWeight: 'bold'
        }
      }, "winner") : ''))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"].Img, {
        src: imgUrl2,
        alt: twoName,
        style: {
          width: '200px',
          height: '200px',
          margin: '0 auto'
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Card"].Header, null, twoName, " ", winner == twoName ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
        style: {
          color: '#efc85dd9',
          fontWeight: 'bold'
        }
      }, "winner") : '')))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", null, "\u6CA1\u6709\u5BF9\u8C61"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        onClick: this.goBack
      }, "\u8FD4\u56DE"))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return BattleResult;
}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component);

var _default = BattleResult;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BattleResult, "BattleResult", "E:\\reactDom\\src\\pages\\BattleResult.jsx");
  reactHotLoader.register(_default, "default", "E:\\reactDom\\src\\pages\\BattleResult.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/pages/Popular.jsx":
/*!*******************************!*\
  !*** ./src/pages/Popular.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js");
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _assets_imgs_pic1_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @/assets/imgs/pic1.png */ "./src/assets/imgs/pic1.png");











(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal["default"].signature : function (a) {
  return a;
};


 // import ReactBootstrap from 'react-bootstrap';
// import {ListGroup,Spinner,Alert,Container,
// Nav,Card,Row,Col,Button,ListGroupItem} from 'react-bootstrap';




var ListGroup = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["ListGroup"];
var Spinner = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Spinner"];
var Alert = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Alert"];
var Container = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Container"];
var Nav = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Nav"];
var Card = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Card"];
var Row = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Row"];
var Col = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Col"];
var Button = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["Button"];
var ListGroupItem = react_bootstrap__WEBPACK_IMPORTED_MODULE_13__["ListGroupItem"]; // function getQueryVariable(variable) {
//   const query = window.location.search.substring(1);
//   const vars = query.split('&');
//   for (let i = 0; i < vars.length; i += 1) {
//     const pair = vars[i].split('=');
//     if (decodeURIComponent(pair[0]) === variable) {
//       return decodeURIComponent(pair[1]);
//     }
//   }
//   return null;
//   // console.log('Query variable %s not found', variable);
// }
// console.log(`lanuage is : ${getQueryVariable('language')}`);

var Header = function Header(props) {
  var menuItems = ['All', 'Javascript', 'Ruby', 'Java', 'Css', 'Python'];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Nav, {
    className: "justify-content-center",
    style: {
      border: 'soild black'
    },
    variant: "tabs",
    defaultActiveKey: "All",
    onSelect: function onSelect(selectedKey) {
      return props.onClick(selectedKey);
    }
  }, menuItems.map(function (item, key) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Nav.Item, {
      key: key
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Nav.Link, {
      eventKey: item
    }, item));
  }))));
};

var Content = function Content(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Container, null, props.children));
};

var Footer = function Footer(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Container, null, props.children));
};

var RepoCard = function RepoCard(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card, {
    border: "primary",
    style: {
      marginTop: '8px',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Header, {
    className: "text-center bg-white font-weight-bold"
  }, props.no), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Body, {
    className: "bg-light"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Img, {
    src: _assets_imgs_pic1_png__WEBPACK_IMPORTED_MODULE_14__["default"],
    "data-src": props.img,
    className: "lazyload"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Title, {
    className: "text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Link, {
    href: props.url,
    className: "text-danger",
    target: "_blank"
  }, props.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(ListGroup, {
    className: "list-group-flush"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(ListGroupItem, {
    className: "bg-light"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
    className: "fa fa-user fa-lg fa-fw",
    style: {
      color: 'orange'
    }
  }), props.author)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(ListGroupItem, {
    className: "bg-light"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
    className: "fa fa-star fa-lg fa-fw",
    style: {
      color: 'yellow'
    }
  }), props.stars)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(ListGroupItem, {
    className: "bg-light"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
    className: "fa fa-code-fork fa-lg fa-fw",
    style: {
      color: 'lightblue'
    }
  }), props.forks)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(ListGroupItem, {
    className: "bg-light"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Card.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
    className: "fa fa-warning fa-lg fa-fw",
    style: {
      color: 'purple'
    }
  }), props.issues)))));
};

var App = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, App);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "handleNavClick", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var type,
          page,
          cards,
          url,
          beforeState,
          res,
          newCards,
          _args = arguments;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              type = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'all';
              page = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
              cards = _this.state.cards;
              url = '';
              _context.t0 = type;
              _context.next = _context.t0 === 'Javascript' ? 7 : _context.t0 === 'Ruby' ? 9 : _context.t0 === 'Java' ? 11 : _context.t0 === 'Css' ? 13 : 15;
              break;

            case 7:
              url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories';
              return _context.abrupt("break", 16);

            case 9:
              url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories';
              return _context.abrupt("break", 16);

            case 11:
              url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories';
              return _context.abrupt("break", 16);

            case 13:
              url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories';
              return _context.abrupt("break", 16);

            case 15:
              url = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories';

            case 16:
              url = "".concat(url, "&page=").concat(page, "&per_page=10");
              _context.prev = 17;
              beforeState = {
                type: type,
                loading: true,
                error: null
              };

              if (page === 1) {
                beforeState.cards = [];
              }

              _this.setState(beforeState);

              _context.next = 23;
              return axios__WEBPACK_IMPORTED_MODULE_11___default.a.get(url);

            case 23:
              res = _context.sent;
              newCards = res.data.items.map(function (item, key) {
                return {
                  no: "#".concat(page === 1 ? 1 + key : cards.length + 1 + key),
                  img: item.owner.avatar_url,
                  title: item.full_name,
                  author: item.owner.login,
                  stars: item.stargazers_count,
                  forks: item.forks,
                  issues: item.open_issues,
                  url: item.html_url
                };
              });

              if (page > 1) {
                _this.setState(function (state) {
                  return {
                    cards: [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(state.cards), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(newCards)),
                    loading: false,
                    page: page
                  };
                });
              } else {
                _this.setState({
                  cards: newCards,
                  loading: false,
                  page: page
                });
              }

              _context.next = 31;
              break;

            case 28:
              _context.prev = 28;
              _context.t1 = _context["catch"](17);

              _this.setState({
                loading: false,
                error: _context.t1
              });

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[17, 28]]);
    })));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "loadMore", function () {
      var _this$state = _this.state,
          type = _this$state.type,
          page = _this$state.page;

      _this.handleNavClick(type, page + 1);
    });

    var _cards = [];
    _this.state = {
      cards: _cards,
      loading: false,
      error: null,
      type: 'all',
      page: 1
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleNavClick();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          cards = _this$state2.cards,
          loading = _this$state2.loading,
          error = _this$state2.error;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h2", {
        style: {
          margin: '20px auto'
        }
      }, "github\u70ED\u95E8\u9879\u76EE"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "container"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Header, {
        onClick: this.handleNavClick
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Content, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Row, {
        className: "justify-content-around"
      }, cards.map(function (item, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Col, {
          sm: 6,
          md: 4,
          lg: 3,
          key: key
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(RepoCard, {
          no: item.no,
          img: item.img,
          title: item.title,
          author: item.author,
          stars: item.stars,
          forks: item.forks,
          issues: item.issues,
          url: item.url
        }));
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "text-center"
      }, error && error.response && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Alert, {
        variant: "danger"
      }, error.response.status, ' ', error.response.statusText)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Button, {
        onClick: this.loadMore,
        disabled: loading
      }, ' ', loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Spinner, {
        as: "span",
        animation: "grow",
        size: "sm",
        role: "status",
        "aria-hidden": "true"
      }), ' ', "\u52A0\u8F7D\u66F4\u591A"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(Footer, {
        style: {
          display: 'fixed',
          bottom: '0'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "text-center text-black jumbotron bg-light"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("p", null, "\u7248\u6743\u6240\u6709 \xA9 \u97E6\u4EF2\u831C")))));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_10___default.a.Component);


;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ListGroup, "ListGroup", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Spinner, "Spinner", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Alert, "Alert", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Container, "Container", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Nav, "Nav", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Card, "Card", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Row, "Row", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Col, "Col", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Button, "Button", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(ListGroupItem, "ListGroupItem", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Header, "Header", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Content, "Content", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(Footer, "Footer", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(RepoCard, "RepoCard", "E:\\reactDom\\src\\pages\\Popular.jsx");
  reactHotLoader.register(App, "App", "E:\\reactDom\\src\\pages\\Popular.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

/******/ });
//# sourceMappingURL=index.bundle.js.map