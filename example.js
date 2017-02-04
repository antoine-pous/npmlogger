var log = require('./logger.js');

log.fileBasePath = __dirname + '/logs/';
log.fileName = 'example';
log.fileCreatePath = true;

log.heading = 'npmlogger'

console.error('log.level,log.fileLevel=silly')
log.level, log.fileLevel = 'silly'
log.silly('silly prefix', 'x = %j', {foo: {bar: 'baz'}})
log.verbose('verbose prefix', 'x = %j', {foo: {bar: 'baz'}})
log.info('info prefix', 'x = %j', {foo: {bar: 'baz'}})
log.http('http prefix', 'x = %j', {foo: {bar: 'baz'}})
log.warn('warn prefix', 'x = %j', {foo: {bar: 'baz'}})
log.error('error prefix', 'x = %j', {foo: {bar: 'baz'}})
log.silent('silent prefix', 'x = %j', {foo: {bar: 'baz'}})

console.error('log.level,log.fileLevel=silent')
log.level, log.fileLevel = 'silent'
log.silly('silly prefix', 'x = %j', {foo: {bar: 'baz'}})
log.verbose('verbose prefix', 'x = %j', {foo: {bar: 'baz'}})
log.info('info prefix', 'x = %j', {foo: {bar: 'baz'}})
log.http('http prefix', 'x = %j', {foo: {bar: 'baz'}})
log.warn('warn prefix', 'x = %j', {foo: {bar: 'baz'}})
log.error('error prefix', 'x = %j', {foo: {bar: 'baz'}})
log.silent('silent prefix', 'x = %j', {foo: {bar: 'baz'}})

console.error('log.level,log.fileLevel=info')
log.level, log.fileLevel = 'info'
log.silly('silly prefix', 'x = %j', {foo: {bar: 'baz'}})
log.verbose('verbose prefix', 'x = %j', {foo: {bar: 'baz'}})
log.info('info prefix', 'x = %j', {foo: {bar: 'baz'}})
log.http('http prefix', 'x = %j', {foo: {bar: 'baz'}})
log.warn('warn prefix', 'x = %j', {foo: {bar: 'baz'}})
log.error('error prefix', 'x = %j', {foo: {bar: 'baz'}})
log.silent('silent prefix', 'x = %j', {foo: {bar: 'baz'}})
log.error('404', 'This is a longer\n' +
                 'message, with some details\n' +
                 'and maybe a stack.\n' +
                 new Error('a 404 error').stack)
log.addLevel('noise', 10000, {beep: true})
log.noise(false, 'LOUD NOISES')
