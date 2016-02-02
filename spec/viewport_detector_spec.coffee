require('../src/viewport_detector.coffee')
require 'angular-mocks'


# console.log angular.mock

describe 'Resizer', ->
  vdetect = windowmock = scope = null
  currentWidth = 480
  currentHeight = 500

  beforeEach ->
    # windowmock = null
    # @currentWidth = 480
    # @currentHeight = 500

    that = @
    angular.mock.module '$viewportDetection', ($provide)->

      $provide.factory('$window', ()->
        windowmock = jasmine.createSpy('$windowmock');
        windowmock.navigator   = window.navigator
        windowmock.innerWidth  = currentWidth
        windowmock.innerHeight = currentHeight

        windowmock
      )
      null

    angular.mock.inject ($rootScope, resizer)->
      vdetect = resizer
      scope = $rootScope.$new();

  it 'should return width and height', ()->
    size_obj = vdetect.windowSize()
    expect(size_obj.width).toEqual(480)
    expect(size_obj.height).toEqual(500)

  describe 'Callbacks', ->

    it 'should throw an Error if data is undefined', ->
      expect(()->
        vdetect.addCallback(123)
      ).toThrowError("Not a function");


    it 'should add function to callback list', ->
      spy = jasmine.createSpy('callback')
      vdetect.addCallback(spy)
      cb = vdetect.getCallbacks()
      expect(cb.length).toEqual(1)
      expect(cb).toContain(spy)





  describe 'isSmartDevice', ->
    it 'checks if smart device', ->
      windowmock.navigator = {
        userAgent:"Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53"
      }

      expect(vdetect.isSmartDevice()).toBeTruthy()

    it 'checks if not smart device', ->
      windowmock.navigator = {
        userAgent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36"
      }

      expect(vdetect.isSmartDevice()).toBeFalsy()

  describe 'getDevice', ->
    it 'returns mobile if width <= 480', ->
      expect(vdetect.getDevice()).toEqual('mobile')

    it 'returns tablet if width >= 480 and < 769', ->
      windowmock.innerWidth = 700
      expect(vdetect.getDevice()).toEqual('tablet')

    it 'returns desktop if width > 769', ->
      windowmock.innerWidth = 770
      expect(vdetect.getDevice()).toEqual('desktop')

  describe 'getWidth', ->
    it 'should return current width', ->
      w = vdetect.getWidth()
      expect(w).toEqual(0)

    it 'should set current width', ->
      w = vdetect.getWidth(100)
      expect(w).toEqual(100)

  describe 'sizeChange', ->
    it "should return false if width does match", ->
      expect(vdetect.sizeChange(0)).toBeFalsy()
      expect(vdetect.getWidth()).toEqual(0)

    it "should return true and set width if doesn't match", ->
      expect(vdetect.sizeChange(100)).toBeTruthy()
      expect(vdetect.getWidth()).toEqual(100)

  describe 'runCallbacks', ->
    callback0 = callback1 = null
    beforeEach ->
      callback0 = jasmine.createSpy('callback0');
      callback1 = jasmine.createSpy('callback1');
      vdetect.addCallback(callback0)
      vdetect.addCallback(callback1)
      spyOn(vdetect, "getDevice").and.returnValue('mobile')

      vdetect.runCallBacks({width:100})


    it 'should call getDevice', ->
      expect(vdetect.getDevice).toHaveBeenCalledWith(100)

    it 'should call all callbacks', ->
      expect(callback0).toHaveBeenCalledWith('mobile', {width:100})
      expect(callback1).toHaveBeenCalledWith('mobile', {width:100})


  describe 'resizeFn', ->

    beforeEach ->
      spyOn(vdetect, 'runCallBacks')
      spyOn(vdetect, 'windowSize').and.returnValue({width:480, height:500})

    it 'should call windowSize', ->
      vdetect.resizeFn()
      expect(vdetect.windowSize).toHaveBeenCalled()

    it 'should not call runCallBack if sizeChange is false', ->
      spyOn(vdetect, "sizeChange").and.returnValue(false)
      vdetect.resizeFn()
      expect(vdetect.sizeChange).toHaveBeenCalledWith(480)
      expect(vdetect.runCallBacks).not.toHaveBeenCalled()

    it 'should call runCallBack if sizeChange is true', ->
      spyOn(vdetect, "sizeChange").and.returnValue(true)
      vdetect.resizeFn()
      expect(vdetect.sizeChange).toHaveBeenCalledWith(480)
      expect(vdetect.runCallBacks).toHaveBeenCalledWith({width:480, height:500})




  describe 'trackSize', ->
    resizeFn = mockWindow = callback = null
    beforeEach ->
      spyOn(vdetect, "addCallback")

      callback = jasmine.createSpy('callback');
      spyOn(angular, "element").and.callFake ()->
        mockWindow = jasmine.createSpy('windowElement');
        mockWindow.bind = jasmine.createSpy('bind')

        mockWindow.off = jasmine.createSpy('off');
        mockWindow

    it 'should bind to the window resize event', ->
      vdetect.trackSize(callback)

      expect(mockWindow.bind).toHaveBeenCalledWith("resize", jasmine.any(Function));

    it 'should set tackCalled to true', ->
      vdetect.trackSize(callback)
      expect(vdetect.trackerCalled).toBeTruthy()

    it 'should not call trackSize if trackerCalled true', ->
      vdetect.trackerCalled = true
      vdetect.trackSize(callback)

      expect(mockWindow.bind).not.toHaveBeenCalled()










