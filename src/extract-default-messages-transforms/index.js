module.exports = [
  require("../extract-transforms/babel-react2-default-into-react"),
  require("../extract-transforms/babel-react-globalize"),

  // Should run after babel transforms.
  require("./react-globalize-fn-expression-into-fn-identifier")
];
