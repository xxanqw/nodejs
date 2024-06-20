const yargs = require('yargs');
const user = require('./user.js');

yargs.command({
    command: 'add',
    describe: 'Додати нову мову',
    builder: {
        title: {
            describe: 'Назва мови',
            demandOption: true,
            type: 'string'
        },
        level: {
            describe: 'Рівень володіння мовою',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        user.addLanguage(argv.title, argv.level);
    }
})
.command({
    command: 'remove',
    describe: 'Видалити мову',
    builder: {
        title: {
            describe: 'Назва мови',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        user.removeLanguage(argv.title);
    }
})
.command({
    command: 'list',
    describe: 'Переглянути всі мови',
    handler() {
        user.listLanguages();
    }
})
.command({
    command: 'read',
    describe: 'Переглянути деталі мови',
    builder: {
        title: {
            describe: 'Назва мови',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        user.readLanguage(argv.title);
    }
})
.help()
.argv;