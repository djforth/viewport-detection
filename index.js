'use strict';
var _, viewportDetection;

require('angular');

_ = require('lodash');

viewportDetection = angular.module('$viewportDetection', []).service('resizer', [
  "$rootScope", "$window", function($rootScope, $window) {
    var addCallback, callbacks, current_width, getDevice, isSmartDevice, touchSupport, windowSize;
    current_width = 0;
    callbacks = [];
    addCallback = function(c) {
      if (!_.isFunction(c)) {
        throw new Error("Not a function");
      }
      if (!_.contains(callbacks, c)) {
        callbacks.push(c);
      }
      return null;
    };
    touchSupport = function() {
      return $window.touch;
    };
    isSmartDevice = function() {
      var ua;
      ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
      return /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(ua);
    };
    windowSize = function() {
      return {
        height: $window.innerHeight,
        width: $window.innerWidth
      };
    };
    getDevice = function() {
      var winWidth;
      winWidth = windowSize().width;
      switch (false) {
        case !(winWidth <= 480):
          return "mobile";
        case !(winWidth > 480 && winWidth < 769):
          return "tablet";
        default:
          return "desktop";
      }
    };
    return {
      addCallback: addCallback,
      isSmartDevice: isSmartDevice,
      getWidth: function(w) {
        if (w == null) {
          w = null;
        }
        if (!_.isNull(w)) {
          current_width = w;
        }
        return current_width;
      },
      getDevice: getDevice,
      getCallbacks: function() {
        return callbacks;
      },
      sizeChange: function(w) {
        if (current_width === w) {
          return false;
        }
        current_width = w;
        return true;
      },
      resizeFn: function() {
        var size_obj;
        size_obj = this.windowSize();
        if (this.sizeChange(size_obj.width)) {
          return this.runCallBacks(size_obj);
        }
      },
      runCallBacks: function(size) {
        var device;
        device = this.getDevice(size.width);
        return _.forEach(callbacks, function(cb, i) {
          cb(device, size);
          return null;
        });
      },
      trackerCalled: false,
      trackSize: function(callback) {
        var that;
        this.addCallback(callback);
        if (!this.trackerCalled) {
          this.trackerCalled = true;
          that = this;
          return angular.element($window).bind('resize', function() {
            var size_obj;
            size_obj = that.windowSize();
            return that.resizeFn.call(that);
          });
        }
      },
      windowSize: windowSize
    };
  }
]);

module.exports = viewportDetection;
