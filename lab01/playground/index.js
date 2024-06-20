const _ = require('lodash');

const capitalizedString = _.capitalize('hello world');
const lowerCaseString = _.toLower('Hello World');
const upperCaseString = _.toUpper('Hello World');
const upperFirstString = _.upperFirst('hello world');
const lowerFirstString = _.lowerFirst('Hello World');

console.log("Capitalized string: ", capitalizedString, "\nLower case string: ", lowerCaseString, "\nUpper case string: ", upperCaseString, "\nUnderlined string: ", upperFirstString, "\nLower first string: ", lowerFirstString);