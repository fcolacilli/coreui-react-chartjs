"use strict";

exports.__esModule = true;
exports.CChartPolarArea = exports.CChartPie = exports.CChartRadar = exports.CChartDoughnut = exports.CChartLine = exports.CChartHorizontalBar = exports.CChartBar = exports.CCharts = exports.CChart = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _chart = _interopRequireDefault(require("chart.js"));

var _chartjs = require("@coreui/chartjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var enMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var esMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var key = function key() {
  return Math.random().toString(36).replace("0.", "");
}; //component - CoreUI / CChart


var CChart = function CChart(props) {
  var innerRef = props.innerRef,
      datasets = props.datasets,
      labels = props.labels,
      options = props.options,
      plugins = props.plugins,
      type = props.type,
      _props$months = props.months,
      months = _props$months === void 0 ? "es" : _props$months,
      attributes = _objectWithoutPropertiesLoose(props, ["innerRef", "datasets", "labels", "options", "plugins", "type", "months"]);

  var compData = (0, _react.useRef)({
    firstRun: true
  }).current;

  var _useState = (0, _react.useState)(),
      chart = _useState[0],
      setChart = _useState[1];

  var ref = (0, _react.useRef)();
  var safeId = (0, _react.useState)("safe_id_" + key())[0]; // methods

  var renderChart = function renderChart() {
    destroyChart();
    setChart(new _chart["default"](ref.current.getContext("2d"), chartConfig));
  };

  var updateChart = function updateChart() {
    Object.assign(chart, chartConfig);
    chart.update();
  };

  var destroyChart = function destroyChart() {
    return chart && chart.destroy();
  };

  var dataset = datasets && datasets[0] && datasets[0].data || [];
  var monthLabels = (0, _react.useMemo)(function () {
    return months === "es" ? esMonths : months === "en" ? enMonths : Array.isArray(months) && months.length === 12 ? months : Array.from(Array(12)).map(function (el, i) {
      return i + 1;
    });
  }, [months]);
  var computedLabels = (0, _react.useMemo)(function () {
    if (labels && typeof labels !== "string") {
      return labels;
    }

    var emptyLabels = Array(dataset.length).fill("");

    if (labels === "indexes") {
      return emptyLabels.map(function (u, i) {
        return i + 1;
      });
    } else if (labels === "months") {
      return emptyLabels.map(function (u, i) {
        return monthLabels[i % 12];
      });
    }

    return emptyLabels;
  }, [JSON.stringify(labels), dataset.length]);

  var customTooltips = function () {
    if (options && options.tooltips) {
      return;
    }

    return {
      tooltips: {
        enabled: false,
        custom: _chartjs.customTooltips,
        intersect: true,
        mode: "index",
        position: "nearest",
        callbacks: {
          labelColor: function labelColor(tooltipItem, chart) {
            function getValue(prop) {
              return typeof prop === "object" ? prop[tooltipItem.index] : prop;
            }

            var dataset = chart.data.datasets[tooltipItem.datasetIndex]; //tooltipLabelColor is coreUI custom prop used only here

            var backgroundColor = getValue(dataset.tooltipLabelColor || dataset.pointHoverBackgroundColor || dataset.borderColor || dataset.backgroundColor);
            return {
              backgroundColor: backgroundColor
            };
          }
        }
      }
    };
  }();

  var computedOptions = function () {
    return Object.assign({}, options, customTooltips || {});
  }();

  var chartConfig = {
    type: type,
    data: {
      datasets: datasets,
      labels: computedLabels
    },
    options: computedOptions,
    plugins: plugins
  };
  (0, _react.useEffect)(function () {
    if (compData.firstRun) return;
    updateChart();
  }, [chartConfig]);
  (0, _react.useEffect)(function () {
    renderChart();
    compData.firstRun = false;
    return function () {
      return destroyChart();
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, attributes, {
    ref: innerRef
  }), /*#__PURE__*/_react["default"].createElement("canvas", {
    id: safeId,
    ref: ref
  }));
};

exports.CChart = CChart;
CChart.propTypes = process.env.NODE_ENV !== "production" ? {
  innerRef: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func, _propTypes["default"].string]),
  datasets: _propTypes["default"].array,
  labels: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].string]),
  options: _propTypes["default"].object,
  plugins: _propTypes["default"].array,
  type: _propTypes["default"].string
} : {};

var CChartBar = function CChartBar(props) {
  return /*#__PURE__*/_react["default"].createElement(CChart, _extends({}, props, {
    type: "bar"
  }));
};

exports.CChartBar = CChartBar;

var CChartHorizontalBar = function CChartHorizontalBar(props) {
  return /*#__PURE__*/_react["default"].createElement(CChart, _extends({}, props, {
    type: "horizontalBar"
  }));
};

exports.CChartHorizontalBar = CChartHorizontalBar;

var CChartLine = function CChartLine(props) {
  return /*#__PURE__*/_react["default"].createElement(CChart, _extends({}, props, {
    type: "line"
  }));
};

exports.CChartLine = CChartLine;

var CChartDoughnut = function CChartDoughnut(props) {
  return /*#__PURE__*/_react["default"].createElement(CChart, _extends({}, props, {
    type: "doughnut"
  }));
};

exports.CChartDoughnut = CChartDoughnut;

var CChartRadar = function CChartRadar(props) {
  return /*#__PURE__*/_react["default"].createElement(CChart, _extends({}, props, {
    type: "radar"
  }));
};

exports.CChartRadar = CChartRadar;

var CChartPie = function CChartPie(props) {
  return /*#__PURE__*/_react["default"].createElement(CChart, _extends({}, props, {
    type: "pie"
  }));
};

exports.CChartPie = CChartPie;

var CChartPolarArea = function CChartPolarArea(props) {
  return /*#__PURE__*/_react["default"].createElement(CChart, _extends({}, props, {
    type: "polarArea"
  }));
};

exports.CChartPolarArea = CChartPolarArea;

var CCharts = function CCharts(props) {
  console.warn("<CCharts> component has been deprecated. Use <CChart> or <CChart{type}> instead");
  return /*#__PURE__*/_react["default"].createElement(CChart, props);
};

exports.CCharts = CCharts;