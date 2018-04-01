var basketModule = (function() {
  var basket = [];

  function doSomethingPrivate() {
    console.log('oooo private');
  }

  function doSomethingElsePrivate() {
  }

  return {
    addItem: function(values) {
      basket.push(values);
    },

    getItemCount: function() {
      return basket.length;
    },

    doSomething: doSomethingPrivate,

    getTotal: function() {
      var q = this.getItemCount();
      var p = 0;

      while (q--) {
        p += basket[q].price;
      }

      return p;
    }
  };
})();

basketModule.addItem({ price: 3 });
basketModule.addItem({ price: 5 });
console.log(basketModule.getTotal());
basketModule.doSomething();
console.log(basketModule.basket);
