const tasks = [];

let concurrency = 2;
let running = 0;
let completed = 0;
let index = 0;

function finish() {
  // all tasks finished
}

function next() {
  while (running < concurrency && index < tasks.length) {
    task = tasks[index++];

    task(() => {
      if (completed === tasks.length) {
        return finish();
      }

      completed++;
      running--;

      next();
    });

    running++;
  }
}

next();

