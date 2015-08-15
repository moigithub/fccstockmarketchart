'use strict';

describe('Service: financeData', function () {

  // load the service's module
  beforeEach(module('basej3App'));

  // instantiate service
  var financeData;
  beforeEach(inject(function (_financeData_) {
    financeData = _financeData_;
  }));

  it('should do something', function () {
    expect(!!financeData).toBe(true);
  });

});
