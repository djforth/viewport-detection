'use strict'
require('angular')

_ = require('lodash/core');
_.includes = require('lodash/includes');

viewportDetection =  angular.module('$viewportDetection', [])
  .service('resizer', ["$rootScope","$window", ($rootScope, $window)->

    current_width = 0
    callbacks     = []
    # trackerCalled = false

    addCallback = (c)->

      throw(new Error("Not a function")) unless _.isFunction(c)
      unless _.includes(callbacks, c)
        # console.log "add callbacks", callbacks.length
        callbacks.push(c)

      null

    touchSupport= ()->
      $window.touch

    isSmartDevice = ()->
      # Adapted from http://www.detectmobilebrowsers.com
      ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];

      #Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
      return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);

    windowSize = ()->
      {height: $window.innerHeight, width:$window.innerWidth}



    getDevice = ()->
      winWidth = windowSize().width

      switch
        when winWidth <= 480 then return "mobile"
        when winWidth > 480 && winWidth < 769 then return "tablet"
        else
          return "desktop"

    return {
      addCallback:addCallback
      isSmartDevice:isSmartDevice

      getWidth:(w=null)->
        current_width = w unless _.isNull(w)
        return current_width

      getDevice:getDevice

      getCallbacks:()->
        return callbacks


      sizeChange:(w)->

        return false if current_width == w

        current_width = w
        return true

      resizeFn:()->
        size_obj = @windowSize()
        @runCallBacks(size_obj) if @sizeChange(size_obj.width)

      runCallBacks:(size)->
        device = @getDevice(size.width)
        _.forEach(callbacks, (cb, i)->
          cb(device, size)
          null
        )


      #So resize not set multiple times
      trackerCalled:false
      # Tracks resizes events
      trackSize:(callback)->
        @addCallback(callback)
        unless @trackerCalled
          @trackerCalled = true
          that = @
          angular.element($window).bind 'resize', ->
            size_obj = that.windowSize()
            that.resizeFn.call(that)


            # device = getDevice(size_obj.width)
            # callback(device, size_obj)

      windowSize:windowSize
    }
])

module.exports = viewportDetection