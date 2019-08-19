"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Preloader = _interopRequireDefault(require("./Preloader.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Preloader =
/*#__PURE__*/
function (_Component) {
  _inherits(Preloader, _Component);

  function Preloader(props) {
    var _this;

    _classCallCheck(this, Preloader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Preloader).call(this, props));
    _this.containerRef = _react["default"].createRef();
    _this.canvas1Ref = _react["default"].createRef();
    _this.canvas2Ref = _react["default"].createRef();
    _this.canvas3Ref = _react["default"].createRef();
    _this.canvas4Ref = _react["default"].createRef();
    _this.canvas5Ref = _react["default"].createRef();
    _this.now = Date.now();
    _this.dt = 0;
    _this.prevNow = Date.now();
    _this.dtMod = 0;
    _this.twoPI = 6.283185307179586;
    _this.mouse = {
      originX: 0,
      originY: 0,
      x: 0,
      y: 0,
      updatePosition: function updatePosition(e) {
        this.x = e.clientX - this.originX;
        this.y = (e.clientY - this.originY) * -1;
      },
      setOrigin: function setOrigin(e) {
        this.originX = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this.originY = e.offsetTop + Math.floor(e.offsetHeight / 2);
      }
    };
    return _this;
  }

  _createClass(Preloader, [{
    key: "updateTransformStyle",
    value: function updateTransformStyle(x, y) {
      this.inner1.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
      this.inner2.style.transform = 'rotateX(' + x * 1.3 + 'deg) rotateY(' + y * 1.3 + 'deg)';
      this.inner3.style.transform = 'rotateX(' + x * 0.7 + 'deg) rotateY(' + y * 0.7 + 'deg)';
      this.inner4.style.transform = 'rotateX(' + x * 1.3 + 'deg) rotateY(' + y * 1.3 + 'deg)';
      this.inner5.style.transform = 'rotateX(' + x * 0.8 + 'deg) rotateY(' + y * 0.8 + 'deg)';
    }
  }, {
    key: "updateMouse",
    value: function updateMouse(event) {
      this.mouse.updatePosition(event);
      this.updateTransformStyle((this.mouse.y / this.inner1.offsetHeight / 2).toFixed(2) * 10.0, (this.mouse.x / this.inner1.offsetWidth / 2).toFixed(2) * 10.0);
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      event.preventDefault();
      this.updateMouse(event);
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(event) {
      event.preventDefault();

      if (typeof event.touches[0] !== 'undefined') {
        this.updateMouse(event.touches[0]);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.containerEl = this.containerRef.current;
      this.inner1 = this.canvas1Ref.current;
      this.inner2 = this.canvas2Ref.current;
      this.inner3 = this.canvas3Ref.current;
      this.inner4 = this.canvas4Ref.current;
      this.inner5 = this.canvas5Ref.current;
      this.context1 = this.inner1.getContext('2d');
      this.context2 = this.inner2.getContext('2d');
      this.context3 = this.inner3.getContext('2d');
      this.context4 = this.inner4.getContext('2d');
      this.context5 = this.inner5.getContext('2d');
      this.mouse.setOrigin(this.containerEl);
      window.addEventListener('resize', function () {
        this.mouse.setOrigin(this.containerEl);
      }.bind(this));
      this.drawLogo();
    }
  }, {
    key: "getDeltaTime",
    value: function getDeltaTime() {
      this.now = Date.now();
      this.dt = (this.now - this.prevNow) / 300;
      this.dtMod = (Math.sin(this.dt * 0.3) + 1) * 0.5 + 1;
      return this.dt;
    }
  }, {
    key: "getCubicBezierXYatPercent",
    value: function getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, percent) {
      var x = this.CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
      var y = this.CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "CubicN",
    value: function CubicN(pct, a, b, c, d) {
      var t2 = pct * pct;
      var t3 = t2 * pct;
      return a + (-a * 3 + pct * (3 * a - a * pct)) * pct + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct + (c * 3 - c * 3 * pct) * t2 + d * t3;
    }
  }, {
    key: "getLineXYatPercent",
    value: function getLineXYatPercent(startPt, endPt, percent) {
      var dx = endPt.x - startPt.x;
      var dy = endPt.y - startPt.y;
      var X = startPt.x + dx * percent;
      var Y = startPt.y + dy * percent;
      return {
        x: X,
        y: Y
      };
    }
  }, {
    key: "initLogo",
    value: function initLogo(ctx) {
      ctx.clearRect(0, 0, 300, 300);
      ctx.save();
    }
  }, {
    key: "drawBezier",
    value: function drawBezier(ctx, color, coords) {
      var right = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      // bezier curve
      ctx.strokeStyle = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')';
      ctx.lineWidth = 3;
      ctx.miterLimit = '10';
      ctx.shadowBlur = 3 * this.dtMod;
      ctx.shadowColor = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')';
      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);
      ctx.bezierCurveTo(coords[1].x, coords[1].y, coords[2].x, coords[2].y, coords[3].x, coords[3].y);
      ctx.stroke();
      ctx.restore();
      ctx.save(); // animate circles along curve

      var pathPos;

      for (var index = 0; index < 3; index++) {
        ctx.shadowBlur = 3 * this.dtMod;
        ctx.shadowColor = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')';
        ctx.strokeStyle = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')';
        ctx.lineWidth = 2;
        ctx.miterLimit = '10';
        ctx.beginPath();

        if (right) {
          pathPos = this.getCubicBezierXYatPercent(coords[0], coords[1], coords[2], coords[3], 1 - (this.dt + index) * 0.3 % 1);
          ctx.arc(pathPos.x, pathPos.y, (this.dt + index) * 0.3 % 1 * 5, 0, this.twoPI, false);
        } else {
          pathPos = this.getCubicBezierXYatPercent(coords[0], coords[1], coords[2], coords[3], (this.dt + index) * 0.3 % 1);
          ctx.arc(pathPos.x, pathPos.y, 5 - (this.dt + index) * 0.3 % 1 * 5, 0, this.twoPI, false);
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        ctx.save();
      }
    }
  }, {
    key: "drawLine",
    value: function drawLine(ctx, color, coords, offset) {
      var right = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      ctx.strokeStyle = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')';
      ctx.shadowColor = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')';
      ctx.lineWidth = 3;
      ctx.miterLimit = '10';
      ctx.translate(offset.x, offset.y);
      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);
      ctx.lineTo(coords[1].x, coords[1].y);
      ctx.stroke();
      ctx.restore();
      ctx.save();
      var pathPos;

      for (var index = 0; index < 1; index++) {
        ctx.strokeStyle = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')';
        ctx.shadowColor = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')';
        ctx.lineWidth = 2;
        ctx.miterLimit = '10';
        ctx.translate(offset.x, offset.y);
        ctx.beginPath();

        if (right) {
          pathPos = this.getLineXYatPercent(coords[0], coords[1], 1 - (this.dt + index) * 0.3 % 1);
          ctx.arc(pathPos.x, pathPos.y, (this.dt + index) * 0.3 % 1 * 5, 0, this.twoPI, false);
        } else {
          pathPos = this.getLineXYatPercent(coords[0], coords[1], (this.dt + index) * 0.3 % 1);
          ctx.arc(pathPos.x, pathPos.y, 5 - (this.dt + index) * 0.3 % 1 * 5, 0, this.twoPI, false);
        }

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        ctx.save();
      }
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(ctx, color, coords) {
      var fadeOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      ctx.shadowBlur = 3 * this.dtMod;
      ctx.shadowColor = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')';
      ctx.strokeStyle = 'rgb(' + color.r + ',' + color.g + ', ' + color.b + ')';
      ctx.lineWidth = 3;
      ctx.miterLimit = '10';
      ctx.fillStyle = 'rgba(' + color.r + ',' + color.g + ', ' + color.b + ', ' + (this.dt + fadeOffset) * 0.3 % 1 + ')';
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, 7.08, 0, this.twoPI, false);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
      ctx.save();
    }
  }, {
    key: "logo1",
    value: function logo1() {
      var ctx = this.context1;
      this.initLogo(ctx);
      this.drawBezier(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, [{
        x: 27.87,
        y: 18.78
      }, {
        x: 96,
        y: 17.45
      }, {
        x: 140.14,
        y: 65.87
      }, {
        x: 139.6,
        y: 103.92
      }]);
      this.drawBezier(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, [{
        x: 27.87,
        y: 188.37
      }, {
        x: 96,
        y: 189.7
      }, {
        x: 140.14,
        y: 141.28
      }, {
        x: 139.6,
        y: 103.23
      }]);
      this.drawCircle(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, {
        x: 20.4,
        y: 18.75
      });
      this.drawCircle(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, {
        x: 20.4,
        y: 188.75
      });
      this.drawBezier(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, [{
        x: 259,
        y: 18.78
      }, {
        x: 190.91,
        y: 17.45
      }, {
        x: 146.74,
        y: 65.87
      }, {
        x: 147.27,
        y: 103.92
      }], true);
      this.drawBezier(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, [{
        x: 259,
        y: 188.37
      }, {
        x: 190.91,
        y: 189.70000000000002
      }, {
        x: 146.74,
        y: 141.28
      }, {
        x: 147.27,
        y: 103.23
      }], true);
      this.drawCircle(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, {
        x: 265.4,
        y: 18.75
      }, 1);
      this.drawCircle(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, {
        x: 265.4,
        y: 188.75
      }, 1);
    }
  }, {
    key: "logo2",
    value: function logo2() {
      var ctx = this.context2;
      this.initLogo(ctx);
      this.drawBezier(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, [{
        x: 42.36,
        y: 41.91
      }, {
        x: 84.46000000000001,
        y: 41.08
      }, {
        x: 125.28,
        y: 66.69
      }, {
        x: 139.23000000000002,
        y: 102.16
      }]);
      this.drawBezier(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, [{
        x: 42.36,
        y: 165.24
      }, {
        x: 84.46000000000001,
        y: 166.07000000000002
      }, {
        x: 125.28,
        y: 140.46
      }, {
        x: 139.23000000000002,
        y: 104.99000000000001
      }]);
      this.drawCircle(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, {
        x: 34.4,
        y: 42.75
      });
      this.drawCircle(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, {
        x: 34.4,
        y: 164.75
      });
      this.drawBezier(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, [{
        x: 244.48,
        y: 41.91
      }, {
        x: 202.37,
        y: 41.08
      }, {
        x: 161.54999999999998,
        y: 66.69
      }, {
        x: 147.6,
        y: 102.16
      }], true);
      this.drawBezier(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, [{
        x: 244.48,
        y: 165.24
      }, {
        x: 202.37,
        y: 166.07000000000002
      }, {
        x: 161.54999999999998,
        y: 140.46
      }, {
        x: 147.6,
        y: 104.99000000000001
      }], true);
      this.drawCircle(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, {
        x: 251.4,
        y: 42.75
      }, 1);
      this.drawCircle(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, {
        x: 251.4,
        y: 164.75
      }, 1);
    }
  }, {
    key: "logo3",
    value: function logo3() {
      var ctx = this.context3;
      this.initLogo(ctx);
      this.drawBezier(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, [{
        x: 57.36,
        y: 64.93
      }, {
        x: 67.6,
        y: 64.93
      }, {
        x: 114,
        y: 71
      }, {
        x: 139.6,
        y: 104.74
      }]);
      this.drawBezier(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, [{
        x: 57.36,
        y: 142.9
      }, {
        x: 67.6,
        y: 142.9
      }, {
        x: 114,
        y: 136.76
      }, {
        x: 139.6,
        y: 103.1
      }]);
      this.drawCircle(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, {
        x: 50.4,
        y: 64.75
      });
      this.drawCircle(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, {
        x: 50.4,
        y: 141.75
      });
      this.drawBezier(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, [{
        x: 229.47,
        y: 64.59
      }, {
        x: 219.23,
        y: 64.59
      }, {
        x: 172.84,
        y: 70.73
      }, {
        x: 147.23,
        y: 104.39
      }], true);
      this.drawBezier(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, [{
        x: 229.47,
        y: 142.56
      }, {
        x: 219.23,
        y: 142.56
      }, {
        x: 172.84,
        y: 136.41
      }, {
        x: 147.23,
        y: 102.76
      }], true);
      this.drawCircle(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, {
        x: 235.4,
        y: 64.75
      }, 1);
      this.drawCircle(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, {
        x: 235.4,
        y: 141.75
      }, 1);
    }
  }, {
    key: "logo4",
    value: function logo4() {
      var ctx = this.context4;
      this.initLogo(ctx);
      this.drawBezier(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, [{
        x: 71.92,
        y: 86.83
      }, {
        x: 86.77,
        y: 88.05
      }, {
        x: 115.38,
        y: 93.56
      }, {
        x: 139.92,
        y: 104.39
      }]);
      this.drawBezier(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, [{
        x: 71.92,
        y: 120.32
      }, {
        x: 86.77,
        y: 119.1
      }, {
        x: 115.38,
        y: 113.59
      }, {
        x: 139.92,
        y: 102.76
      }]);
      this.drawCircle(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, {
        x: 64.4,
        y: 85.75
      });
      this.drawCircle(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, {
        x: 64.4,
        y: 119.75
      });
      this.drawBezier(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, [{
        x: 214.92,
        y: 86.83
      }, {
        x: 200.06,
        y: 88.05
      }, {
        x: 171.45,
        y: 93.56
      }, {
        x: 146.92,
        y: 104.39
      }], true);
      this.drawBezier(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, [{
        x: 214.92,
        y: 120.32
      }, {
        x: 200.06,
        y: 119.1
      }, {
        x: 171.45,
        y: 113.59
      }, {
        x: 146.92,
        y: 102.76
      }], true);
      this.drawCircle(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, {
        x: 221.4,
        y: 85.75
      }, 1);
      this.drawCircle(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, {
        x: 221.4,
        y: 119.75
      }, 1);
    }
  }, {
    key: "logo5",
    value: function logo5() {
      var ctx = this.context5;
      this.initLogo(ctx);
      this.drawLine(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, [{
        x: 16.44,
        y: 9.06
      }, {
        x: 62.25,
        y: 9.4
      }], {
        x: 73.82,
        y: 94.17
      });
      this.drawCircle(ctx, {
        r: 237,
        g: 28,
        b: 36
      }, {
        x: 82.4,
        y: 102.75
      });
      this.drawLine(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, [{
        x: 118.75,
        y: 9.06
      }, {
        x: 72.94,
        y: 9.4
      }], {
        x: 73.82,
        y: 94.17
      }, true);
      this.drawCircle(ctx, {
        r: 255,
        g: 255,
        b: 255
      }, {
        x: 199.4,
        y: 102.75
      }, 1);
    }
  }, {
    key: "drawLogo",
    value: function drawLogo() {
      this.getDeltaTime();
      this.logo1();
      this.logo2();
      this.logo3();
      this.logo4();
      this.logo5();
      window.requestAnimationFrame(function () {
        this.drawLogo();
      }.bind(this));
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: _Preloader["default"].parent
      }, _react["default"].createElement("div", {
        className: _Preloader["default"].container,
        ref: this.containerRef,
        onMouseMove: this.onMouseMove.bind(this),
        onTouchMove: this.onTouchMove.bind(this)
      }, _react["default"].createElement("canvas", {
        ref: this.canvas1Ref,
        className: _Preloader["default"].inner,
        width: "300",
        height: "210"
      }), _react["default"].createElement("canvas", {
        ref: this.canvas2Ref,
        className: _Preloader["default"].inner,
        width: "300",
        height: "210"
      }), _react["default"].createElement("canvas", {
        ref: this.canvas3Ref,
        className: _Preloader["default"].inner,
        width: "300",
        height: "210"
      }), _react["default"].createElement("canvas", {
        ref: this.canvas4Ref,
        className: _Preloader["default"].inner,
        width: "300",
        height: "210"
      }), _react["default"].createElement("canvas", {
        ref: this.canvas5Ref,
        className: _Preloader["default"].inner,
        width: "300",
        height: "210"
      })));
    }
  }]);

  return Preloader;
}(_react.Component);

var _default = Preloader;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1ByZWxvYWRlci5qcyJdLCJuYW1lcyI6WyJQcmVsb2FkZXIiLCJwcm9wcyIsImNvbnRhaW5lclJlZiIsIlJlYWN0IiwiY3JlYXRlUmVmIiwiY2FudmFzMVJlZiIsImNhbnZhczJSZWYiLCJjYW52YXMzUmVmIiwiY2FudmFzNFJlZiIsImNhbnZhczVSZWYiLCJub3ciLCJEYXRlIiwiZHQiLCJwcmV2Tm93IiwiZHRNb2QiLCJ0d29QSSIsIm1vdXNlIiwib3JpZ2luWCIsIm9yaWdpblkiLCJ4IiwieSIsInVwZGF0ZVBvc2l0aW9uIiwiZSIsImNsaWVudFgiLCJjbGllbnRZIiwic2V0T3JpZ2luIiwib2Zmc2V0TGVmdCIsIk1hdGgiLCJmbG9vciIsIm9mZnNldFdpZHRoIiwib2Zmc2V0VG9wIiwib2Zmc2V0SGVpZ2h0IiwiaW5uZXIxIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJpbm5lcjIiLCJpbm5lcjMiLCJpbm5lcjQiLCJpbm5lcjUiLCJldmVudCIsInVwZGF0ZVRyYW5zZm9ybVN0eWxlIiwidG9GaXhlZCIsInByZXZlbnREZWZhdWx0IiwidXBkYXRlTW91c2UiLCJ0b3VjaGVzIiwiY29udGFpbmVyRWwiLCJjdXJyZW50IiwiY29udGV4dDEiLCJnZXRDb250ZXh0IiwiY29udGV4dDIiLCJjb250ZXh0MyIsImNvbnRleHQ0IiwiY29udGV4dDUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsImRyYXdMb2dvIiwic2luIiwic3RhcnRQdCIsImNvbnRyb2xQdDEiLCJjb250cm9sUHQyIiwiZW5kUHQiLCJwZXJjZW50IiwiQ3ViaWNOIiwicGN0IiwiYSIsImIiLCJjIiwiZCIsInQyIiwidDMiLCJkeCIsImR5IiwiWCIsIlkiLCJjdHgiLCJjbGVhclJlY3QiLCJzYXZlIiwiY29sb3IiLCJjb29yZHMiLCJyaWdodCIsInN0cm9rZVN0eWxlIiwiciIsImciLCJsaW5lV2lkdGgiLCJtaXRlckxpbWl0Iiwic2hhZG93Qmx1ciIsInNoYWRvd0NvbG9yIiwiYmVnaW5QYXRoIiwibW92ZVRvIiwiYmV6aWVyQ3VydmVUbyIsInN0cm9rZSIsInJlc3RvcmUiLCJwYXRoUG9zIiwiaW5kZXgiLCJnZXRDdWJpY0JlemllclhZYXRQZXJjZW50IiwiYXJjIiwiY2xvc2VQYXRoIiwib2Zmc2V0IiwidHJhbnNsYXRlIiwibGluZVRvIiwiZ2V0TGluZVhZYXRQZXJjZW50IiwiZmFkZU9mZnNldCIsImZpbGxTdHlsZSIsImZpbGwiLCJpbml0TG9nbyIsImRyYXdCZXppZXIiLCJkcmF3Q2lyY2xlIiwiZHJhd0xpbmUiLCJnZXREZWx0YVRpbWUiLCJsb2dvMSIsImxvZ28yIiwibG9nbzMiLCJsb2dvNCIsImxvZ281IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic3R5bGVzIiwicGFyZW50IiwiY29udGFpbmVyIiwib25Nb3VzZU1vdmUiLCJvblRvdWNoTW92ZSIsImlubmVyIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxTOzs7OztBQUNKLHFCQUFhQyxLQUFiLEVBQW9CO0FBQUE7O0FBQUE7O0FBQ2xCLG1GQUFNQSxLQUFOO0FBRUEsVUFBS0MsWUFBTCxHQUFvQkMsa0JBQU1DLFNBQU4sRUFBcEI7QUFDQSxVQUFLQyxVQUFMLEdBQWtCRixrQkFBTUMsU0FBTixFQUFsQjtBQUNBLFVBQUtFLFVBQUwsR0FBa0JILGtCQUFNQyxTQUFOLEVBQWxCO0FBQ0EsVUFBS0csVUFBTCxHQUFrQkosa0JBQU1DLFNBQU4sRUFBbEI7QUFDQSxVQUFLSSxVQUFMLEdBQWtCTCxrQkFBTUMsU0FBTixFQUFsQjtBQUNBLFVBQUtLLFVBQUwsR0FBa0JOLGtCQUFNQyxTQUFOLEVBQWxCO0FBRUEsVUFBS00sR0FBTCxHQUFXQyxJQUFJLENBQUNELEdBQUwsRUFBWDtBQUNBLFVBQUtFLEVBQUwsR0FBVSxDQUFWO0FBQ0EsVUFBS0MsT0FBTCxHQUFlRixJQUFJLENBQUNELEdBQUws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QjtBQUFqSCxTQUNFO0FBQVEsUUFBQSxHQUFHLEVBQUUsS0FBS2xELFVBQWxCO0FBQThCLFFBQUEsU0FBUyxFQUFFK0csc0JBQU9LLEtBQWhEO0FBQXVELFFBQUEsS0FBSyxFQUFDLEtBQTdEO0FBQW1FLFFBQUEsTUFBTSxFQUFDO0FBQTFFLFFBREYsRUFFRTtBQUFRLFFBQUEsR0FBRyxFQUFFLEtBQUtuSCxVQUFsQjtBQUE4QixRQUFBLFNBQVMsRUFBRThHLHNCQUFPSyxLQUFoRDtBQUF1RCxRQUFBLEtBQUssRUFBQyxLQUE3RDtBQUFtRSxRQUFBLE1BQU0sRUFBQztBQUExRSxRQUZGLEVBR0U7QUFBUSxRQUFBLEdBQUcsRUFBRSxLQUFLbEgsVUFBbEI7QUFBOEIsUUFBQSxTQUFTLEVBQUU2RyxzQkFBT0ssS0FBaEQ7QUFBdUQsUUFBQSxLQUFLLEVBQUMsS0FBN0Q7QUFBbUUsUUFBQSxNQUFNLEVBQUM7QUFBMUUsUUFIRixFQUlFO0FBQVEsUUFBQSxHQUFHLEVBQUUsS0FBS2pILFVBQWxCO0FBQThCLFFBQUEsU0FBUyxFQUFFNEcsc0JBQU9LLEtBQWhEO0FBQXVELFFBQUEsS0FBSyxFQUFDLEtBQTdEO0FBQW1FLFFBQUEsTUFBTSxFQUFDO0FBQTFFLFFBSkYsRUFLRTtBQUFRLFFBQUEsR0FBRyxFQUFFLEtBQUtoSCxVQUFsQjtBQUE4QixRQUFBLFNBQVMsRUFBRTJHLHNCQUFPSyxLQUFoRDtBQUF1RCxRQUFBLEtBQUssRUFBQyxLQUE3RDtBQUFtRSxRQUFBLE1BQU0sRUFBQztBQUExRSxRQUxGLENBREYsQ0FERjtBQVdEOzs7O0VBN2NxQkMsZ0I7O2VBZ2RUMUgsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9QcmVsb2FkZXIuY3NzJ1xyXG5cclxuY2xhc3MgUHJlbG9hZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKVxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyUmVmID0gUmVhY3QuY3JlYXRlUmVmKClcclxuICAgIHRoaXMuY2FudmFzMVJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpXHJcbiAgICB0aGlzLmNhbnZhczJSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKVxyXG4gICAgdGhpcy5jYW52YXMzUmVmID0gUmVhY3QuY3JlYXRlUmVmKClcclxuICAgIHRoaXMuY2FudmFzNFJlZiA9IFJlYWN0LmNyZWF0ZVJlZigpXHJcbiAgICB0aGlzLmNhbnZhczVSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKVxyXG5cclxuICAgIHRoaXMubm93ID0gRGF0ZS5ub3coKVxyXG4gICAgdGhpcy5kdCA9IDBcclxuICAgIHRoaXMucHJldk5vdyA9IERhdGUubm93KClcclxuICAgIHRoaXMuZHRNb2QgPSAwXHJcbiAgICB0aGlzLnR3b1BJID0gNi4yODMxODUzMDcxNzk1ODZcclxuXHJcbiAgICB0aGlzLm1vdXNlID0ge1xyXG4gICAgICBvcmlnaW5YOiAwLFxyXG4gICAgICBvcmlnaW5ZOiAwLFxyXG4gICAgICB4OiAwLFxyXG4gICAgICB5OiAwLFxyXG4gICAgICB1cGRhdGVQb3NpdGlvbjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB0aGlzLnggPSBlLmNsaWVudFggLSB0aGlzLm9yaWdpblhcclxuICAgICAgICB0aGlzLnkgPSAoZS5jbGllbnRZIC0gdGhpcy5vcmlnaW5ZKSAqIC0xXHJcbiAgICAgIH0sXHJcbiAgICAgIHNldE9yaWdpbjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB0aGlzLm9yaWdpblggPSBlLm9mZnNldExlZnQgKyBNYXRoLmZsb29yKGUub2Zmc2V0V2lkdGggLyAyKVxyXG4gICAgICAgIHRoaXMub3JpZ2luWSA9IGUub2Zmc2V0VG9wICsgTWF0aC5mbG9vcihlLm9mZnNldEhlaWdodCAvIDIpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVRyYW5zZm9ybVN0eWxlICh4LCB5KSB7XHJcbiAgICB0aGlzLmlubmVyMS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWCgnICsgeCArICdkZWcpIHJvdGF0ZVkoJyArIHkgKyAnZGVnKSdcclxuICAgIHRoaXMuaW5uZXIyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVYKCcgKyB4ICogMS4zICsgJ2RlZykgcm90YXRlWSgnICsgeSAqIDEuMyArICdkZWcpJ1xyXG4gICAgdGhpcy5pbm5lcjMuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVgoJyArIHggKiAwLjcgKyAnZGVnKSByb3RhdGVZKCcgKyB5ICogMC43ICsgJ2RlZyknXHJcbiAgICB0aGlzLmlubmVyNC5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWCgnICsgeCAqIDEuMyArICdkZWcpIHJvdGF0ZVkoJyArIHkgKiAxLjMgKyAnZGVnKSdcclxuICAgIHRoaXMuaW5uZXI1LnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVYKCcgKyB4ICogMC44ICsgJ2RlZykgcm90YXRlWSgnICsgeSAqIDAuOCArICdkZWcpJ1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTW91c2UgKGV2ZW50KSB7XHJcbiAgICB0aGlzLm1vdXNlLnVwZGF0ZVBvc2l0aW9uKGV2ZW50KVxyXG4gICAgdGhpcy51cGRhdGVUcmFuc2Zvcm1TdHlsZShcclxuICAgICAgKHRoaXMubW91c2UueSAvIHRoaXMuaW5uZXIxLm9mZnNldEhlaWdodCAvIDIpLnRvRml4ZWQoMikgKiAxMC4wLFxyXG4gICAgICAodGhpcy5tb3VzZS54IC8gdGhpcy5pbm5lcjEub2Zmc2V0V2lkdGggLyAyKS50b0ZpeGVkKDIpICogMTAuMFxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgb25Nb3VzZU1vdmUgKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICB0aGlzLnVwZGF0ZU1vdXNlKGV2ZW50KVxyXG4gIH1cclxuXHJcbiAgb25Ub3VjaE1vdmUgKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBpZiAodHlwZW9mIGV2ZW50LnRvdWNoZXNbMF0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTW91c2UoZXZlbnQudG91Y2hlc1swXSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgIHRoaXMuY29udGFpbmVyRWwgPSB0aGlzLmNvbnRhaW5lclJlZi5jdXJyZW50XHJcblxyXG4gICAgdGhpcy5pbm5lcjEgPSB0aGlzLmNhbnZhczFSZWYuY3VycmVudFxyXG4gICAgdGhpcy5pbm5lcjIgPSB0aGlzLmNhbnZhczJSZWYuY3VycmVudFxyXG4gICAgdGhpcy5pbm5lcjMgPSB0aGlzLmNhbnZhczNSZWYuY3VycmVudFxyXG4gICAgdGhpcy5pbm5lcjQgPSB0aGlzLmNhbnZhczRSZWYuY3VycmVudFxyXG4gICAgdGhpcy5pbm5lcjUgPSB0aGlzLmNhbnZhczVSZWYuY3VycmVudFxyXG5cclxuICAgIHRoaXMuY29udGV4dDEgPSB0aGlzLmlubmVyMS5nZXRDb250ZXh0KCcyZCcpXHJcbiAgICB0aGlzLmNvbnRleHQyID0gdGhpcy5pbm5lcjIuZ2V0Q29udGV4dCgnMmQnKVxyXG4gICAgdGhpcy5jb250ZXh0MyA9IHRoaXMuaW5uZXIzLmdldENvbnRleHQoJzJkJylcclxuICAgIHRoaXMuY29udGV4dDQgPSB0aGlzLmlubmVyNC5nZXRDb250ZXh0KCcyZCcpXHJcbiAgICB0aGlzLmNvbnRleHQ1ID0gdGhpcy5pbm5lcjUuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuICAgIHRoaXMubW91c2Uuc2V0T3JpZ2luKHRoaXMuY29udGFpbmVyRWwpXHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5tb3VzZS5zZXRPcmlnaW4odGhpcy5jb250YWluZXJFbClcclxuICAgIH0uYmluZCh0aGlzKSlcclxuXHJcbiAgICB0aGlzLmRyYXdMb2dvKClcclxuICB9XHJcblxyXG4gIGdldERlbHRhVGltZSAoKSB7XHJcbiAgICB0aGlzLm5vdyA9IERhdGUubm93KClcclxuICAgIHRoaXMuZHQgPSAodGhpcy5ub3cgLSB0aGlzLnByZXZOb3cpIC8gMzAwXHJcbiAgICB0aGlzLmR0TW9kID0gKChNYXRoLnNpbih0aGlzLmR0ICogMC4zKSArIDEpICogMC41KSArIDFcclxuICAgIHJldHVybiB0aGlzLmR0XHJcbiAgfVxyXG5cclxuICBnZXRDdWJpY0JlemllclhZYXRQZXJjZW50IChzdGFydFB0LCBjb250cm9sUHQxLCBjb250cm9sUHQyLCBlbmRQdCwgcGVyY2VudCkge1xyXG4gICAgdmFyIHggPSB0aGlzLkN1YmljTihwZXJjZW50LCBzdGFydFB0LngsIGNvbnRyb2xQdDEueCwgY29udHJvbFB0Mi54LCBlbmRQdC54KVxyXG4gICAgdmFyIHkgPSB0aGlzLkN1YmljTihwZXJjZW50LCBzdGFydFB0LnksIGNvbnRyb2xQdDEueSwgY29udHJvbFB0Mi55LCBlbmRQdC55KVxyXG4gICAgcmV0dXJuICh7XHJcbiAgICAgIHg6IHgsXHJcbiAgICAgIHk6IHlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBDdWJpY04gKHBjdCwgYSwgYiwgYywgZCkge1xyXG4gICAgdmFyIHQyID0gcGN0ICogcGN0XHJcbiAgICB2YXIgdDMgPSB0MiAqIHBjdFxyXG4gICAgcmV0dXJuIGEgKyAoLWEgKiAzICsgcGN0ICogKDMgKiBhIC0gYSAqIHBjdCkpICogcGN0ICsgKDMgKiBiICsgcGN0ICogKC02ICogYiArIGIgKiAzICogcGN0KSkgKiBwY3QgKyAoYyAqIDMgLSBjICogMyAqIHBjdCkgKiB0MiArIGQgKiB0M1xyXG4gIH1cclxuXHJcbiAgZ2V0TGluZVhZYXRQZXJjZW50IChzdGFydFB0LCBlbmRQdCwgcGVyY2VudCkge1xyXG4gICAgdmFyIGR4ID0gZW5kUHQueCAtIHN0YXJ0UHQueFxyXG4gICAgdmFyIGR5ID0gZW5kUHQueSAtIHN0YXJ0UHQueVxyXG4gICAgdmFyIFggPSBzdGFydFB0LnggKyBkeCAqIHBlcmNlbnRcclxuICAgIHZhciBZID0gc3RhcnRQdC55ICsgZHkgKiBwZXJjZW50XHJcbiAgICByZXR1cm4gKHtcclxuICAgICAgeDogWCxcclxuICAgICAgeTogWVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGluaXRMb2dvIChjdHgpIHtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgMzAwLCAzMDApXHJcbiAgICBjdHguc2F2ZSgpXHJcbiAgfVxyXG5cclxuICBkcmF3QmV6aWVyIChjdHgsIGNvbG9yLCBjb29yZHMsIHJpZ2h0ID0gZmFsc2UpIHtcclxuICAgIC8vIGJlemllciBjdXJ2ZVxyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYignICsgY29sb3IuciArICcsJyArIGNvbG9yLmcgKyAnLCAnICsgY29sb3IuYiArICcpJ1xyXG4gICAgY3R4LmxpbmVXaWR0aCA9IDNcclxuICAgIGN0eC5taXRlckxpbWl0ID0gJzEwJ1xyXG4gICAgY3R4LnNoYWRvd0JsdXIgPSAzICogdGhpcy5kdE1vZFxyXG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJ3JnYignICsgY29sb3IuciArICcsJyArIGNvbG9yLmcgKyAnLCAnICsgY29sb3IuYiArICcpJ1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpXHJcbiAgICBjdHgubW92ZVRvKGNvb3Jkc1swXS54LCBjb29yZHNbMF0ueSlcclxuICAgIGN0eC5iZXppZXJDdXJ2ZVRvKGNvb3Jkc1sxXS54LCBjb29yZHNbMV0ueSwgY29vcmRzWzJdLngsIGNvb3Jkc1syXS55LCBjb29yZHNbM10ueCwgY29vcmRzWzNdLnkpXHJcbiAgICBjdHguc3Ryb2tlKClcclxuICAgIGN0eC5yZXN0b3JlKClcclxuICAgIGN0eC5zYXZlKClcclxuXHJcbiAgICAvLyBhbmltYXRlIGNpcmNsZXMgYWxvbmcgY3VydmVcclxuICAgIGxldCBwYXRoUG9zXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMzsgaW5kZXgrKykge1xyXG4gICAgICBjdHguc2hhZG93Qmx1ciA9IDMgKiB0aGlzLmR0TW9kXHJcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9ICdyZ2IoJyArIGNvbG9yLnIgKyAnLCcgKyBjb2xvci5nICsgJywgJyArIGNvbG9yLmIgKyAnKSdcclxuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYignICsgY29sb3IuciArICcsJyArIGNvbG9yLmcgKyAnLCAnICsgY29sb3IuYiArICcpJ1xyXG4gICAgICBjdHgubGluZVdpZHRoID0gMlxyXG4gICAgICBjdHgubWl0ZXJMaW1pdCA9ICcxMCdcclxuICAgICAgY3R4LmJlZ2luUGF0aCgpXHJcbiAgICAgIGlmIChyaWdodCkge1xyXG4gICAgICAgIHBhdGhQb3MgPSB0aGlzLmdldEN1YmljQmV6aWVyWFlhdFBlcmNlbnQoY29vcmRzWzBdLCBjb29yZHNbMV0sIGNvb3Jkc1syXSwgY29vcmRzWzNdLCAxIC0gKCgodGhpcy5kdCArIGluZGV4KSAqIDAuMykgJSAxKSlcclxuICAgICAgICBjdHguYXJjKHBhdGhQb3MueCwgcGF0aFBvcy55LCAoKCgoKHRoaXMuZHQgKyBpbmRleCkgKiAwLjMpICUgMSkgKiA1KSksIDAsIHRoaXMudHdvUEksIGZhbHNlKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhdGhQb3MgPSB0aGlzLmdldEN1YmljQmV6aWVyWFlhdFBlcmNlbnQoY29vcmRzWzBdLCBjb29yZHNbMV0sIGNvb3Jkc1syXSwgY29vcmRzWzNdLCAoKHRoaXMuZHQgKyBpbmRleCkgKiAwLjMpICUgMSlcclxuICAgICAgICBjdHguYXJjKHBhdGhQb3MueCwgcGF0aFBvcy55LCAoNSAtICgoKCh0aGlzLmR0ICsgaW5kZXgpICogMC4zKSAlIDEpICogNSkpLCAwLCB0aGlzLnR3b1BJLCBmYWxzZSlcclxuICAgICAgfVxyXG4gICAgICBjdHguY2xvc2VQYXRoKClcclxuICAgICAgY3R4LnN0cm9rZSgpXHJcbiAgICAgIGN0eC5yZXN0b3JlKClcclxuICAgICAgY3R4LnNhdmUoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZHJhd0xpbmUgKGN0eCwgY29sb3IsIGNvb3Jkcywgb2Zmc2V0LCByaWdodCA9IGZhbHNlKSB7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiKCcgKyBjb2xvci5yICsgJywnICsgY29sb3IuZyArICcsICcgKyBjb2xvci5iICsgJyknXHJcbiAgICBjdHguc2hhZG93Q29sb3IgPSAncmdiKCcgKyBjb2xvci5yICsgJywnICsgY29sb3IuZyArICcsICcgKyBjb2xvci5iICsgJyknXHJcbiAgICBjdHgubGluZVdpZHRoID0gM1xyXG4gICAgY3R4Lm1pdGVyTGltaXQgPSAnMTAnXHJcbiAgICBjdHgudHJhbnNsYXRlKG9mZnNldC54LCBvZmZzZXQueSlcclxuICAgIGN0eC5iZWdpblBhdGgoKVxyXG4gICAgY3R4Lm1vdmVUbyhjb29yZHNbMF0ueCwgY29vcmRzWzBdLnkpXHJcbiAgICBjdHgubGluZVRvKGNvb3Jkc1sxXS54LCBjb29yZHNbMV0ueSlcclxuICAgIGN0eC5zdHJva2UoKVxyXG4gICAgY3R4LnJlc3RvcmUoKVxyXG4gICAgY3R4LnNhdmUoKVxyXG5cclxuICAgIGxldCBwYXRoUG9zXHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMTsgaW5kZXgrKykge1xyXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiKCcgKyBjb2xvci5yICsgJywnICsgY29sb3IuZyArICcsICcgKyBjb2xvci5iICsgJyknXHJcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9ICdyZ2IoJyArIGNvbG9yLnIgKyAnLCcgKyBjb2xvci5nICsgJywgJyArIGNvbG9yLmIgKyAnKSdcclxuICAgICAgY3R4LmxpbmVXaWR0aCA9IDJcclxuICAgICAgY3R4Lm1pdGVyTGltaXQgPSAnMTAnXHJcbiAgICAgIGN0eC50cmFuc2xhdGUob2Zmc2V0LngsIG9mZnNldC55KVxyXG4gICAgICBjdHguYmVnaW5QYXRoKClcclxuICAgICAgaWYgKHJpZ2h0KSB7XHJcbiAgICAgICAgcGF0aFBvcyA9IHRoaXMuZ2V0TGluZVhZYXRQZXJjZW50KGNvb3Jkc1swXSwgY29vcmRzWzFdLCAxIC0gKCgodGhpcy5kdCArIGluZGV4KSAqIDAuMykgJSAxKSlcclxuICAgICAgICBjdHguYXJjKHBhdGhQb3MueCwgcGF0aFBvcy55LCAoKCgoKHRoaXMuZHQgKyBpbmRleCkgKiAwLjMpICUgMSkgKiA1KSksIDAsIHRoaXMudHdvUEksIGZhbHNlKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhdGhQb3MgPSB0aGlzLmdldExpbmVYWWF0UGVyY2VudChjb29yZHNbMF0sIGNvb3Jkc1sxXSwgKCh0aGlzLmR0ICsgaW5kZXgpICogMC4zKSAlIDEpXHJcbiAgICAgICAgY3R4LmFyYyhwYXRoUG9zLngsIHBhdGhQb3MueSwgKDUgLSAoKCgodGhpcy5kdCArIGluZGV4KSAqIDAuMykgJSAxKSAqIDUpKSwgMCwgdGhpcy50d29QSSwgZmFsc2UpXHJcbiAgICAgIH1cclxuICAgICAgY3R4LmNsb3NlUGF0aCgpXHJcbiAgICAgIGN0eC5zdHJva2UoKVxyXG4gICAgICBjdHgucmVzdG9yZSgpXHJcbiAgICAgIGN0eC5zYXZlKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRyYXdDaXJjbGUgKGN0eCwgY29sb3IsIGNvb3JkcywgZmFkZU9mZnNldCA9IDApIHtcclxuICAgIGN0eC5zaGFkb3dCbHVyID0gMyAqIHRoaXMuZHRNb2RcclxuICAgIGN0eC5zaGFkb3dDb2xvciA9ICdyZ2IoJyArIGNvbG9yLnIgKyAnLCcgKyBjb2xvci5nICsgJywgJyArIGNvbG9yLmIgKyAnKSdcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2IoJyArIGNvbG9yLnIgKyAnLCcgKyBjb2xvci5nICsgJywgJyArIGNvbG9yLmIgKyAnKSdcclxuICAgIGN0eC5saW5lV2lkdGggPSAzXHJcbiAgICBjdHgubWl0ZXJMaW1pdCA9ICcxMCdcclxuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgnICsgY29sb3IuciArICcsJyArIGNvbG9yLmcgKyAnLCAnICsgY29sb3IuYiArICcsICcgKyAoKHRoaXMuZHQgKyBmYWRlT2Zmc2V0KSAqIDAuMykgJSAxICsgJyknXHJcbiAgICBjdHguYmVnaW5QYXRoKClcclxuICAgIGN0eC5hcmMoY29vcmRzLngsIGNvb3Jkcy55LCA3LjA4LCAwLCB0aGlzLnR3b1BJLCBmYWxzZSlcclxuICAgIGN0eC5maWxsKClcclxuICAgIGN0eC5jbG9zZVBhdGgoKVxyXG4gICAgY3R4LnN0cm9rZSgpXHJcbiAgICBjdHgucmVzdG9yZSgpXHJcbiAgICBjdHguc2F2ZSgpXHJcbiAgfVxyXG5cclxuICBsb2dvMSAoKSB7XHJcbiAgICBjb25zdCBjdHggPSB0aGlzLmNvbnRleHQxXHJcbiAgICB0aGlzLmluaXRMb2dvKGN0eClcclxuXHJcbiAgICB0aGlzLmRyYXdCZXppZXIoY3R4LCB7IHI6IDIzNywgZzogMjgsIGI6IDM2IH0sXHJcbiAgICAgIFtcclxuICAgICAgICB7IHg6IDI3Ljg3LCB5OiAxOC43OCB9LFxyXG4gICAgICAgIHsgeDogOTYsIHk6IDE3LjQ1IH0sXHJcbiAgICAgICAgeyB4OiAxNDAuMTQsIHk6IDY1Ljg3IH0sXHJcbiAgICAgICAgeyB4OiAxMzkuNiwgeTogMTAzLjkyIH1cclxuICAgICAgXVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZHJhd0JlemllcihjdHgsIHsgcjogMjM3LCBnOiAyOCwgYjogMzYgfSxcclxuICAgICAgW1xyXG4gICAgICAgIHsgeDogMjcuODcsIHk6IDE4OC4zNyB9LFxyXG4gICAgICAgIHsgeDogOTYsIHk6IDE4OS43IH0sXHJcbiAgICAgICAgeyB4OiAxNDAuMTQsIHk6IDE0MS4yOCB9LFxyXG4gICAgICAgIHsgeDogMTM5LjYsIHk6IDEwMy4yMyB9XHJcbiAgICAgIF1cclxuICAgIClcclxuXHJcbiAgICB0aGlzLmRyYXdDaXJjbGUoY3R4LCB7IHI6IDIzNywgZzogMjgsIGI6IDM2IH0sIHsgeDogMjAuNCwgeTogMTguNzUgfSlcclxuICAgIHRoaXMuZHJhd0NpcmNsZShjdHgsIHsgcjogMjM3LCBnOiAyOCwgYjogMzYgfSwgeyB4OiAyMC40LCB5OiAxODguNzUgfSlcclxuXHJcbiAgICB0aGlzLmRyYXdCZXppZXIoY3R4LCB7IHI6IDI1NSwgZzogMjU1LCBiOiAyNTUgfSxcclxuICAgICAgW1xyXG4gICAgICAgIHsgeDogMjU5LCB5OiAxOC43OCB9LFxyXG4gICAgICAgIHsgeDogMTkwLjkxLCB5OiAxNy40NSB9LFxyXG4gICAgICAgIHsgeDogMTQ2Ljc0LCB5OiA2NS44NyB9LFxyXG4gICAgICAgIHsgeDogMTQ3LjI3LCB5OiAxMDMuOTIgfVxyXG4gICAgICBdLFxyXG4gICAgICB0cnVlXHJcbiAgICApXHJcblxyXG4gICAgdGhpcy5kcmF3QmV6aWVyKGN0eCwgeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH0sXHJcbiAgICAgIFtcclxuICAgICAgICB7IHg6IDI1OSwgeTogMTg4LjM3IH0sXHJcbiAgICAgICAgeyB4OiAxOTAuOTEsIHk6IDE4OS43MDAwMDAwMDAwMDAwMiB9LFxyXG4gICAgICAgIHsgeDogMTQ2Ljc0LCB5OiAxNDEuMjggfSxcclxuICAgICAgICB7IHg6IDE0Ny4yNywgeTogMTAzLjIzIH1cclxuICAgICAgXSxcclxuICAgICAgdHJ1ZVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZHJhd0NpcmNsZShjdHgsIHsgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSB9LCB7IHg6IDI2NS40LCB5OiAxOC43NSB9LCAxKVxyXG4gICAgdGhpcy5kcmF3Q2lyY2xlKGN0eCwgeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH0sIHsgeDogMjY1LjQsIHk6IDE4OC43NSB9LCAxKVxyXG4gIH1cclxuXHJcbiAgbG9nbzIgKCkge1xyXG4gICAgY29uc3QgY3R4ID0gdGhpcy5jb250ZXh0MlxyXG5cclxuICAgIHRoaXMuaW5pdExvZ28oY3R4KVxyXG5cclxuICAgIHRoaXMuZHJhd0JlemllcihjdHgsIHsgcjogMjM3LCBnOiAyOCwgYjogMzYgfSxcclxuICAgICAgW1xyXG4gICAgICAgIHsgeDogNDIuMzYsIHk6IDQxLjkxIH0sXHJcbiAgICAgICAgeyB4OiA4NC40NjAwMDAwMDAwMDAwMSwgeTogNDEuMDggfSxcclxuICAgICAgICB7IHg6IDEyNS4yOCwgeTogNjYuNjkgfSxcclxuICAgICAgICB7IHg6IDEzOS4yMzAwMDAwMDAwMDAwMiwgeTogMTAyLjE2IH1cclxuICAgICAgXVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZHJhd0JlemllcihjdHgsIHsgcjogMjM3LCBnOiAyOCwgYjogMzYgfSxcclxuICAgICAgW1xyXG4gICAgICAgIHsgeDogNDIuMzYsIHk6IDE2NS4yNCB9LFxyXG4gICAgICAgIHsgeDogODQuNDYwMDAwMDAwMDAwMDEsIHk6IDE2Ni4wNzAwMDAwMDAwMDAwMiB9LFxyXG4gICAgICAgIHsgeDogMTI1LjI4LCB5OiAxNDAuNDYgfSxcclxuICAgICAgICB7IHg6IDEzOS4yMzAwMDAwMDAwMDAwMiwgeTogMTA0Ljk5MDAwMDAwMDAwMDAxIH1cclxuICAgICAgXVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZHJhd0NpcmNsZShjdHgsIHsgcjogMjM3LCBnOiAyOCwgYjogMzYgfSwgeyB4OiAzNC40LCB5OiA0Mi43NSB9KVxyXG4gICAgdGhpcy5kcmF3Q2lyY2xlKGN0eCwgeyByOiAyMzcsIGc6IDI4LCBiOiAzNiB9LCB7IHg6IDM0LjQsIHk6IDE2NC43NSB9KVxyXG5cclxuICAgIHRoaXMuZHJhd0JlemllcihjdHgsIHsgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSB9LFxyXG4gICAgICBbXHJcbiAgICAgICAgeyB4OiAyNDQuNDgsIHk6IDQxLjkxIH0sXHJcbiAgICAgICAgeyB4OiAyMDIuMzcsIHk6IDQxLjA4IH0sXHJcbiAgICAgICAgeyB4OiAxNjEuNTQ5OTk5OTk5OTk5OTgsIHk6IDY2LjY5IH0sXHJcbiAgICAgICAgeyB4OiAxNDcuNiwgeTogMTAyLjE2IH1cclxuICAgICAgXSxcclxuICAgICAgdHJ1ZVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZHJhd0JlemllcihjdHgsIHsgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSB9LFxyXG4gICAgICBbXHJcbiAgICAgICAgeyB4OiAyNDQuNDgsIHk6IDE2NS4yNCB9LFxyXG4gICAgICAgIHsgeDogMjAyLjM3LCB5OiAxNjYuMDcwMDAwMDAwMDAwMDIgfSxcclxuICAgICAgICB7IHg6IDE2MS41NDk5OTk5OTk5OTk5OCwgeTogMTQwLjQ2IH0sXHJcbiAgICAgICAgeyB4OiAxNDcuNiwgeTogMTA0Ljk5MDAwMDAwMDAwMDAxIH1cclxuICAgICAgXSxcclxuICAgICAgdHJ1ZVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZHJhd0NpcmNsZShjdHgsIHsgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSB9LCB7IHg6IDI1MS40LCB5OiA0Mi43NSB9LCAxKVxyXG4gICAgdGhpcy5kcmF3Q2lyY2xlKGN0eCwgeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH0sIHsgeDogMjUxLjQsIHk6IDE2NC43NSB9LCAxKVxyXG4gIH1cclxuXHJcbiAgbG9nbzMgKCkge1xyXG4gICAgY29uc3QgY3R4ID0gdGhpcy5jb250ZXh0M1xyXG5cclxuICAgIHRoaXMuaW5pdExvZ28oY3R4KVxyXG5cclxuICAgIHRoaXMuZHJhd0JlemllcihjdHgsIHsgcjogMjM3LCBnOiAyOCwgYjogMzYgfSxcclxuICAgICAgW1xyXG4gICAgICAgIHsgeDogNTcuMzYsIHk6IDY0LjkzIH0sXHJcbiAgICAgICAgeyB4OiA2Ny42LCB5OiA2NC45MyB9LFxyXG4gICAgICAgIHsgeDogMTE0LCB5OiA3MSB9LFxyXG4gICAgICAgIHsgeDogMTM5LjYsIHk6IDEwNC43NCB9XHJcbiAgICAgIF1cclxuICAgIClcclxuICAgIHRoaXMuZHJhd0JlemllcihjdHgsIHsgcjogMjM3LCBnOiAyOCwgYjogMzYgfSxcclxuICAgICAgW1xyXG4gICAgICAgIHsgeDogNTcuMzYsIHk6IDE0Mi45IH0sXHJcbiAgICAgICAgeyB4OiA2Ny42LCB5OiAxNDIuOSB9LFxyXG4gICAgICAgIHsgeDogMTE0LCB5OiAxMzYuNzYgfSxcclxuICAgICAgICB7IHg6IDEzOS42LCB5OiAxMDMuMSB9XHJcbiAgICAgIF1cclxuICAgIClcclxuXHJcbiAgICB0aGlzLmRyYXdDaXJjbGUoY3R4LCB7IHI6IDIzNywgZzogMjgsIGI6IDM2IH0sIHsgeDogNTAuNCwgeTogNjQuNzUgfSlcclxuICAgIHRoaXMuZHJhd0NpcmNsZShjdHgsIHsgcjogMjM3LCBnOiAyOCwgYjogMzYgfSwgeyB4OiA1MC40LCB5OiAxNDEuNzUgfSlcclxuXHJcbiAgICB0aGlzLmRyYXdCZXppZXIoY3R4LCB7IHI6IDI1NSwgZzogMjU1LCBiOiAyNTUgfSxcclxuICAgICAgW1xyXG4gICAgICAgIHsgeDogMjI5LjQ3LCB5OiA2NC41OSB9LFxyXG4gICAgICAgIHsgeDogMjE5LjIzLCB5OiA2NC41OSB9LFxyXG4gICAgICAgIHsgeDogMTcyLjg0LCB5OiA3MC43MyB9LFxyXG4gICAgICAgIHsgeDogMTQ3LjIzLCB5OiAxMDQuMzkgfVxyXG4gICAgICBdLFxyXG4gICAgICB0cnVlXHJcbiAgICApXHJcblxyXG4gICAgdGhpcy5kcmF3QmV6aWVyKGN0eCwgeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH0sXHJcbiAgICAgIFtcclxuICAgICAgICB7IHg6IDIyOS40NywgeTogMTQyLjU2IH0sXHJcbiAgICAgICAgeyB4OiAyMTkuMjMsIHk6IDE0Mi41NiB9LFxyXG4gICAgICAgIHsgeDogMTcyLjg0LCB5OiAxMzYuNDEgfSxcclxuICAgICAgICB7IHg6IDE0Ny4yMywgeTogMTAyLjc2IH1cclxuICAgICAgXSxcclxuICAgICAgdHJ1ZVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZHJhd0NpcmNsZShjdHgsIHsgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSB9LCB7IHg6IDIzNS40LCB5OiA2NC43NSB9LCAxKVxyXG4gICAgdGhpcy5kcmF3Q2lyY2xlKGN0eCwgeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH0sIHsgeDogMjM1LjQsIHk6IDE0MS43NSB9LCAxKVxyXG4gIH1cclxuXHJcbiAgbG9nbzQgKCkge1xyXG4gICAgY29uc3QgY3R4ID0gdGhpcy5jb250ZXh0NFxyXG5cclxuICAgIHRoaXMuaW5pdExvZ28oY3R4KVxyXG5cclxuICAgIHRoaXMuZHJhd0JlemllcihjdHgsIHsgcjogMjM3LCBnOiAyOCwgYjogMzYgfSxcclxuICAgICAgW1xyXG4gICAgICAgIHsgeDogNzEuOTIsIHk6IDg2LjgzIH0sXHJcbiAgICAgICAgeyB4OiA4Ni43NywgeTogODguMDUgfSxcclxuICAgICAgICB7IHg6IDExNS4zOCwgeTogOTMuNTYgfSxcclxuICAgICAgICB7IHg6IDEzOS45MiwgeTogMTA0LjM5IH1cclxuICAgICAgXVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZHJhd0JlemllcihjdHgsIHsgcjogMjM3LCBnOiAyOCwgYjogMzYgfSxcclxuICAgICAgW1xyXG4gICAgICAgIHsgeDogNzEuOTIsIHk6IDEyMC4zMiB9LFxyXG4gICAgICAgIHsgeDogODYuNzcsIHk6IDExOS4xIH0sXHJcbiAgICAgICAgeyB4OiAxMTUuMzgsIHk6IDExMy41OSB9LFxyXG4gICAgICAgIHsgeDogMTM5LjkyLCB5OiAxMDIuNzYgfVxyXG4gICAgICBdXHJcbiAgICApXHJcblxyXG4gICAgdGhpcy5kcmF3Q2lyY2xlKGN0eCwgeyByOiAyMzcsIGc6IDI4LCBiOiAzNiB9LCB7IHg6IDY0LjQsIHk6IDg1Ljc1IH0pXHJcbiAgICB0aGlzLmRyYXdDaXJjbGUoY3R4LCB7IHI6IDIzNywgZzogMjgsIGI6IDM2IH0sIHsgeDogNjQuNCwgeTogMTE5Ljc1IH0pXHJcblxyXG4gICAgdGhpcy5kcmF3QmV6aWVyKGN0eCwgeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH0sXHJcbiAgICAgIFtcclxuICAgICAgICB7IHg6IDIxNC45MiwgeTogODYuODMgfSxcclxuICAgICAgICB7IHg6IDIwMC4wNiwgeTogODguMDUgfSxcclxuICAgICAgICB7IHg6IDE3MS40NSwgeTogOTMuNTYgfSxcclxuICAgICAgICB7IHg6IDE0Ni45MiwgeTogMTA0LjM5IH1cclxuICAgICAgXSxcclxuICAgICAgdHJ1ZVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZHJhd0JlemllcihjdHgsIHsgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSB9LFxyXG4gICAgICBbXHJcbiAgICAgICAgeyB4OiAyMTQuOTIsIHk6IDEyMC4zMiB9LFxyXG4gICAgICAgIHsgeDogMjAwLjA2LCB5OiAxMTkuMSB9LFxyXG4gICAgICAgIHsgeDogMTcxLjQ1LCB5OiAxMTMuNTkgfSxcclxuICAgICAgICB7IHg6IDE0Ni45MiwgeTogMTAyLjc2IH1cclxuICAgICAgXSxcclxuICAgICAgdHJ1ZVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZHJhd0NpcmNsZShjdHgsIHsgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSB9LCB7IHg6IDIyMS40LCB5OiA4NS43NSB9LCAxKVxyXG4gICAgdGhpcy5kcmF3Q2lyY2xlKGN0eCwgeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH0sIHsgeDogMjIxLjQsIHk6IDExOS43NSB9LCAxKVxyXG4gIH1cclxuXHJcbiAgbG9nbzUgKCkge1xyXG4gICAgY29uc3QgY3R4ID0gdGhpcy5jb250ZXh0NVxyXG5cclxuICAgIHRoaXMuaW5pdExvZ28oY3R4KVxyXG5cclxuICAgIHRoaXMuZHJhd0xpbmUoY3R4LCB7IHI6IDIzNywgZzogMjgsIGI6IDM2IH0sXHJcbiAgICAgIFtcclxuICAgICAgICB7IHg6IDE2LjQ0LCB5OiA5LjA2IH0sXHJcbiAgICAgICAgeyB4OiA2Mi4yNSwgeTogOS40IH1cclxuICAgICAgXSxcclxuICAgICAgeyB4OiA3My44MiwgeTogOTQuMTcgfVxyXG4gICAgKVxyXG5cclxuICAgIHRoaXMuZHJhd0NpcmNsZShjdHgsIHsgcjogMjM3LCBnOiAyOCwgYjogMzYgfSwgeyB4OiA4Mi40LCB5OiAxMDIuNzUgfSlcclxuXHJcbiAgICB0aGlzLmRyYXdMaW5lKGN0eCwgeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH0sXHJcbiAgICAgIFtcclxuICAgICAgICB7IHg6IDExOC43NSwgeTogOS4wNiB9LFxyXG4gICAgICAgIHsgeDogNzIuOTQsIHk6IDkuNCB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHsgeDogNzMuODIsIHk6IDk0LjE3IH0sXHJcbiAgICAgIHRydWVcclxuICAgIClcclxuXHJcbiAgICB0aGlzLmRyYXdDaXJjbGUoY3R4LCB7IHI6IDI1NSwgZzogMjU1LCBiOiAyNTUgfSwgeyB4OiAxOTkuNCwgeTogMTAyLjc1IH0sIDEpXHJcbiAgfVxyXG5cclxuICBkcmF3TG9nbyAoKSB7XHJcbiAgICB0aGlzLmdldERlbHRhVGltZSgpXHJcbiAgICB0aGlzLmxvZ28xKClcclxuICAgIHRoaXMubG9nbzIoKVxyXG4gICAgdGhpcy5sb2dvMygpXHJcbiAgICB0aGlzLmxvZ280KClcclxuICAgIHRoaXMubG9nbzUoKVxyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLmRyYXdMb2dvKClcclxuICAgIH0uYmluZCh0aGlzKSlcclxuICB9XHJcblxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnBhcmVudH0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9IHJlZj17dGhpcy5jb250YWluZXJSZWZ9IG9uTW91c2VNb3ZlPXt0aGlzLm9uTW91c2VNb3ZlLmJpbmQodGhpcyl9IG9uVG91Y2hNb3ZlPXt0aGlzLm9uVG91Y2hNb3ZlLmJpbmQodGhpcyl9PlxyXG4gICAgICAgICAgPGNhbnZhcyByZWY9e3RoaXMuY2FudmFzMVJlZn0gY2xhc3NOYW1lPXtzdHlsZXMuaW5uZXJ9IHdpZHRoPSczMDAnIGhlaWdodD0nMjEwJyAvPlxyXG4gICAgICAgICAgPGNhbnZhcyByZWY9e3RoaXMuY2FudmFzMlJlZn0gY2xhc3NOYW1lPXtzdHlsZXMuaW5uZXJ9IHdpZHRoPSczMDAnIGhlaWdodD0nMjEwJyAvPlxyXG4gICAgICAgICAgPGNhbnZhcyByZWY9e3RoaXMuY2FudmFzM1JlZn0gY2xhc3NOYW1lPXtzdHlsZXMuaW5uZXJ9IHdpZHRoPSczMDAnIGhlaWdodD0nMjEwJyAvPlxyXG4gICAgICAgICAgPGNhbnZhcyByZWY9e3RoaXMuY2FudmFzNFJlZn0gY2xhc3NOYW1lPXtzdHlsZXMuaW5uZXJ9IHdpZHRoPSczMDAnIGhlaWdodD0nMjEwJyAvPlxyXG4gICAgICAgICAgPGNhbnZhcyByZWY9e3RoaXMuY2FudmFzNVJlZn0gY2xhc3NOYW1lPXtzdHlsZXMuaW5uZXJ9IHdpZHRoPSczMDAnIGhlaWdodD0nMjEwJyAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByZWxvYWRlclxyXG4iXX0=