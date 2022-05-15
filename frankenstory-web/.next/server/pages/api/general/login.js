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
exports.id = "pages/api/general/login";
exports.ids = ["pages/api/general/login"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "(api)/./lib/checkFields.js":
/*!****************************!*\
  !*** ./lib/checkFields.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkFields\": () => (/* binding */ checkFields)\n/* harmony export */ });\nfunction checkFields(msg, fields) {\n    var rest = \"\";\n    for(const field in fields){\n        if (!msg.hasOwnProperty(fields[field])) {\n            rest += \", \" + fields[field];\n            console.log(\"ERROR: expected field '\", fields[field], \"' not found on message\");\n        }\n    }\n    return rest;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvY2hlY2tGaWVsZHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUVPLFNBQVNBLFdBQVcsQ0FBQ0MsR0FBRyxFQUFDQyxNQUFNLEVBQUM7SUFDbkMsSUFBSUMsSUFBSSxHQUFHLEVBQUU7SUFDYixJQUFLLE1BQU1DLEtBQUssSUFBSUYsTUFBTSxDQUFFO1FBQzlCLElBQUksQ0FBQ0QsR0FBRyxDQUFDSSxjQUFjLENBQUNILE1BQU0sQ0FBQ0UsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN2Q0QsSUFBSSxJQUFJLElBQUksR0FBR0QsTUFBTSxDQUFDRSxLQUFLLENBQUM7WUFDbkJFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHlCQUEwQixFQUFFTCxNQUFNLENBQUNFLEtBQUssQ0FBQyxFQUFFLHdCQUF5QixDQUFDO1NBQzFGO0tBQ0Q7SUFDRSxPQUFPRCxJQUFJLENBQUM7Q0FDZiIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyYW5rZW5zdG9yeS13ZWIvLi9saWIvY2hlY2tGaWVsZHMuanM/MDhkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRmllbGRzKG1zZyxmaWVsZHMpe1xuICAgIHZhciByZXN0ID0gXCJcIjtcbiAgICBmb3IgKGNvbnN0IGZpZWxkIGluIGZpZWxkcykge1xuXHRcdGlmICghbXNnLmhhc093blByb3BlcnR5KGZpZWxkc1tmaWVsZF0pKSB7XG5cdFx0XHRyZXN0ICs9IFwiLCBcIiArIGZpZWxkc1tmaWVsZF1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFUlJPUjogZXhwZWN0ZWQgZmllbGQgXFwnJywgZmllbGRzW2ZpZWxkXSwgJ1xcJyBub3QgZm91bmQgb24gbWVzc2FnZScpXG5cdFx0fVxuXHR9XG4gICAgcmV0dXJuIHJlc3Q7XG59Il0sIm5hbWVzIjpbImNoZWNrRmllbGRzIiwibXNnIiwiZmllbGRzIiwicmVzdCIsImZpZWxkIiwiaGFzT3duUHJvcGVydHkiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/checkFields.js\n");

/***/ }),

/***/ "(api)/./lib/prisma.js":
/*!***********************!*\
  !*** ./lib/prisma.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nlet prisma;\nif (false) {} else {\n    if (!global.prisma) {\n        global.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n    }\n    prisma = global.prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxJQUFJQyxNQUFNO0FBRVYsSUFBSUMsS0FBcUMsRUFBRSxFQUUxQyxNQUFNO0lBQ04sSUFBSSxDQUFDQyxNQUFNLENBQUNGLE1BQU0sRUFBRTtRQUNuQkUsTUFBTSxDQUFDRixNQUFNLEdBQUcsSUFBSUQsd0RBQVksRUFBRSxDQUFDO0tBQ25DO0lBQ0RDLE1BQU0sR0FBR0UsTUFBTSxDQUFDRixNQUFNLENBQUM7Q0FDdkI7QUFFRCxpRUFBZUEsTUFBTSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJhbmtlbnN0b3J5LXdlYi8uL2xpYi9wcmlzbWEuanM/NzUxNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxubGV0IHByaXNtYTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIikge1xuXHRwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG59IGVsc2Uge1xuXHRpZiAoIWdsb2JhbC5wcmlzbWEpIHtcblx0XHRnbG9iYWwucHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xuXHR9XG5cdHByaXNtYSA9IGdsb2JhbC5wcmlzbWE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJwcm9jZXNzIiwiZ2xvYmFsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.js\n");

/***/ }),

/***/ "(api)/./pages/api/general/login.js":
/*!************************************!*\
  !*** ./pages/api/general/login.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_queries_SELECT_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../prisma/queries/SELECT/player */ \"(api)/./prisma/queries/SELECT/player.js\");\n/* harmony import */ var _lib_checkFields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/checkFields */ \"(api)/./lib/checkFields.js\");\n\n\n// Al ir a http://localhost:3000/api/login te devuelve el siguiente json\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    const message = req.body;\n    const fields = [\n        \"username\",\n        \"password\"\n    ];\n    const rest = (0,_lib_checkFields__WEBPACK_IMPORTED_MODULE_1__.checkFields)(message, fields);\n    if (rest.length != 0) {\n        const msg = \"invalid credentials, expected: \" + rest;\n        res.status(200).json({\n            result: \"error\",\n            reason: msg\n        });\n        return;\n    }\n    const user = await (0,_prisma_queries_SELECT_player__WEBPACK_IMPORTED_MODULE_0__.selectPlayerDB)(message.username);\n    // checks if the requested user exists\n    if (user != undefined) {\n        // checks password\n        if (user.password_hash == message.password) {\n            //cambiar por password + anadir mecanismo hash\n            res.status(200).json({\n                result: \"success\",\n                reason: \"\"\n            });\n        } else {\n            res.status(200).json({\n                result: \"error\",\n                reason: \"wrong_password\"\n            });\n        }\n    } else {\n        res.status(200).json({\n            result: \"error\",\n            reason: \"user_not_found\"\n        });\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2VuZXJhbC9sb2dpbi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBdUU7QUFDbEI7QUFFckQsd0VBQXdFO0FBQ3hFLGlFQUFlLE9BQU9FLEdBQUcsRUFBRUMsR0FBRyxHQUFLO0lBQ2xDLE1BQU1DLE9BQU8sR0FBR0YsR0FBRyxDQUFDRyxJQUFJO0lBRXhCLE1BQU1DLE1BQU0sR0FBRztRQUFDLFVBQVU7UUFBQyxVQUFVO0tBQUM7SUFFdEMsTUFBTUMsSUFBSSxHQUFHTiw2REFBVyxDQUFDRyxPQUFPLEVBQUNFLE1BQU0sQ0FBQztJQUN4QyxJQUFJQyxJQUFJLENBQUNDLE1BQU0sSUFBSSxDQUFDLEVBQUM7UUFDcEIsTUFBTUMsR0FBRyxHQUFHLGlDQUFpQyxHQUFHRixJQUFJO1FBQ3BESixHQUFHLENBQUNPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVDLE1BQU0sRUFBRSxPQUFPO1lBQUVDLE1BQU0sRUFBRUosR0FBRztTQUFFLENBQUMsQ0FBQztRQUN2RCxPQUFPO0tBQ1A7SUFFRCxNQUFNSyxJQUFJLEdBQUcsTUFBTWQsNkVBQWMsQ0FBQ0ksT0FBTyxDQUFDVyxRQUFRLENBQUM7SUFFbkQsc0NBQXNDO0lBQ3RDLElBQUlELElBQUksSUFBSUUsU0FBUyxFQUFFO1FBQ3RCLGtCQUFrQjtRQUNsQixJQUFJRixJQUFJLENBQUNHLGFBQWEsSUFBSWIsT0FBTyxDQUFDYyxRQUFRLEVBQUU7WUFDM0MsOENBQThDO1lBQzlDZixHQUFHLENBQUNPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFQyxNQUFNLEVBQUUsU0FBUztnQkFBRUMsTUFBTSxFQUFFLEVBQUU7YUFBRSxDQUFDLENBQUM7U0FDeEQsTUFBTTtZQUNOVixHQUFHLENBQUNPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFQyxNQUFNLEVBQUUsT0FBTztnQkFBRUMsTUFBTSxFQUFFLGdCQUFnQjthQUFFLENBQUMsQ0FBQztTQUNwRTtLQUNELE1BQU07UUFDTlYsR0FBRyxDQUFDTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFQyxNQUFNLEVBQUUsT0FBTztZQUFFQyxNQUFNLEVBQUUsZ0JBQWdCO1NBQUUsQ0FBQyxDQUFDO0tBQ3BFO0NBQ0QsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyYW5rZW5zdG9yeS13ZWIvLi9wYWdlcy9hcGkvZ2VuZXJhbC9sb2dpbi5qcz84NjQ3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlbGVjdFBsYXllckRCIH0gZnJvbSBcIi4uLy4uLy4uL3ByaXNtYS9xdWVyaWVzL1NFTEVDVC9wbGF5ZXJcIjtcbmltcG9ydCB7Y2hlY2tGaWVsZHN9IGZyb20gXCIuLi8uLi8uLi9saWIvY2hlY2tGaWVsZHNcIjtcblxuLy8gQWwgaXIgYSBodHRwOi8vbG9jYWxob3N0OjMwMDAvYXBpL2xvZ2luIHRlIGRldnVlbHZlIGVsIHNpZ3VpZW50ZSBqc29uXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxLCByZXMpID0+IHtcblx0Y29uc3QgbWVzc2FnZSA9IHJlcS5ib2R5O1xuXHRcblx0Y29uc3QgZmllbGRzID0gWyd1c2VybmFtZScsJ3Bhc3N3b3JkJ107XG5cblx0Y29uc3QgcmVzdCA9IGNoZWNrRmllbGRzKG1lc3NhZ2UsZmllbGRzKVxuXHRpZiAocmVzdC5sZW5ndGggIT0gMCl7XG5cdFx0Y29uc3QgbXNnID0gXCJpbnZhbGlkIGNyZWRlbnRpYWxzLCBleHBlY3RlZDogXCIgKyByZXN0XG5cdFx0cmVzLnN0YXR1cygyMDApLmpzb24oeyByZXN1bHQ6IFwiZXJyb3JcIiwgcmVhc29uOiBtc2cgfSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgdXNlciA9IGF3YWl0IHNlbGVjdFBsYXllckRCKG1lc3NhZ2UudXNlcm5hbWUpO1xuXG5cdC8vIGNoZWNrcyBpZiB0aGUgcmVxdWVzdGVkIHVzZXIgZXhpc3RzXG5cdGlmICh1c2VyICE9IHVuZGVmaW5lZCkge1xuXHRcdC8vIGNoZWNrcyBwYXNzd29yZFxuXHRcdGlmICh1c2VyLnBhc3N3b3JkX2hhc2ggPT0gbWVzc2FnZS5wYXNzd29yZCkge1xuXHRcdFx0Ly9jYW1iaWFyIHBvciBwYXNzd29yZCArIGFuYWRpciBtZWNhbmlzbW8gaGFzaFxuXHRcdFx0cmVzLnN0YXR1cygyMDApLmpzb24oeyByZXN1bHQ6IFwic3VjY2Vzc1wiLCByZWFzb246IFwiXCIgfSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgcmVzdWx0OiBcImVycm9yXCIsIHJlYXNvbjogXCJ3cm9uZ19wYXNzd29yZFwiIH0pO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXMuc3RhdHVzKDIwMCkuanNvbih7IHJlc3VsdDogXCJlcnJvclwiLCByZWFzb246IFwidXNlcl9ub3RfZm91bmRcIiB9KTtcblx0fVxufTtcbiJdLCJuYW1lcyI6WyJzZWxlY3RQbGF5ZXJEQiIsImNoZWNrRmllbGRzIiwicmVxIiwicmVzIiwibWVzc2FnZSIsImJvZHkiLCJmaWVsZHMiLCJyZXN0IiwibGVuZ3RoIiwibXNnIiwic3RhdHVzIiwianNvbiIsInJlc3VsdCIsInJlYXNvbiIsInVzZXIiLCJ1c2VybmFtZSIsInVuZGVmaW5lZCIsInBhc3N3b3JkX2hhc2giLCJwYXNzd29yZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/general/login.js\n");

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
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/general/login.js"));
module.exports = __webpack_exports__;

})();