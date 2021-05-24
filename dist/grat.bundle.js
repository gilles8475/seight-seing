(self["webpackChunkbabel_webpack_tuto"] = self["webpackChunkbabel_webpack_tuto"] || []).push([["grat"],{

/***/ "./src/Greeting.js":
/*!*************************!*\
  !*** ./src/Greeting.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);


var Greeting = function Greeting(value) {
  console.log(lodash__WEBPACK_IMPORTED_MODULE_0___default().join(['un', ' autre', ' module', ' chargé'], ' '));
  var element = document.createElement('div');
  var btn = document.createElement('button');
  btn.innerHTML = 'click to see message';

  btn.onclick = function () {
    var p = document.createElement('p');
    p.innerHTML = 'salut ' + value;
    element.appendChild(p); //const a= ()=> console.log('salut');
  };

  element.appendChild(btn);
  return element;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Greeting);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["shared"], () => (__webpack_exec__("./src/Greeting.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYWJlbC13ZWJwYWNrLXR1dG8vLi9zcmMvR3JlZXRpbmcuanMiXSwibmFtZXMiOlsiR3JlZXRpbmciLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJfIiwiZWxlbWVudCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImJ0biIsImlubmVySFRNTCIsIm9uY2xpY2siLCJwIiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBLElBQU1BLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNDLEtBQUQsRUFBVztBQUN4QkMsU0FBTyxDQUFDQyxHQUFSLENBQVlDLGtEQUFBLENBQU8sQ0FBQyxJQUFELEVBQU0sUUFBTixFQUFlLFNBQWYsRUFBMEIsU0FBMUIsQ0FBUCxFQUE0QyxHQUE1QyxDQUFaO0FBQ0EsTUFBTUMsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxNQUFNQyxHQUFHLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFaO0FBQ0FDLEtBQUcsQ0FBQ0MsU0FBSixHQUFnQixzQkFBaEI7O0FBQ0FELEtBQUcsQ0FBQ0UsT0FBSixHQUFjLFlBQVk7QUFDdEIsUUFBTUMsQ0FBQyxHQUFHTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBVjtBQUNBSSxLQUFDLENBQUNGLFNBQUYsR0FBYyxXQUFXUixLQUF6QjtBQUNBSSxXQUFPLENBQUNPLFdBQVIsQ0FBb0JELENBQXBCLEVBSHNCLENBSXRCO0FBR0gsR0FQRDs7QUFRQU4sU0FBTyxDQUFDTyxXQUFSLENBQW9CSixHQUFwQjtBQUNBLFNBQU9ILE9BQVA7QUFFSCxDQWhCRDs7QUFpQkEsaUVBQWVMLFFBQWYsRSIsImZpbGUiOiJncmF0LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCdcblxuY29uc3QgR3JlZXRpbmcgPSAodmFsdWUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhfLmpvaW4oWyd1bicsJyBhdXRyZScsJyBtb2R1bGUnLCAnIGNoYXJnw6knXSwnICcpKTtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGJ0bi5pbm5lckhUTUwgPSAnY2xpY2sgdG8gc2VlIG1lc3NhZ2UnXG4gICAgYnRuLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICAgICAgcC5pbm5lckhUTUwgPSAnc2FsdXQgJyArIHZhbHVlXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQocClcbiAgICAgICAgLy9jb25zdCBhPSAoKT0+IGNvbnNvbGUubG9nKCdzYWx1dCcpO1xuICAgICAgICBcblxuICAgIH1cbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGJ0bilcbiAgICByZXR1cm4gZWxlbWVudFxuXG59XG5leHBvcnQgZGVmYXVsdCBHcmVldGluZyJdLCJzb3VyY2VSb290IjoiIn0=