// externalLinkService.srv.spec.js

'use strict';

describe('Service: externalLinkService', function () {
  var externalLinkService;

  beforeEach(function () {
    module('markdownNote');

    inject(function ($injector) {
      externalLinkService = $injector.get('externalLinkService');
    });
  });

  it('should have handleLinkClicked(event) method, that should call ' +
    'event.preventDefault() and stopPropagation()' +
    'if a link has been clicked', function () {

    var mockEvent = {
      preventDefault: function () {},
      stopPropagation: function () {},
      target: {
        nodeName: 'A'  // a link
      }
    };
    sinon.spy(mockEvent, 'preventDefault');
    sinon.spy(mockEvent, 'stopPropagation');
    externalLinkService.handleLinkClicked(mockEvent);
    expect(mockEvent.preventDefault.called).to.equal(true);
    expect(mockEvent.stopPropagation.called).to.equal(true);
  });

  it('handleLinkClicked should call launchExternalLink(event)', function () {

    var mockEvent = {
      preventDefault: function () {},
      stopPropagation: function () {},
      target: {
        nodeName: 'A'  // a link
      }
    };
    var mock = sinon.mock(externalLinkService)
    mock.expects('launchExternalLink').withExactArgs(mockEvent);
    externalLinkService.handleLinkClicked(mockEvent);
    expect(mock.verify()).to.equal(true);
  });

  it('launchExternalLink should call window.open with the following args: ' +
    'event.target as string, \'_system\' and \'location=yes\')', function () {

    var mockEvent = {
      preventDefault: function () {},
      stopPropagation: function () {},
      target: {
        toString: function () {
          return 'http://google.com';
        },
        nodeName: 'A'
      }
    };
    var mock = sinon.mock(window);
    mock.expects('open').withExactArgs(mockEvent.target.toString(), '_system', 'location=yes');
    externalLinkService.launchExternalLink(mockEvent);
    expect(mock.verify()).to.equal(true);
  });
});
