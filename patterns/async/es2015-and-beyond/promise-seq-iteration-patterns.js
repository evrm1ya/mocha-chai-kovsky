let tasks = [];

let promise = Promise.resolve();

tasks.forEach(task => {
  promise = promise.then(() => {
    return task();
  });
});

promise.then(() => {
  // all tasks completed
});

// Reduce
let tasks = [];

let promise = tasks.reduce((prev, task) => {
  return prev.then(() => {
    return task();
  });
}, Promise.resolve());
