// import angular from 'angular';
import ViewportDetect from '@djforth/viewport-detection-fp';

const vpDetect = ViewportDetect();

const viewportDetection = angular.module('$viewportDetection', []).service('resizer', [
  '$rootScope',
  '$window',
  function($rootScope, $window) {
    vpDetect.track();
    return {
      addCallback: vpDetect.addCallback,
      isSmartDevice: () => vpDetect.touchAvailable(),

      getWidth: () => vpDetect.getWidth(),

      getDevice: () => vpDetect.getDevice(),

      // getCallbacks() {
      //   return callbacks;
      // },

      // sizeChange(w) {
      //   if (current_width === w) {
      //     return false;
      //   }

      //   current_width = w;
      //   return true;
      // },

      // resizeFn() {
      //   const size_obj = this.windowSize();
      //   if (this.sizeChange(size_obj.width)) {
      //     return this.runCallBacks(size_obj);
      //   }
      // },

      // runCallBacks(size) {
      //   const device = this.getDevice(size.width);
      //   return callbacks.forEach(function(cb, i) {
      //     cb(device, size);
      //     return null;
      //   });
      // },

      // //So resize not set multiple times
      // trackerCalled: false,
      // Tracks resizes events
      // trackSize(callback) {
      //   this.addCallback(callback);
      //   if (!this.trackerCalled) {
      //     this.trackerCalled = true;
      //     const that = this;
      //     return angular.element($window).bind('resize', function() {
      //       const size_obj = that.windowSize();
      //       return that.resizeFn.call(that);
      //     });
      //   }
      // },

      // device = getDevice(size_obj.width)
      // callback(device, size_obj)

      // windowSize,
    };
  },
]);

export default viewportDetection;
