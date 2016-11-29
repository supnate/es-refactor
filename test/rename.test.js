'use strict';

const babylon = require('babylon')
const babel = require('babel-core')
const traverse = require('babel-traverse').default
const generate = require('babel-generator').default
const shell = require('shelljs')

const code = shell.cat('code.js').toString()

const ast = babylon.parse(code, {
  // parse in strict mode and allow module declarations
  sourceType: 'module',
  plugins: [
    'jsx',
    'flow',
    'doExpressions',
    'objectRestSpread',
    'decorators',
    'classProperties',
    'exportExtensions',
    'asyncGenerators',
    'functionBind',
    'functionSent',
    'dynamicImport',
  ]
})

function getDef(name, scope) {
  while (scope) {
    if (scope.bindings[name]) return scope.bindings[name]
    scope = scope.parent
  }
  return
}

function renameVariable(node, name, newName) {
  // Rename a variable 'name' reference under an ast node, save their positions.
  // If a new name is declared with the same name, stopped the drill down.

  let firstDef = null;  // The first matched variable name
  function renameIdentifier(path) {
    // console.log(path.type, path.node.name)
    // console.log(path)
    if (!firstDef && path.scope.bindings[name]) {
      firstDef = path.scope.bindings[name]
    }
    if (path.node.name === name && getDef(path.node.name, path.scope) === firstDef) {
      path.node.name = newName
    }
  }
  traverse(node, {
    JSXIdentifier: renameIdentifier,
    Identifier: renameIdentifier,
  });
}

renameVariable(ast, 'Hello', 'Hello2', {})

module.exports = renameVariable
console.log(generate(ast).code)
