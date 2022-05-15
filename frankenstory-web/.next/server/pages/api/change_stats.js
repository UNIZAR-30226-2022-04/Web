"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/change_stats";
exports.ids = ["pages/api/change_stats"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "(api)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nlet prisma;\nif (false) {} else {\n    if (!global.prisma) {\n        global.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n    }\n    prisma = global.prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxJQUFJQyxNQUFNO0FBRVYsSUFBSUMsS0FBcUMsRUFBRSxFQUUxQyxNQUFNO0lBQ04sSUFBSSxDQUFDQyxNQUFNLENBQUNGLE1BQU0sRUFBRTtRQUNuQkUsTUFBTSxDQUFDRixNQUFNLEdBQUcsSUFBSUQsd0RBQVksRUFBRSxDQUFDO0tBQ25DO0lBQ0RDLE1BQU0sR0FBR0UsTUFBTSxDQUFDRixNQUFNLENBQUM7Q0FDdkI7QUFFRCxpRUFBZUEsTUFBTSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJhbmtlbnN0b3J5LXdlYi8uL2xpYi9wcmlzbWEuanM/NzUxNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxubGV0IHByaXNtYTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIikge1xuXHRwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG59IGVsc2Uge1xuXHRpZiAoIWdsb2JhbC5wcmlzbWEpIHtcblx0XHRnbG9iYWwucHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXHR9XG5cdHByaXNtYSA9IGdsb2JhbC5wcmlzbWE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJwcm9jZXNzIiwiZ2xvYmFsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.js\n");

/***/ }),

/***/ "(api)/./pages/api/change_stats.js":
/*!***********************************!*\
  !*** ./pages/api/change_stats.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_queries_PUT_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../prisma/queries/PUT/player */ \"(api)/./prisma/queries/PUT/player.js\");\n/* harmony import */ var _prisma_queries_SELECT_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../prisma/queries/SELECT/player */ \"(api)/./prisma/queries/SELECT/player.js\");\n\n\n// Al ir a http://localhost:3000/api/change_picture te devuelve el siguiente json\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    const message = req.body;\n    const user = await (0,_prisma_queries_SELECT_player__WEBPACK_IMPORTED_MODULE_1__.selectPlayerDB)(message.username);\n    // checks if the requested user exists\n    if (user != undefined) {\n        // checks password\n        if (user.password_hash == message.password) {\n            //cambiar por password + anadir mecanismo hash\n            user.stars = message.newStars;\n            user.mooncoins = message.newMooncoins;\n            await (0,_prisma_queries_PUT_player__WEBPACK_IMPORTED_MODULE_0__.updatePlayerDB)(user.username, user);\n            res.status(200).json({\n                result: \"success\",\n                reason: \"\"\n            });\n        } else {\n            res.status(200).json({\n                result: \"error\",\n                reason: \"wrong_password\"\n            });\n        }\n    } else {\n        res.status(200).json({\n            result: \"error\",\n            reason: \"user_not_found\"\n        });\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvY2hhbmdlX3N0YXRzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFpRTtBQUNHO0FBRXBFLGlGQUFpRjtBQUNqRixpRUFBZSxPQUFPRSxHQUFHLEVBQUVDLEdBQUcsR0FBSztJQUNsQyxNQUFNQyxPQUFPLEdBQUdGLEdBQUcsQ0FBQ0csSUFBSTtJQUV4QixNQUFNQyxJQUFJLEdBQUcsTUFBTUwsNkVBQWMsQ0FBQ0csT0FBTyxDQUFDRyxRQUFRLENBQUM7SUFFbkQsc0NBQXNDO0lBQ3RDLElBQUlELElBQUksSUFBSUUsU0FBUyxFQUFFO1FBQ3RCLGtCQUFrQjtRQUNsQixJQUFJRixJQUFJLENBQUNHLGFBQWEsSUFBSUwsT0FBTyxDQUFDTSxRQUFRLEVBQUU7WUFDM0MsOENBQThDO1lBQzlDSixJQUFJLENBQUNLLEtBQUssR0FBR1AsT0FBTyxDQUFDUSxRQUFRLENBQUM7WUFDOUJOLElBQUksQ0FBQ08sU0FBUyxHQUFHVCxPQUFPLENBQUNVLFlBQVksQ0FBQztZQUN0QyxNQUFNZCwwRUFBYyxDQUFDTSxJQUFJLENBQUNDLFFBQVEsRUFBRUQsSUFBSSxDQUFDLENBQUM7WUFDMUNILEdBQUcsQ0FBQ1ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUVDLE1BQU0sRUFBRSxTQUFTO2dCQUFFQyxNQUFNLEVBQUUsRUFBRTthQUFFLENBQUMsQ0FBQztTQUN4RCxNQUFNO1lBQ05mLEdBQUcsQ0FBQ1ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQUVDLE1BQU0sRUFBRSxPQUFPO2dCQUFFQyxNQUFNLEVBQUUsZ0JBQWdCO2FBQUUsQ0FBQyxDQUFDO1NBQ3BFO0tBQ0QsTUFBTTtRQUNOZixHQUFHLENBQUNZLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVDLE1BQU0sRUFBRSxPQUFPO1lBQUVDLE1BQU0sRUFBRSxnQkFBZ0I7U0FBRSxDQUFDLENBQUM7S0FDcEU7Q0FDRCxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJhbmtlbnN0b3J5LXdlYi8uL3BhZ2VzL2FwaS9jaGFuZ2Vfc3RhdHMuanM/MjAwOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1cGRhdGVQbGF5ZXJEQiB9IGZyb20gXCIuLi8uLi9wcmlzbWEvcXVlcmllcy9QVVQvcGxheWVyXCI7XG5pbXBvcnQgeyBzZWxlY3RQbGF5ZXJEQiB9IGZyb20gXCIuLi8uLi9wcmlzbWEvcXVlcmllcy9TRUxFQ1QvcGxheWVyXCI7XG5cbi8vIEFsIGlyIGEgaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9jaGFuZ2VfcGljdHVyZSB0ZSBkZXZ1ZWx2ZSBlbCBzaWd1aWVudGUganNvblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cdGNvbnN0IG1lc3NhZ2UgPSByZXEuYm9keTtcblxuXHRjb25zdCB1c2VyID0gYXdhaXQgc2VsZWN0UGxheWVyREIobWVzc2FnZS51c2VybmFtZSk7XG5cblx0Ly8gY2hlY2tzIGlmIHRoZSByZXF1ZXN0ZWQgdXNlciBleGlzdHNcblx0aWYgKHVzZXIgIT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gY2hlY2tzIHBhc3N3b3JkXG5cdFx0aWYgKHVzZXIucGFzc3dvcmRfaGFzaCA9PSBtZXNzYWdlLnBhc3N3b3JkKSB7XG5cdFx0XHQvL2NhbWJpYXIgcG9yIHBhc3N3b3JkICsgYW5hZGlyIG1lY2FuaXNtbyBoYXNoXG5cdFx0XHR1c2VyLnN0YXJzID0gbWVzc2FnZS5uZXdTdGFycztcblx0XHRcdHVzZXIubW9vbmNvaW5zID0gbWVzc2FnZS5uZXdNb29uY29pbnM7XG5cdFx0XHRhd2FpdCB1cGRhdGVQbGF5ZXJEQih1c2VyLnVzZXJuYW1lLCB1c2VyKTtcblx0XHRcdHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgcmVzdWx0OiBcInN1Y2Nlc3NcIiwgcmVhc29uOiBcIlwiIH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXMuc3RhdHVzKDIwMCkuanNvbih7IHJlc3VsdDogXCJlcnJvclwiLCByZWFzb246IFwid3JvbmdfcGFzc3dvcmRcIiB9KTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzLnN0YXR1cygyMDApLmpzb24oeyByZXN1bHQ6IFwiZXJyb3JcIiwgcmVhc29uOiBcInVzZXJfbm90X2ZvdW5kXCIgfSk7XG5cdH1cbn07XG4iXSwibmFtZXMiOlsidXBkYXRlUGxheWVyREIiLCJzZWxlY3RQbGF5ZXJEQiIsInJlcSIsInJlcyIsIm1lc3NhZ2UiLCJib2R5IiwidXNlciIsInVzZXJuYW1lIiwidW5kZWZpbmVkIiwicGFzc3dvcmRfaGFzaCIsInBhc3N3b3JkIiwic3RhcnMiLCJuZXdTdGFycyIsIm1vb25jb2lucyIsIm5ld01vb25jb2lucyIsInN0YXR1cyIsImpzb24iLCJyZXN1bHQiLCJyZWFzb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/change_stats.js\n");

/***/ }),

/***/ "(api)/./prisma/queries/PUT/player.js":
/*!**************************************!*\
  !*** ./prisma/queries/PUT/player.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"updatePlayerDB\": () => (/* binding */ updatePlayerDB)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.js\");\n\nasync function updatePlayerDB(username, data) {\n    const query = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].player.update({\n        data: data,\n        where: {\n            username: username\n        }\n    });\n    return query;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wcmlzbWEvcXVlcmllcy9QVVQvcGxheWVyLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXlDO0FBRWxDLGVBQWVDLGNBQWMsQ0FBQ0MsUUFBUSxFQUFFQyxJQUFJLEVBQUU7SUFDcEQsTUFBTUMsS0FBSyxHQUFHLE1BQU1KLGlFQUFvQixDQUFDO1FBQ3hDRyxJQUFJLEVBQUVBLElBQUk7UUFDVkksS0FBSyxFQUFFO1lBQUVMLFFBQVEsRUFBRUEsUUFBUTtTQUFFO0tBQzdCLENBQUM7SUFDRixPQUFPRSxLQUFLLENBQUM7Q0FDYiIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyYW5rZW5zdG9yeS13ZWIvLi9wcmlzbWEvcXVlcmllcy9QVVQvcGxheWVyLmpzPzhkNDQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vLi4vLi4vbGliL3ByaXNtYVwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVBsYXllckRCKHVzZXJuYW1lLCBkYXRhKSB7XHJcblx0Y29uc3QgcXVlcnkgPSBhd2FpdCBwcmlzbWEucGxheWVyLnVwZGF0ZSh7XHJcblx0XHRkYXRhOiBkYXRhLFxyXG5cdFx0d2hlcmU6IHsgdXNlcm5hbWU6IHVzZXJuYW1lIH0sXHJcblx0fSk7XHJcblx0cmV0dXJuIHF1ZXJ5O1xyXG59XHJcbiJdLCJuYW1lcyI6WyJwcmlzbWEiLCJ1cGRhdGVQbGF5ZXJEQiIsInVzZXJuYW1lIiwiZGF0YSIsInF1ZXJ5IiwicGxheWVyIiwidXBkYXRlIiwid2hlcmUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./prisma/queries/PUT/player.js\n");

/***/ }),

/***/ "(api)/./prisma/queries/SELECT/player.js":
/*!*****************************************!*\
  !*** ./prisma/queries/SELECT/player.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selectPlayerDB\": () => (/* binding */ selectPlayerDB)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.js\");\n\nasync function selectPlayerDB(username) {\n    const query = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].player.findMany({\n        where: {\n            username: {\n                equals: username || undefined\n            }\n        }\n    });\n    return query[0];\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wcmlzbWEvcXVlcmllcy9TRUxFQ1QvcGxheWVyLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXlDO0FBRWxDLGVBQWVDLGNBQWMsQ0FBQ0MsUUFBUSxFQUFFO0lBQzlDLE1BQU1DLEtBQUssR0FBRyxNQUFNSCxtRUFBc0IsQ0FBQztRQUMxQ00sS0FBSyxFQUFFO1lBQ05KLFFBQVEsRUFBRTtnQkFBRUssTUFBTSxFQUFFTCxRQUFRLElBQUlNLFNBQVM7YUFBRTtTQUMzQztLQUNELENBQUM7SUFFRixPQUFPTCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDaEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcmFua2Vuc3Rvcnktd2ViLy4vcHJpc21hL3F1ZXJpZXMvU0VMRUNUL3BsYXllci5qcz9mNWM3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcmlzbWEgZnJvbSBcIi4uLy4uLy4uL2xpYi9wcmlzbWFcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RQbGF5ZXJEQih1c2VybmFtZSkge1xyXG5cdGNvbnN0IHF1ZXJ5ID0gYXdhaXQgcHJpc21hLnBsYXllci5maW5kTWFueSh7XHJcblx0XHR3aGVyZToge1xyXG5cdFx0XHR1c2VybmFtZTogeyBlcXVhbHM6IHVzZXJuYW1lIHx8IHVuZGVmaW5lZCB9LFxyXG5cdFx0fSxcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIHF1ZXJ5WzBdO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJwcmlzbWEiLCJzZWxlY3RQbGF5ZXJEQiIsInVzZXJuYW1lIiwicXVlcnkiLCJwbGF5ZXIiLCJmaW5kTWFueSIsIndoZXJlIiwiZXF1YWxzIiwidW5kZWZpbmVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./prisma/queries/SELECT/player.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/change_stats.js"));
module.exports = __webpack_exports__;

})();