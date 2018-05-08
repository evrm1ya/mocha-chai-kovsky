function iterate(index) {
  if (index === tasks.length) {
    return finish();
  }

  const task = tasks[index];

  task(function() {
    iterate(index + 1);
  });
}

function finish() {
  // iteration complete
}

iterate(0);

