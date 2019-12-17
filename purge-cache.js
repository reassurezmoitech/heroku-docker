const moment = require('moment')
const { spawn } = require('child_process');

const getStartOfWeek = () => moment().startOf('week').format('DD/MM/YYYY')

let lastDayDone = null

const purgeCacheOnceAWeek = () => {
    console.log(`------------------------------------------------------------`);
    console.log(`Checking if cache has been purged on the week of: ${getStartOfWeek()}`);
    console.log(`------------------------------------------------------------`);

    const currentStartOfWeek = getStartOfWeek()
    if (lastDayDone === currentStartOfWeek) {
        console.log('------------------------');
        console.log('Check back in an hour...');
        console.log('------------------------');
        setTimeout(purgeCacheOnceAWeek, 1000 * 60 * 60);
        return;
    }

    lastDayDone = currentStartOfWeek

    const child = spawn('heroku', ['repo:purge_cache', '-a', process.env.HEROKU_APP]);
    
    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);

    child.on('close', () => {
        console.log('------------------------');
        console.log('Check back in an hour...');
        console.log('------------------------');
        setTimeout(purgeCacheOnceAWeek, 1000 * 60 * 60);
    });
}

const pluginInstallChild = spawn('heroku', ['plugins:install', 'heroku-repo']);

pluginInstallChild.stderr.pipe(process.stderr);
pluginInstallChild.stdout.pipe(process.stdout);
pluginInstallChild.on('close', (code) => {
    if (code !== 0) {
        return;
    }

    purgeCacheOnceAWeek();
})