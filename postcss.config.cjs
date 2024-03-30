const vars = require("postcss-css-variables")

module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-nested"),
    vars({
      variables: {
        "blue-700": "#254eb6",
        "blue-600": "#2d5dd7",
        "blue-500": "#3369f3",
        "blue-200": "#d5dfff",
        "blue-100": "#dfe7ff",

        "red-500": "#ff2f2f",
        "red-200": "#ffeaea",
        "red-100": "#fff4f4",

        "gray-50": "rgba(241, 245, 249, 0.3)",
        "gray-100": "#f1f5f9",
        "gray-200": "#e2e8f0",
        "gray-300": "#cbd5e1",
        "gray-400": "#94a3b8",
        "gray-500": "#64748b",
        "gray-600": "#475569",
        "gray-700": "#334155",
        "gray-800": "#1e293b",
        "gray-900": "#020617",
      }
    })
  ],
};
