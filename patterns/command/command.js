const request = require('request');
const util = require('util');

const statusUpdateService = {
  statusUpdates: {},

  sendUpdate: function(status) {
    console.log(`Status sent: ${status}`);
    let id = Math.floor(Math.random() * 1000000);
    statusUpdateService.statusUpdates[id] = status;
    return id;
  },

  destroyUpdate: id => {
    console.log(`Status removed: ${id}`);
    delete statusUpdateService.statusUpdates[id];
  }
};

function createSendStatusCommand(service, status) {
  let postId = null;

  const command = () => {
    postId = service.sendUpdate(status);
  };

  command.undo = () => {
    if (postId) {
      service.destroyUpdate(postId);
      postId = null;
    }
  };

  command.serialize = () => {
    return {
      type: 'status',
      action: 'post',
      status: status
    };
  };

  return command;
}

class Invoker {
  constructor() {
    this.history = [];
  }

  run(command) {
    this.history.push(command);
    command();
    console.log('Command executed', command.serialize());
  }

  delay(command, delay) {
    setTimeout(() => {
      this.run(command);
    }, delay);
  }

  undo() {
    const command = this.history.pop();
    command.undo();
    console.log('Command undone', command.serialize());
  }

  runRemotely(command) {
    request.post('http://localhost:3000/command',
      { json: command.serialize() },
      err => {
        console.log('Command executed remotely', command.serialize());
      }
    );
  }
}

const invoker = new Invoker();
const command = createSendStatusCommand(statusUpdateService, 'HI');
invoker.run(command);
invoker.delay(command, 1000);
invoker.undo();
invoker.runRemotely(command);
