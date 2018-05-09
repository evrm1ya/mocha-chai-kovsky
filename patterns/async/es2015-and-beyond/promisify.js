module.exports = function(callbackBasedApi) {
  return function promisified() {
    const args = [].slice.call(arguments);

    return new Promise((resolve, reject) => {
      args.push((err, result) => {
        if (err) {
          return reject(err);
        }

        if (arguments.length <= 2) {
          resolve(result);
        } else {
          // pass an array of values if more than 2 args
          // passed to callback
          resolve([].slice.call(arguments, 1));
        }
      });

      callbackBasedApi.apply(null, args);
    });
  }
};

