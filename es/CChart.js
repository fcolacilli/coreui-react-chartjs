function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";
import { customTooltips as cuiCustomTooltips } from "@coreui/chartjs";
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

  var compData = useRef({
    firstRun: true
  }).current;

  var _useState = useState(),
      chart = _useState[0],
      setChart = _useState[1];

  var ref = useRef();
  var safeId = useState("safe_id_" + key())[0]; // methods

  var renderChart = function renderChart() {
    destroyChart();
    setChart(new Chart(ref.current.getContext("2d"), chartConfig));
  };

  var updateChart = function updateChart() {
    Object.assign(chart, chartConfig);
    chart.update();
  };

  var destroyChart = function destroyChart() {
    return chart && chart.destroy();
  };

  var dataset = datasets && datasets[0] && datasets[0].data || [];
  var monthLabels = useMemo(function () {
    return months === "es" ? esMonths : months === "en" ? enMonths : Array.isArray(months) && months.length === 12 ? months : Array.from(Array(12)).map(function (el, i) {
      return i + 1;
    });
  }, [months]);
  var computedLabels = useMemo(function () {
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
        custom: cuiCustomTooltips,
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
  useEffect(function () {
    if (compData.firstRun) return;
    updateChart();
  }, [chartConfig]);
  useEffect(function () {
    renderChart();
    compData.firstRun = false;
    return function () {
      return destroyChart();
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", _extends({}, attributes, {
    ref: innerRef
  }), /*#__PURE__*/React.createElement("canvas", {
    id: safeId,
    ref: ref
  }));
};

CChart.propTypes = process.env.NODE_ENV !== "production" ? {
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  datasets: PropTypes.array,
  labels: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  options: PropTypes.object,
  plugins: PropTypes.array,
  type: PropTypes.string
} : {};

var CChartBar = function CChartBar(props) {
  return /*#__PURE__*/React.createElement(CChart, _extends({}, props, {
    type: "bar"
  }));
};

var CChartHorizontalBar = function CChartHorizontalBar(props) {
  return /*#__PURE__*/React.createElement(CChart, _extends({}, props, {
    type: "horizontalBar"
  }));
};

var CChartLine = function CChartLine(props) {
  return /*#__PURE__*/React.createElement(CChart, _extends({}, props, {
    type: "line"
  }));
};

var CChartDoughnut = function CChartDoughnut(props) {
  return /*#__PURE__*/React.createElement(CChart, _extends({}, props, {
    type: "doughnut"
  }));
};

var CChartRadar = function CChartRadar(props) {
  return /*#__PURE__*/React.createElement(CChart, _extends({}, props, {
    type: "radar"
  }));
};

var CChartPie = function CChartPie(props) {
  return /*#__PURE__*/React.createElement(CChart, _extends({}, props, {
    type: "pie"
  }));
};

var CChartPolarArea = function CChartPolarArea(props) {
  return /*#__PURE__*/React.createElement(CChart, _extends({}, props, {
    type: "polarArea"
  }));
};

var CCharts = function CCharts(props) {
  console.warn("<CCharts> component has been deprecated. Use <CChart> or <CChart{type}> instead");
  return /*#__PURE__*/React.createElement(CChart, props);
};

export { CChart, CCharts, CChartBar, CChartHorizontalBar, CChartLine, CChartDoughnut, CChartRadar, CChartPie, CChartPolarArea };