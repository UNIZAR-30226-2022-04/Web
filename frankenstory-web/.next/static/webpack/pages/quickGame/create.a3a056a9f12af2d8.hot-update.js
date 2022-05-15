"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/quickGame/create",{

/***/ "./components/CreateQuickGame.js":
/*!***************************************!*\
  !*** ./components/CreateQuickGame.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_Jose_Desktop_Universidad_Semestre4_ProyectoSoftware_appWeb_frankenstory_web_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js */ \"./node_modules/next/dist/compiled/regenerator-runtime/runtime.js\");\n/* harmony import */ var C_Users_Jose_Desktop_Universidad_Semestre4_ProyectoSoftware_appWeb_frankenstory_web_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_Jose_Desktop_Universidad_Semestre4_ProyectoSoftware_appWeb_frankenstory_web_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\n\nvar _this = undefined;\n\n\n\nvar _s = $RefreshSig$();\nvar CreateQuickGame = function() {\n    _s();\n    var url = \"http://localhost:3000/api/quick_game/create_room\";\n    var router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true), publicGame = ref[0], setPublicGame = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(\"random\"), gameMode = ref1[0], setGameMode = ref1[1];\n    var ref2 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(120), time = ref2[0], setTime = ref2[1];\n    var setPublic = function() {\n        setPublicGame(true);\n    };\n    var setPrivate = function() {\n        setPublicGame(false);\n    };\n    var setModeRandom = function() {\n        setGameMode(\"random\");\n    };\n    var setModeTwitter = function() {\n        setGameMode(\"twitter\");\n    };\n    var timeUp = function(e) {\n        e.preventDefault();\n        setTime(time + 5);\n    };\n    var timeDown = function(e) {\n        e.preventDefault();\n        setTime(time - 5);\n    };\n    var create = function() {\n        var _ref = _asyncToGenerator(C_Users_Jose_Desktop_Universidad_Semestre4_ProyectoSoftware_appWeb_frankenstory_web_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {\n            var data, options, res;\n            return C_Users_Jose_Desktop_Universidad_Semestre4_ProyectoSoftware_appWeb_frankenstory_web_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {\n                while(1)switch(_ctx.prev = _ctx.next){\n                    case 0:\n                        data = {\n                            username: localStorage.getItem(\"username\"),\n                            password: localStorage.getItem(\"password\"),\n                            time: time,\n                            isPrivate: publicGame,\n                            mode: gameMode\n                        };\n                        options = {\n                            method: \"POST\",\n                            headers: {\n                                \"Content-Type\": \"application/json\"\n                            },\n                            body: JSON.stringify(data)\n                        };\n                        _ctx.next = 4;\n                        return fetch(url, options);\n                    case 4:\n                        res = _ctx.sent;\n                        return _ctx.abrupt(\"return\", res.json());\n                    case 6:\n                    case \"end\":\n                        return _ctx.stop();\n                }\n            }, _callee);\n        }));\n        return function create() {\n            return _ref.apply(this, arguments);\n        };\n    }();\n    var onSubmit = function(e) {\n        e.preventDefault();\n        create().then(function(res) {\n            console.log(res);\n            if (res.result != \"success\") {\n                alert(\"Error al crear sala\");\n                router.push(\"/quickGame\");\n            } else {\n                router.push(\"/quickGame/lobby?code=\".concat(res.id));\n            }\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"form\", {\n        className: \"m-auto justify-center p-6 align-middle\",\n        onSubmit: onSubmit,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                className: \"centered\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                    children: \"Tiempo de escritura\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                    lineNumber: 75,\n                    columnNumber: 13\n                }, _this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                lineNumber: 74,\n                columnNumber: 11\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                className: \"flex\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                            className: \"text-2xl float-left text-white\",\n                            children: [\n                                parseInt(time / 60),\n                                \"min:\",\n                                time % 60,\n                                \"seg\"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                            lineNumber: 79,\n                            columnNumber: 17\n                        }, _this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                            className: \"absolute ml-36 text-2xl text-white\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"button\", {\n                                    onClick: timeDown,\n                                    children: \"-\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                                    lineNumber: 81,\n                                    columnNumber: 21\n                                }, _this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"button\", {\n                                    className: \"ml-2\",\n                                    onClick: timeUp,\n                                    children: \"+\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                                    lineNumber: 82,\n                                    columnNumber: 21\n                                }, _this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                            lineNumber: 80,\n                            columnNumber: 17\n                        }, _this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                    lineNumber: 78,\n                    columnNumber: 15\n                }, _this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                lineNumber: 77,\n                columnNumber: 11\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                className: \"centered\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"p\", {\n                    children: \"Tipo de partida\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                    lineNumber: 87,\n                    columnNumber: 13\n                }, _this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                lineNumber: 86,\n                columnNumber: 11\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                className: \"centered\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"input\", {\n                        className: \"py-1 px-2 text-white \".concat(publicGame ? \"bg-green-800\" : \"bg-green-600\"),\n                        type: \"button\",\n                        value: \"PUBLICA\",\n                        onClick: function() {\n                            return setPublicGame(true);\n                        }\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                        lineNumber: 90,\n                        columnNumber: 13\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"input\", {\n                        className: \"py-1 px-2 text-white \".concat(!publicGame ? \"bg-green-800\" : \"bg-green-600\"),\n                        type: \"button\",\n                        value: \"PRIVADA\",\n                        onClick: function() {\n                            return setPublicGame(false);\n                        }\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                        lineNumber: 91,\n                        columnNumber: 13\n                    }, _this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                lineNumber: 89,\n                columnNumber: 11\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                className: \"centered \",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {\n                    children: \"Modo de juego\"\n                }, void 0, false)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                lineNumber: 93,\n                columnNumber: 11\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                className: \"centered\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"input\", {\n                        className: \"py-1 px-2 text-white \".concat(gameMode == \"random\" ? \"bg-green-800\" : \"bg-green-600\"),\n                        type: \"button\",\n                        value: \"ALEATORIAS\",\n                        onClick: setModeRandom\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                        lineNumber: 97,\n                        columnNumber: 13\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {\n                        children: \" \"\n                    }, void 0, false),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"input\", {\n                        className: \"py-1 px-2 text-white \".concat(gameMode == \"twitter\" ? \"bg-green-800\" : \"bg-green-600\"),\n                        type: \"button\",\n                        value: \"TWITTER\",\n                        onClick: setModeTwitter\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                        lineNumber: 98,\n                        columnNumber: 13\n                    }, _this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {\n                        children: \" \"\n                    }, void 0, false)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                lineNumber: 96,\n                columnNumber: 11\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"div\", {\n                className: \"centered\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(\"input\", {\n                    className: \"clickableItem\",\n                    type: \"submit\",\n                    value: \"Crear partida\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                    lineNumber: 101,\n                    columnNumber: 13\n                }, _this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n                lineNumber: 100,\n                columnNumber: 11\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Jose\\\\Desktop\\\\Universidad\\\\Semestre4\\\\ProyectoSoftware\\\\appWeb\\\\frankenstory-web\\\\components\\\\CreateQuickGame.js\",\n        lineNumber: 73,\n        columnNumber: 7\n    }, _this);\n};\n_s(CreateQuickGame, \"48xBA3MHiOp8fI4aHFheAbJCXL4=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = CreateQuickGame;\n/* harmony default export */ __webpack_exports__[\"default\"] = (CreateQuickGame);\nvar _c;\n$RefreshReg$(_c, \"CreateQuickGame\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qiw0RUFBQ00sT0FBSztvQkFBQ04sU0FBUyxFQUFDLGVBQWVPO29CQUFBQSxJQUFJLEVBQUMsUUFBUTtvQkFBQ0MsS0FBSyxFQUFDLGVBQWU7Ozs7O3lCQUFFOzs7OztxQkFDakU7Ozs7OzthQUNILENBQ1Y7Q0FDRjtHQXJHS25ELGVBQWU7O1FBSUZELGtEQUFTOzs7QUFKdEJDLEtBQUFBLGVBQWU7QUF1R3JCLCtEQUFlQSxlQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvQ3JlYXRlUXVpY2tHYW1lLmpzPzA3ZWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcclxuXHJcbmNvbnN0IENyZWF0ZVF1aWNrR2FtZSA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCB1cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvcXVpY2tfZ2FtZS9jcmVhdGVfcm9vbVwiXHJcblxyXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcclxuXHJcbiAgICBjb25zdCBbcHVibGljR2FtZSwgc2V0UHVibGljR2FtZV0gPSB1c2VTdGF0ZSh0cnVlKVxyXG4gICAgY29uc3QgW2dhbWVNb2RlLCBzZXRHYW1lTW9kZV0gPSB1c2VTdGF0ZShcInJhbmRvbVwiKVxyXG4gICAgY29uc3QgW3RpbWUsIHNldFRpbWUgXSA9IHVzZVN0YXRlKDEyMClcclxuXHJcbiAgICBjb25zdCBzZXRQdWJsaWMgPSAoKSA9PiB7XHJcbiAgICAgICAgc2V0UHVibGljR2FtZSh0cnVlKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNldFByaXZhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgc2V0UHVibGljR2FtZShmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZXRNb2RlUmFuZG9tID0gKCkgPT4ge1xyXG4gICAgICAgIHNldEdhbWVNb2RlKFwicmFuZG9tXCIpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2V0TW9kZVR3aXR0ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgc2V0R2FtZU1vZGUoXCJ0d2l0dGVyXCIpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGltZVVwID0gKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICBzZXRUaW1lKHRpbWUgKyA1KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRpbWVEb3duID0gKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICBzZXRUaW1lKHRpbWUgLSA1KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZSA9IGFzeW5jICgpID0+e1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJuYW1lXCIpLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwYXNzd29yZFwiKSxcclxuICAgICAgICAgICAgdGltZTogdGltZSxcclxuICAgICAgICAgICAgaXNQcml2YXRlOiBwdWJsaWNHYW1lLFxyXG4gICAgICAgICAgICBtb2RlOiBnYW1lTW9kZVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpIFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsb3B0aW9ucylcclxuICAgICAgICByZXR1cm4gcmVzLmpzb24oKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9uU3VibWl0ID0gKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICBjcmVhdGUoKS50aGVuKChyZXMpID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIGlmIChyZXMucmVzdWx0ICE9IFwic3VjY2Vzc1wiKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IgYWwgY3JlYXIgc2FsYVwiKVxyXG4gICAgICAgICAgICAgICAgcm91dGVyLnB1c2goXCIvcXVpY2tHYW1lXCIpXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcm91dGVyLnB1c2goYC9xdWlja0dhbWUvbG9iYnk/Y29kZT0ke3Jlcy5pZH1gKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuIFxyXG4gIHJldHVybiAoXHJcbiAgICAgIDxmb3JtIGNsYXNzTmFtZSA9XCJtLWF1dG8ganVzdGlmeS1jZW50ZXIgcC02IGFsaWduLW1pZGRsZVwiIG9uU3VibWl0PXtvblN1Ym1pdH0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNlbnRlcmVkXCI+XHJcbiAgICAgICAgICAgIDxwPlRpZW1wbyBkZSBlc2NyaXR1cmE8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleFwiPlxyXG4gICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmbG9hdC1sZWZ0IHRleHQtd2hpdGVcIj57cGFyc2VJbnQodGltZS82MCl9bWluOnt0aW1lICUgNjB9c2VnPC9wPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBtbC0zNiB0ZXh0LTJ4bCB0ZXh0LXdoaXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aW1lRG93bn0+LTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwibWwtMlwiIG9uQ2xpY2s9e3RpbWVVcH0+KzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2VudGVyZWRcIiA+XHJcbiAgICAgICAgICAgIDxwPlRpcG8gZGUgcGFydGlkYTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXJlZFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtgcHktMSBweC0yIHRleHQtd2hpdGUgJHsgcHVibGljR2FtZSA/ICdiZy1ncmVlbi04MDAnIDogJ2JnLWdyZWVuLTYwMCd9YH0gdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwiUFVCTElDQVwiIG9uQ2xpY2s9eygpID0+IHNldFB1YmxpY0dhbWUodHJ1ZSl9Lz5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17YHB5LTEgcHgtMiB0ZXh0LXdoaXRlICR7ICFwdWJsaWNHYW1lID8gJ2JnLWdyZWVuLTgwMCcgOiAnYmctZ3JlZW4tNjAwJ31gfSB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJQUklWQURBXCIgb25DbGljaz17KCkgPT4gc2V0UHVibGljR2FtZShmYWxzZSl9Lz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWUgPSBcImNlbnRlcmVkIFwiPlxyXG4gICAgICAgICAgICAgICAgPD5Nb2RvIGRlIGp1ZWdvPC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lID0gXCJjZW50ZXJlZFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtgcHktMSBweC0yIHRleHQtd2hpdGUgJHsgZ2FtZU1vZGU9PVwicmFuZG9tXCIgPyAnYmctZ3JlZW4tODAwJyA6ICdiZy1ncmVlbi02MDAnfWB9IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIkFMRUFUT1JJQVNcIiBvbkNsaWNrPXtzZXRNb2RlUmFuZG9tfS8+PD4gPC8+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e2BweS0xIHB4LTIgdGV4dC13aGl0ZSAkeyBnYW1lTW9kZT09XCJ0d2l0dGVyXCIgPyAnYmctZ3JlZW4tODAwJyA6ICdiZy1ncmVlbi02MDAnfWB9IHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIlRXSVRURVJcIiBvbkNsaWNrPXtzZXRNb2RlVHdpdHRlcn0vPjw+IDwvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZSA9IFwiY2VudGVyZWRcIj5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImNsaWNrYWJsZUl0ZW1cInR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIkNyZWFyIHBhcnRpZGFcIi8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9mb3JtPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlUXVpY2tHYW1lIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlUm91dGVyIiwiQ3JlYXRlUXVpY2tHYW1lIiwidXJsIiwicm91dGVyIiwicHVibGljR2FtZSIsInNldFB1YmxpY0dhbWUiLCJnYW1lTW9kZSIsInNldEdhbWVNb2RlIiwidGltZSIsInNldFRpbWUiLCJzZXRQdWJsaWMiLCJzZXRQcml2YXRlIiwic2V0TW9kZVJhbmRvbSIsInNldE1vZGVUd2l0dGVyIiwidGltZVVwIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGltZURvd24iLCJjcmVhdGUiLCJkYXRhIiwib3B0aW9ucyIsInJlcyIsInVzZXJuYW1lIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBhc3N3b3JkIiwiaXNQcml2YXRlIiwibW9kZSIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImZldGNoIiwianNvbiIsIm9uU3VibWl0IiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJyZXN1bHQiLCJhbGVydCIsInB1c2giLCJpZCIsImZvcm0iLCJjbGFzc05hbWUiLCJkaXYiLCJwIiwicGFyc2VJbnQiLCJidXR0b24iLCJvbkNsaWNrIiwiaW5wdXQiLCJ0eXBlIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/CreateQuickGame.js\n");

/***/ })

});