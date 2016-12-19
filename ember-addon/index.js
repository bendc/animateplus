'use strict';
var path      = require('path');
var Funnel    = require('broccoli-funnel');

module.exports = {
  name: 'animateplus',

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import(path.join(this.treePaths.vendor, 'animateplus', 'animate.min.js'));
  },

  treeForVendor: function() {
    var animateplusDir = path.resolve(this.root, '..');
    var animateplusTree = new Funnel(animateplusDir, {
      destDir: 'animateplus',
    });

    return animateplusTree;
  }

};
