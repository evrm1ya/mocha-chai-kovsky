const Config = require('./Config');
const strategies = require('./strategies');

const jsonConfig = new Config(strategies.json);
jsonConfig.read('./conf.json');
jsonConfig.set('foo.bar', 'baz');
jsonConfig.save('./conf_mod.json');

const iniConfig = new Config(strategies.ini);
iniConfig.read('./conf.ini');
iniConfig.set('foo.bar', 'baz');
iniConfig.save('./conf_mod.ini');
