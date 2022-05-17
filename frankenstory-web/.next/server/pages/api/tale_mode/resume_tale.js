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
exports.id = "pages/api/tale_mode/resume_tale";
exports.ids = ["pages/api/tale_mode/resume_tale"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "(api)/./lib/Friendships.js":
/*!****************************!*\
  !*** ./lib/Friendships.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"bestN\": () => (/* binding */ bestN),\n/* harmony export */   \"selectFriendnames\": () => (/* binding */ selectFriendnames)\n/* harmony export */ });\n/* harmony import */ var _prisma_queries_SELECT_friendships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../prisma/queries/SELECT/friendships */ \"(api)/./prisma/queries/SELECT/friendships.js\");\n/* harmony import */ var _prisma_queries_SELECT_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../prisma/queries/SELECT/player */ \"(api)/./prisma/queries/SELECT/player.js\");\n\n\nasync function selectFriendnames(username) {\n    var friends = [];\n    let data = await (0,_prisma_queries_SELECT_friendships__WEBPACK_IMPORTED_MODULE_0__.selectFriendshipsDB)(username);\n    for(const row in data){\n        if (data[row].username == username) {\n            friends.push(data[row].friendname);\n        } else {\n            friends.push(data[row].username);\n        }\n    }\n    return friends;\n}\nasync function bestN(user, N) {\n    var ranking = [];\n    let friendnames = await selectFriendnames(user.username);\n    for(const row in friendnames){\n        const friend = await (0,_prisma_queries_SELECT_player__WEBPACK_IMPORTED_MODULE_1__.selectPlayerDB)(friendnames[row]);\n        ranking.push({\n            username: friendnames[row],\n            stars: friend.stars\n        });\n    }\n    ranking.push({\n        username: user.username,\n        stars: user.stars\n    });\n    ranking.sort((a, b)=>a.stars > b.stars ? -1 : 1\n    );\n    let bestN1 = [];\n    for(var i = 0; i < ranking.length && i < N; i++){\n        const u = {\n            username: ranking[i].username,\n            stars: ranking[i].stars\n        };\n        bestN1.push(u);\n    }\n    return bestN1;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvRnJpZW5kc2hpcHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUMyRTtBQUNWO0FBRTFELGVBQWVFLGlCQUFpQixDQUFDQyxRQUFRLEVBQUU7SUFDakQsSUFBSUMsT0FBTyxHQUFHLEVBQUU7SUFDaEIsSUFBSUMsSUFBSSxHQUFHLE1BQU1MLHVGQUFtQixDQUFDRyxRQUFRLENBQUM7SUFDOUMsSUFBSyxNQUFNRyxHQUFHLElBQUlELElBQUksQ0FBRTtRQUN2QixJQUFJQSxJQUFJLENBQUNDLEdBQUcsQ0FBQyxDQUFDSCxRQUFRLElBQUlBLFFBQVEsRUFBRTtZQUNuQ0MsT0FBTyxDQUFDRyxJQUFJLENBQUNGLElBQUksQ0FBQ0MsR0FBRyxDQUFDLENBQUNFLFVBQVUsQ0FBQyxDQUFDO1NBQ25DLE1BQU07WUFDTkosT0FBTyxDQUFDRyxJQUFJLENBQUNGLElBQUksQ0FBQ0MsR0FBRyxDQUFDLENBQUNILFFBQVEsQ0FBQyxDQUFDO1NBQ2pDO0tBQ0Q7SUFDRCxPQUFPQyxPQUFPLENBQUM7Q0FDZjtBQUVNLGVBQWVLLEtBQUssQ0FBQ0MsSUFBSSxFQUFDQyxDQUFDLEVBQUU7SUFDbkMsSUFBSUMsT0FBTyxHQUFHLEVBQUU7SUFDaEIsSUFBSUMsV0FBVyxHQUFHLE1BQU1YLGlCQUFpQixDQUFDUSxJQUFJLENBQUNQLFFBQVEsQ0FBQztJQUV4RCxJQUFLLE1BQU1HLEdBQUcsSUFBSU8sV0FBVyxDQUFDO1FBQzdCLE1BQU1DLE1BQU0sR0FBRyxNQUFNYiw2RUFBYyxDQUFDWSxXQUFXLENBQUNQLEdBQUcsQ0FBQyxDQUFDO1FBQ3JETSxPQUFPLENBQUNMLElBQUksQ0FBQztZQUFDSixRQUFRLEVBQUNVLFdBQVcsQ0FBQ1AsR0FBRyxDQUFDO1lBQUVTLEtBQUssRUFBQ0QsTUFBTSxDQUFDQyxLQUFLO1NBQUMsQ0FBQyxDQUFDO0tBQzlEO0lBQ0RILE9BQU8sQ0FBQ0wsSUFBSSxDQUFDO1FBQUNKLFFBQVEsRUFBQ08sSUFBSSxDQUFDUCxRQUFRO1FBQUVZLEtBQUssRUFBQ0wsSUFBSSxDQUFDSyxLQUFLO0tBQUMsQ0FBQyxDQUFDO0lBQ3pESCxPQUFPLENBQUNJLElBQUksQ0FBQyxDQUFDQyxDQUFDLEVBQUVDLENBQUMsR0FBSyxDQUFFLENBQUNILEtBQUssR0FBR0csQ0FBQyxDQUFDSCxLQUFLLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUFBLENBQUM7SUFFcEQsSUFBSU4sTUFBSyxHQUFHLEVBQUU7SUFFZCxJQUFLLElBQUlVLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR1AsT0FBTyxDQUFDUSxNQUFNLElBQUlELENBQUMsR0FBR1IsQ0FBQyxFQUFFUSxDQUFDLEVBQUUsQ0FBRTtRQUNqRCxNQUFNRSxDQUFDLEdBQUc7WUFBQ2xCLFFBQVEsRUFBQ1MsT0FBTyxDQUFDTyxDQUFDLENBQUMsQ0FBQ2hCLFFBQVE7WUFBQ1ksS0FBSyxFQUFDSCxPQUFPLENBQUNPLENBQUMsQ0FBQyxDQUFDSixLQUFLO1NBQUM7UUFDL0ROLE1BQUssQ0FBQ0YsSUFBSSxDQUFDYyxDQUFDLENBQUMsQ0FBQztLQUNkO0lBRUQsT0FBT1osTUFBSztDQUNaIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJhbmtlbnN0b3J5LXdlYi8uL2xpYi9GcmllbmRzaGlwcy5qcz9mZTdhIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgc2VsZWN0RnJpZW5kc2hpcHNEQiB9IGZyb20gXCIuLi9wcmlzbWEvcXVlcmllcy9TRUxFQ1QvZnJpZW5kc2hpcHNcIjtcbmltcG9ydCB7IHNlbGVjdFBsYXllckRCIH0gZnJvbSBcIi4uL3ByaXNtYS9xdWVyaWVzL1NFTEVDVC9wbGF5ZXJcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdEZyaWVuZG5hbWVzKHVzZXJuYW1lKSB7XG5cdHZhciBmcmllbmRzID0gW107XG5cdGxldCBkYXRhID0gYXdhaXQgc2VsZWN0RnJpZW5kc2hpcHNEQih1c2VybmFtZSk7XG5cdGZvciAoY29uc3Qgcm93IGluIGRhdGEpIHtcblx0XHRpZiAoZGF0YVtyb3ddLnVzZXJuYW1lID09IHVzZXJuYW1lKSB7XG5cdFx0XHRmcmllbmRzLnB1c2goZGF0YVtyb3ddLmZyaWVuZG5hbWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmcmllbmRzLnB1c2goZGF0YVtyb3ddLnVzZXJuYW1lKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZyaWVuZHM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBiZXN0Tih1c2VyLE4pIHtcblx0dmFyIHJhbmtpbmcgPSBbXTtcblx0bGV0IGZyaWVuZG5hbWVzID0gYXdhaXQgc2VsZWN0RnJpZW5kbmFtZXModXNlci51c2VybmFtZSk7XG5cblx0Zm9yIChjb25zdCByb3cgaW4gZnJpZW5kbmFtZXMpe1xuXHRcdGNvbnN0IGZyaWVuZCA9IGF3YWl0IHNlbGVjdFBsYXllckRCKGZyaWVuZG5hbWVzW3Jvd10pO1xuXHRcdHJhbmtpbmcucHVzaCh7dXNlcm5hbWU6ZnJpZW5kbmFtZXNbcm93XSwgc3RhcnM6ZnJpZW5kLnN0YXJzfSk7XG5cdH1cblx0cmFua2luZy5wdXNoKHt1c2VybmFtZTp1c2VyLnVzZXJuYW1lLCBzdGFyczp1c2VyLnN0YXJzfSk7XG5cdHJhbmtpbmcuc29ydCgoYSwgYikgPT4gKGEuc3RhcnMgPiBiLnN0YXJzKSA/IC0xIDogMSlcblxuXHRsZXQgYmVzdE4gPSBbXVxuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcmFua2luZy5sZW5ndGggJiYgaSA8IE47IGkrKykge1xuXHRcdGNvbnN0IHUgPSB7dXNlcm5hbWU6cmFua2luZ1tpXS51c2VybmFtZSxzdGFyczpyYW5raW5nW2ldLnN0YXJzfTtcblx0XHRiZXN0Ti5wdXNoKHUpO1xuXHR9XG5cblx0cmV0dXJuIGJlc3ROXG59Il0sIm5hbWVzIjpbInNlbGVjdEZyaWVuZHNoaXBzREIiLCJzZWxlY3RQbGF5ZXJEQiIsInNlbGVjdEZyaWVuZG5hbWVzIiwidXNlcm5hbWUiLCJmcmllbmRzIiwiZGF0YSIsInJvdyIsInB1c2giLCJmcmllbmRuYW1lIiwiYmVzdE4iLCJ1c2VyIiwiTiIsInJhbmtpbmciLCJmcmllbmRuYW1lcyIsImZyaWVuZCIsInN0YXJzIiwic29ydCIsImEiLCJiIiwiaSIsImxlbmd0aCIsInUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./lib/Friendships.js\n");

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

/***/ "(api)/./pages/api/tale_mode/resume_tale.js":
/*!********************************************!*\
  !*** ./pages/api/tale_mode/resume_tale.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_queries_SELECT_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../prisma/queries/SELECT/player */ \"(api)/./prisma/queries/SELECT/player.js\");\n/* harmony import */ var _prisma_queries_SELECT_tale_mode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../prisma/queries/SELECT/tale_mode */ \"(api)/./prisma/queries/SELECT/tale_mode.js\");\n/* harmony import */ var _prisma_queries_SELECT_paragraphs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../prisma/queries/SELECT/paragraphs */ \"(api)/./prisma/queries/SELECT/paragraphs.js\");\n/* harmony import */ var _lib_Friendships__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/Friendships */ \"(api)/./lib/Friendships.js\");\n/* harmony import */ var _lib_checkFields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../lib/checkFields */ \"(api)/./lib/checkFields.js\");\n\n\n\n\n\n// Al ir a http://localhost:3000/api/resume_tale te devuelve el siguiente json\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    const message = req.body;\n    const fields = [\n        \"username\",\n        \"password\",\n        \"id\"\n    ];\n    const rest = (0,_lib_checkFields__WEBPACK_IMPORTED_MODULE_4__.checkFields)(message, fields);\n    if (rest.length != 0) {\n        const msg = \"invalid credentials, expected: \" + rest;\n        res.status(200).json({\n            result: \"error\",\n            reason: msg\n        });\n        return;\n    }\n    const user = await (0,_prisma_queries_SELECT_player__WEBPACK_IMPORTED_MODULE_0__.selectPlayerDB)(message.username);\n    // checks if the requested user exists\n    if (user != undefined) {\n        // checks password\n        if (user.password_hash == message.password) {\n            //cambiar por password + anadir mecanismo hash\n            const tale = await (0,_prisma_queries_SELECT_tale_mode__WEBPACK_IMPORTED_MODULE_1__.selectTaleDB)(message.id);\n            if (tale != undefined) {\n                const paragraphs = await (0,_prisma_queries_SELECT_paragraphs__WEBPACK_IMPORTED_MODULE_2__.selectParagraphsDB)(message.id);\n                let friendnames = await (0,_lib_Friendships__WEBPACK_IMPORTED_MODULE_3__.selectFriendnames)(message.username);\n                /*const canEdit =\n\t\t\t\t\t(friendnames.indexOf(paragraphs[0].username) != -1 ||\n\t\t\t\t\t\tfriendnames.indexOf(paragraphs[0].username) ==\n\t\t\t\t\t\t\tmessage.username ||\n\t\t\t\t\t\ttale.privacy == 0) &&\n\t\t\t\t\ttale.max_turns > paragraphs.length &&\n\t\t\t\t\tfriendnames.indexOf(\n\t\t\t\t\t\tparagraphs[paragraphs.length - 1].username\n\t\t\t\t\t) != message.username;\n\n\t\t\t\tif (canEdit) {*/ res.status(200).json({\n                    result: \"success\",\n                    title: tale.title,\n                    reason: \"\",\n                    paragraphs: paragraphs,\n                    maxCharacters: tale.max_paragraph_chars\n                }); /*\n\t\t\t\t} else {\n\t\t\t\t\tres.status(200).json({\n\t\t\t\t\t\tresult: \"error\",\n\t\t\t\t\t\treason: \"cannot_access_tale\",\n\t\t\t\t\t});\n\t\t\t\t}*/ \n            } else {\n                res.status(200).json({\n                    result: \"error\",\n                    reason: \"tale_doesnot_exist\"\n                });\n            }\n        } else {\n            res.status(200).json({\n                result: \"error\",\n                reason: \"wrong_password\"\n            });\n        }\n    } else {\n        res.status(200).json({\n            result: \"error\",\n            reason: \"user_not_found\"\n        });\n    }\n    if (message.username.length == 0 || message.password.length == 0) {\n        res.status(200).json({\n            result: \"error\",\n            reason: \"invalid credentials\"\n        });\n    }\n//console.log(\"Username:\", message.username);\n//console.log(\"Password:\", message.password);\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdGFsZV9tb2RlL3Jlc3VtZV90YWxlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUF1RTtBQUNDO0FBQ087QUFDbEI7QUFDUjtBQUVyRCw4RUFBOEU7QUFDOUUsaUVBQWUsT0FBT0ssR0FBRyxFQUFFQyxHQUFHLEdBQUs7SUFDbEMsTUFBTUMsT0FBTyxHQUFHRixHQUFHLENBQUNHLElBQUk7SUFFeEIsTUFBTUMsTUFBTSxHQUFHO1FBQUMsVUFBVTtRQUFDLFVBQVU7UUFBQyxJQUFJO0tBQUM7SUFFM0MsTUFBTUMsSUFBSSxHQUFHTiw2REFBVyxDQUFDRyxPQUFPLEVBQUNFLE1BQU0sQ0FBQztJQUN4QyxJQUFJQyxJQUFJLENBQUNDLE1BQU0sSUFBSSxDQUFDLEVBQUM7UUFDcEIsTUFBTUMsR0FBRyxHQUFHLGlDQUFpQyxHQUFHRixJQUFJO1FBQ3BESixHQUFHLENBQUNPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVDLE1BQU0sRUFBRSxPQUFPO1lBQUVDLE1BQU0sRUFBRUosR0FBRztTQUFFLENBQUMsQ0FBQztRQUN2RCxPQUFPO0tBQ1A7SUFFRCxNQUFNSyxJQUFJLEdBQUcsTUFBTWpCLDZFQUFjLENBQUNPLE9BQU8sQ0FBQ1csUUFBUSxDQUFDO0lBRW5ELHNDQUFzQztJQUN0QyxJQUFJRCxJQUFJLElBQUlFLFNBQVMsRUFBRTtRQUN0QixrQkFBa0I7UUFDbEIsSUFBSUYsSUFBSSxDQUFDRyxhQUFhLElBQUliLE9BQU8sQ0FBQ2MsUUFBUSxFQUFFO1lBQzNDLDhDQUE4QztZQUM5QyxNQUFNQyxJQUFJLEdBQUcsTUFBTXJCLDhFQUFZLENBQUNNLE9BQU8sQ0FBQ2dCLEVBQUUsQ0FBQztZQUUzQyxJQUFJRCxJQUFJLElBQUlILFNBQVMsRUFBRTtnQkFDdEIsTUFBTUssVUFBVSxHQUFHLE1BQU10QixxRkFBa0IsQ0FBQ0ssT0FBTyxDQUFDZ0IsRUFBRSxDQUFDO2dCQUV2RCxJQUFJRSxXQUFXLEdBQUcsTUFBTXRCLG1FQUFpQixDQUFDSSxPQUFPLENBQUNXLFFBQVEsQ0FBQztnQkFDM0Q7Ozs7Ozs7Ozs7b0JBVWdCLENBQ2ZaLEdBQUcsQ0FBQ08sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7b0JBQ3BCQyxNQUFNLEVBQUUsU0FBUztvQkFDakJXLEtBQUssRUFBRUosSUFBSSxDQUFDSSxLQUFLO29CQUNqQlYsTUFBTSxFQUFFLEVBQUU7b0JBQ1ZRLFVBQVUsRUFBRUEsVUFBVTtvQkFDdEJHLGFBQWEsRUFBRUwsSUFBSSxDQUFDTSxtQkFBbUI7aUJBQ3ZDLENBQUMsQ0FBQzs7Ozs7O09BTUQ7YUFDSCxNQUFNO2dCQUNOdEIsR0FBRyxDQUFDTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztvQkFDcEJDLE1BQU0sRUFBRSxPQUFPO29CQUNmQyxNQUFNLEVBQUUsb0JBQW9CO2lCQUM1QixDQUFDLENBQUM7YUFDSDtTQUNELE1BQU07WUFDTlYsR0FBRyxDQUFDTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFBRUMsTUFBTSxFQUFFLE9BQU87Z0JBQUVDLE1BQU0sRUFBRSxnQkFBZ0I7YUFBRSxDQUFDLENBQUM7U0FDcEU7S0FDRCxNQUFNO1FBQ05WLEdBQUcsQ0FBQ08sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsTUFBTSxFQUFFLE9BQU87WUFBRUMsTUFBTSxFQUFFLGdCQUFnQjtTQUFFLENBQUMsQ0FBQztLQUNwRTtJQUNELElBQUlULE9BQU8sQ0FBQ1csUUFBUSxDQUFDUCxNQUFNLElBQUksQ0FBQyxJQUFJSixPQUFPLENBQUNjLFFBQVEsQ0FBQ1YsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUNqRUwsR0FBRyxDQUFDTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUNwQkMsTUFBTSxFQUFFLE9BQU87WUFDZkMsTUFBTSxFQUFFLHFCQUFxQjtTQUM3QixDQUFDLENBQUM7S0FDSDtBQUNELDZDQUE2QztBQUM3Qyw2Q0FBNkM7Q0FDN0MsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyYW5rZW5zdG9yeS13ZWIvLi9wYWdlcy9hcGkvdGFsZV9tb2RlL3Jlc3VtZV90YWxlLmpzP2ZlMjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VsZWN0UGxheWVyREIgfSBmcm9tIFwiLi4vLi4vLi4vcHJpc21hL3F1ZXJpZXMvU0VMRUNUL3BsYXllclwiO1xuaW1wb3J0IHsgc2VsZWN0VGFsZURCIH0gZnJvbSBcIi4uLy4uLy4uL3ByaXNtYS9xdWVyaWVzL1NFTEVDVC90YWxlX21vZGVcIjtcbmltcG9ydCB7IHNlbGVjdFBhcmFncmFwaHNEQiB9IGZyb20gXCIuLi8uLi8uLi9wcmlzbWEvcXVlcmllcy9TRUxFQ1QvcGFyYWdyYXBoc1wiO1xuaW1wb3J0IHsgc2VsZWN0RnJpZW5kbmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vbGliL0ZyaWVuZHNoaXBzXCI7XG5pbXBvcnQge2NoZWNrRmllbGRzfSBmcm9tIFwiLi4vLi4vLi4vbGliL2NoZWNrRmllbGRzXCI7XG5cbi8vIEFsIGlyIGEgaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9yZXN1bWVfdGFsZSB0ZSBkZXZ1ZWx2ZSBlbCBzaWd1aWVudGUganNvblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cdGNvbnN0IG1lc3NhZ2UgPSByZXEuYm9keTtcblx0XG5cdGNvbnN0IGZpZWxkcyA9IFsndXNlcm5hbWUnLCdwYXNzd29yZCcsJ2lkJ107XG5cblx0Y29uc3QgcmVzdCA9IGNoZWNrRmllbGRzKG1lc3NhZ2UsZmllbGRzKVxuXHRpZiAocmVzdC5sZW5ndGggIT0gMCl7XG5cdFx0Y29uc3QgbXNnID0gXCJpbnZhbGlkIGNyZWRlbnRpYWxzLCBleHBlY3RlZDogXCIgKyByZXN0XG5cdFx0cmVzLnN0YXR1cygyMDApLmpzb24oeyByZXN1bHQ6IFwiZXJyb3JcIiwgcmVhc29uOiBtc2cgfSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgdXNlciA9IGF3YWl0IHNlbGVjdFBsYXllckRCKG1lc3NhZ2UudXNlcm5hbWUpO1xuXG5cdC8vIGNoZWNrcyBpZiB0aGUgcmVxdWVzdGVkIHVzZXIgZXhpc3RzXG5cdGlmICh1c2VyICE9IHVuZGVmaW5lZCkge1xuXHRcdC8vIGNoZWNrcyBwYXNzd29yZFxuXHRcdGlmICh1c2VyLnBhc3N3b3JkX2hhc2ggPT0gbWVzc2FnZS5wYXNzd29yZCkge1xuXHRcdFx0Ly9jYW1iaWFyIHBvciBwYXNzd29yZCArIGFuYWRpciBtZWNhbmlzbW8gaGFzaFxuXHRcdFx0Y29uc3QgdGFsZSA9IGF3YWl0IHNlbGVjdFRhbGVEQihtZXNzYWdlLmlkKTtcblxuXHRcdFx0aWYgKHRhbGUgIT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnN0IHBhcmFncmFwaHMgPSBhd2FpdCBzZWxlY3RQYXJhZ3JhcGhzREIobWVzc2FnZS5pZCk7XG5cblx0XHRcdFx0bGV0IGZyaWVuZG5hbWVzID0gYXdhaXQgc2VsZWN0RnJpZW5kbmFtZXMobWVzc2FnZS51c2VybmFtZSk7XG5cdFx0XHRcdC8qY29uc3QgY2FuRWRpdCA9XG5cdFx0XHRcdFx0KGZyaWVuZG5hbWVzLmluZGV4T2YocGFyYWdyYXBoc1swXS51c2VybmFtZSkgIT0gLTEgfHxcblx0XHRcdFx0XHRcdGZyaWVuZG5hbWVzLmluZGV4T2YocGFyYWdyYXBoc1swXS51c2VybmFtZSkgPT1cblx0XHRcdFx0XHRcdFx0bWVzc2FnZS51c2VybmFtZSB8fFxuXHRcdFx0XHRcdFx0dGFsZS5wcml2YWN5ID09IDApICYmXG5cdFx0XHRcdFx0dGFsZS5tYXhfdHVybnMgPiBwYXJhZ3JhcGhzLmxlbmd0aCAmJlxuXHRcdFx0XHRcdGZyaWVuZG5hbWVzLmluZGV4T2YoXG5cdFx0XHRcdFx0XHRwYXJhZ3JhcGhzW3BhcmFncmFwaHMubGVuZ3RoIC0gMV0udXNlcm5hbWVcblx0XHRcdFx0XHQpICE9IG1lc3NhZ2UudXNlcm5hbWU7XG5cblx0XHRcdFx0aWYgKGNhbkVkaXQpIHsqL1xuXHRcdFx0XHRcdHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcblx0XHRcdFx0XHRcdHJlc3VsdDogXCJzdWNjZXNzXCIsXG5cdFx0XHRcdFx0XHR0aXRsZTogdGFsZS50aXRsZSxcblx0XHRcdFx0XHRcdHJlYXNvbjogXCJcIixcblx0XHRcdFx0XHRcdHBhcmFncmFwaHM6IHBhcmFncmFwaHMsXG5cdFx0XHRcdFx0XHRtYXhDaGFyYWN0ZXJzOiB0YWxlLm1heF9wYXJhZ3JhcGhfY2hhcnMsXG5cdFx0XHRcdFx0fSk7Lypcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXMuc3RhdHVzKDIwMCkuanNvbih7XG5cdFx0XHRcdFx0XHRyZXN1bHQ6IFwiZXJyb3JcIixcblx0XHRcdFx0XHRcdHJlYXNvbjogXCJjYW5ub3RfYWNjZXNzX3RhbGVcIixcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSovXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXMuc3RhdHVzKDIwMCkuanNvbih7XG5cdFx0XHRcdFx0cmVzdWx0OiBcImVycm9yXCIsXG5cdFx0XHRcdFx0cmVhc29uOiBcInRhbGVfZG9lc25vdF9leGlzdFwiLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzLnN0YXR1cygyMDApLmpzb24oeyByZXN1bHQ6IFwiZXJyb3JcIiwgcmVhc29uOiBcIndyb25nX3Bhc3N3b3JkXCIgfSk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgcmVzdWx0OiBcImVycm9yXCIsIHJlYXNvbjogXCJ1c2VyX25vdF9mb3VuZFwiIH0pO1xuXHR9XG5cdGlmIChtZXNzYWdlLnVzZXJuYW1lLmxlbmd0aCA9PSAwIHx8IG1lc3NhZ2UucGFzc3dvcmQubGVuZ3RoID09IDApIHtcblx0XHRyZXMuc3RhdHVzKDIwMCkuanNvbih7XG5cdFx0XHRyZXN1bHQ6IFwiZXJyb3JcIixcblx0XHRcdHJlYXNvbjogXCJpbnZhbGlkIGNyZWRlbnRpYWxzXCIsXG5cdFx0fSk7XG5cdH1cblx0Ly9jb25zb2xlLmxvZyhcIlVzZXJuYW1lOlwiLCBtZXNzYWdlLnVzZXJuYW1lKTtcblx0Ly9jb25zb2xlLmxvZyhcIlBhc3N3b3JkOlwiLCBtZXNzYWdlLnBhc3N3b3JkKTtcbn07XG4iXSwibmFtZXMiOlsic2VsZWN0UGxheWVyREIiLCJzZWxlY3RUYWxlREIiLCJzZWxlY3RQYXJhZ3JhcGhzREIiLCJzZWxlY3RGcmllbmRuYW1lcyIsImNoZWNrRmllbGRzIiwicmVxIiwicmVzIiwibWVzc2FnZSIsImJvZHkiLCJmaWVsZHMiLCJyZXN0IiwibGVuZ3RoIiwibXNnIiwic3RhdHVzIiwianNvbiIsInJlc3VsdCIsInJlYXNvbiIsInVzZXIiLCJ1c2VybmFtZSIsInVuZGVmaW5lZCIsInBhc3N3b3JkX2hhc2giLCJwYXNzd29yZCIsInRhbGUiLCJpZCIsInBhcmFncmFwaHMiLCJmcmllbmRuYW1lcyIsInRpdGxlIiwibWF4Q2hhcmFjdGVycyIsIm1heF9wYXJhZ3JhcGhfY2hhcnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/tale_mode/resume_tale.js\n");

/***/ }),

/***/ "(api)/./prisma/queries/SELECT/friendships.js":
/*!**********************************************!*\
  !*** ./prisma/queries/SELECT/friendships.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selectFriendshipsDB\": () => (/* binding */ selectFriendshipsDB)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.js\");\n\nasync function selectFriendshipsDB(username) {\n    const query = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].friendship.findMany({\n        where: {\n            OR: [\n                {\n                    username: {\n                        equals: username\n                    }\n                },\n                {\n                    friendname: {\n                        equals: username\n                    }\n                }, \n            ]\n        }\n    });\n    return query;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wcmlzbWEvcXVlcmllcy9TRUxFQ1QvZnJpZW5kc2hpcHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBeUM7QUFFbEMsZUFBZUMsbUJBQW1CLENBQUNDLFFBQVEsRUFBRTtJQUNuRCxNQUFNQyxLQUFLLEdBQUcsTUFBTUgsdUVBQTBCLENBQUM7UUFDOUNNLEtBQUssRUFBRTtZQUNOQyxFQUFFLEVBQUU7Z0JBQ0g7b0JBQUVMLFFBQVEsRUFBRTt3QkFBRU0sTUFBTSxFQUFFTixRQUFRO3FCQUFFO2lCQUFFO2dCQUNsQztvQkFBRU8sVUFBVSxFQUFFO3dCQUFFRCxNQUFNLEVBQUVOLFFBQVE7cUJBQUU7aUJBQUU7YUFDcEM7U0FDRDtLQUNELENBQUM7SUFFRixPQUFPQyxLQUFLLENBQUM7Q0FDYiIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyYW5rZW5zdG9yeS13ZWIvLi9wcmlzbWEvcXVlcmllcy9TRUxFQ1QvZnJpZW5kc2hpcHMuanM/ZjI2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJpc21hIGZyb20gXCIuLi8uLi8uLi9saWIvcHJpc21hXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0RnJpZW5kc2hpcHNEQih1c2VybmFtZSkge1xyXG5cdGNvbnN0IHF1ZXJ5ID0gYXdhaXQgcHJpc21hLmZyaWVuZHNoaXAuZmluZE1hbnkoe1xyXG5cdFx0d2hlcmU6IHtcclxuXHRcdFx0T1I6IFtcclxuXHRcdFx0XHR7IHVzZXJuYW1lOiB7IGVxdWFsczogdXNlcm5hbWUgfSB9LFxyXG5cdFx0XHRcdHsgZnJpZW5kbmFtZTogeyBlcXVhbHM6IHVzZXJuYW1lIH0gfSxcclxuXHRcdFx0XSxcclxuXHRcdH0sXHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBxdWVyeTtcclxufSJdLCJuYW1lcyI6WyJwcmlzbWEiLCJzZWxlY3RGcmllbmRzaGlwc0RCIiwidXNlcm5hbWUiLCJxdWVyeSIsImZyaWVuZHNoaXAiLCJmaW5kTWFueSIsIndoZXJlIiwiT1IiLCJlcXVhbHMiLCJmcmllbmRuYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./prisma/queries/SELECT/friendships.js\n");

/***/ }),

/***/ "(api)/./prisma/queries/SELECT/paragraphs.js":
/*!*********************************************!*\
  !*** ./prisma/queries/SELECT/paragraphs.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selectParagraphsDB\": () => (/* binding */ selectParagraphsDB)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.js\");\n\nasync function selectParagraphsDB(story_id) {\n    const query = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].paragraph.findMany({\n        where: {\n            story_id: {\n                equals: story_id\n            }\n        },\n        orderBy: {\n            turn_number: \"asc\"\n        }\n    });\n    return query;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wcmlzbWEvcXVlcmllcy9TRUxFQ1QvcGFyYWdyYXBocy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUF5QztBQUVsQyxlQUFlQyxrQkFBa0IsQ0FBQ0MsUUFBUSxFQUFFO0lBQ2xELE1BQU1DLEtBQUssR0FBRyxNQUFNSCxzRUFBeUIsQ0FBQztRQUM3Q00sS0FBSyxFQUFFO1lBQ05KLFFBQVEsRUFBRTtnQkFBRUssTUFBTSxFQUFFTCxRQUFRO2FBQUU7U0FDOUI7UUFDRE0sT0FBTyxFQUFFO1lBQ1JDLFdBQVcsRUFBRSxLQUFLO1NBQ2xCO0tBQ0QsQ0FBQztJQUVGLE9BQU9OLEtBQUssQ0FBQztDQUNiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJhbmtlbnN0b3J5LXdlYi8uL3ByaXNtYS9xdWVyaWVzL1NFTEVDVC9wYXJhZ3JhcGhzLmpzPzc5NGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByaXNtYSBmcm9tIFwiLi4vLi4vLi4vbGliL3ByaXNtYVwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbGVjdFBhcmFncmFwaHNEQihzdG9yeV9pZCkge1xyXG5cdGNvbnN0IHF1ZXJ5ID0gYXdhaXQgcHJpc21hLnBhcmFncmFwaC5maW5kTWFueSh7XHJcblx0XHR3aGVyZToge1xyXG5cdFx0XHRzdG9yeV9pZDogeyBlcXVhbHM6IHN0b3J5X2lkIH0sXHJcblx0XHR9LFxyXG5cdFx0b3JkZXJCeToge1xyXG5cdFx0XHR0dXJuX251bWJlcjogXCJhc2NcIixcclxuXHRcdH0sXHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBxdWVyeTtcclxufVxyXG4iXSwibmFtZXMiOlsicHJpc21hIiwic2VsZWN0UGFyYWdyYXBoc0RCIiwic3RvcnlfaWQiLCJxdWVyeSIsInBhcmFncmFwaCIsImZpbmRNYW55Iiwid2hlcmUiLCJlcXVhbHMiLCJvcmRlckJ5IiwidHVybl9udW1iZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./prisma/queries/SELECT/paragraphs.js\n");

/***/ }),

/***/ "(api)/./prisma/queries/SELECT/player.js":
/*!*****************************************!*\
  !*** ./prisma/queries/SELECT/player.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selectPlayerDB\": () => (/* binding */ selectPlayerDB)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.js\");\n\nasync function selectPlayerDB(username) {\n    const query = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].player.findMany({\n        where: {\n            username: {\n                equals: username || undefined\n            }\n        }\n    });\n    return query[0];\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wcmlzbWEvcXVlcmllcy9TRUxFQ1QvcGxheWVyLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXlDO0FBRWxDLGVBQWVDLGNBQWMsQ0FBQ0MsUUFBUSxFQUFFO0lBQzlDLE1BQU1DLEtBQUssR0FBRyxNQUFNSCxtRUFBc0IsQ0FBQztRQUMxQ00sS0FBSyxFQUFFO1lBQ05KLFFBQVEsRUFBRTtnQkFBRUssTUFBTSxFQUFFTCxRQUFRLElBQUlNLFNBQVM7YUFBRTtTQUMzQztLQUNELENBQUM7SUFFRixPQUFPTCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDaEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcmFua2Vuc3Rvcnktd2ViLy4vcHJpc21hL3F1ZXJpZXMvU0VMRUNUL3BsYXllci5qcz9mNWM3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcmlzbWEgZnJvbSBcIi4uLy4uLy4uL2xpYi9wcmlzbWFcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWxlY3RQbGF5ZXJEQih1c2VybmFtZSkge1xyXG5cdGNvbnN0IHF1ZXJ5ID0gYXdhaXQgcHJpc21hLnBsYXllci5maW5kTWFueSh7XHJcblx0XHR3aGVyZToge1xyXG5cdFx0XHR1c2VybmFtZTogeyBlcXVhbHM6IHVzZXJuYW1lIHx8IHVuZGVmaW5lZCB9LFxyXG5cdFx0fSxcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIHF1ZXJ5WzBdO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJwcmlzbWEiLCJzZWxlY3RQbGF5ZXJEQiIsInVzZXJuYW1lIiwicXVlcnkiLCJwbGF5ZXIiLCJmaW5kTWFueSIsIndoZXJlIiwiZXF1YWxzIiwidW5kZWZpbmVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./prisma/queries/SELECT/player.js\n");

/***/ }),

/***/ "(api)/./prisma/queries/SELECT/tale_mode.js":
/*!********************************************!*\
  !*** ./prisma/queries/SELECT/tale_mode.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selectTaleDB\": () => (/* binding */ selectTaleDB)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/prisma */ \"(api)/./lib/prisma.js\");\n\nasync function selectTaleDB(story_id) {\n    const query = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__[\"default\"].tale_mode.findMany({\n        where: {\n            story_id: {\n                equals: story_id\n            }\n        }\n    });\n    return query[0];\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wcmlzbWEvcXVlcmllcy9TRUxFQ1QvdGFsZV9tb2RlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXlDO0FBRWxDLGVBQWVDLFlBQVksQ0FBQ0MsUUFBUSxFQUFFO0lBQzVDLE1BQU1DLEtBQUssR0FBRyxNQUFNSCxzRUFBeUIsQ0FBQztRQUM3Q00sS0FBSyxFQUFFO1lBQ05KLFFBQVEsRUFBRTtnQkFBRUssTUFBTSxFQUFFTCxRQUFRO2FBQUU7U0FDOUI7S0FDRCxDQUFDO0lBRUYsT0FBT0MsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2hCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJhbmtlbnN0b3J5LXdlYi8uL3ByaXNtYS9xdWVyaWVzL1NFTEVDVC90YWxlX21vZGUuanM/ZWU4NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJpc21hIGZyb20gXCIuLi8uLi8uLi9saWIvcHJpc21hXCI7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VsZWN0VGFsZURCKHN0b3J5X2lkKSB7XHJcblx0Y29uc3QgcXVlcnkgPSBhd2FpdCBwcmlzbWEudGFsZV9tb2RlLmZpbmRNYW55KHtcclxuXHRcdHdoZXJlOiB7XHJcblx0XHRcdHN0b3J5X2lkOiB7IGVxdWFsczogc3RvcnlfaWQgfSxcclxuXHRcdH0sXHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBxdWVyeVswXTtcclxufVxyXG4iXSwibmFtZXMiOlsicHJpc21hIiwic2VsZWN0VGFsZURCIiwic3RvcnlfaWQiLCJxdWVyeSIsInRhbGVfbW9kZSIsImZpbmRNYW55Iiwid2hlcmUiLCJlcXVhbHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./prisma/queries/SELECT/tale_mode.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/tale_mode/resume_tale.js"));
module.exports = __webpack_exports__;

})();