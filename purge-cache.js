const moment = require('moment')
const { spawn } = require('child_process');

const getStartOfWeek = () => moment().startOf('week').format('DD/MM/YYYY')

let lastDayDone = null

const purgeCacheOnceAWeek = () => {
    const currentStartOfWeek = getStartOfWeek()
    if (lastDayDone === currentStartOfWeek) {
        setTimeout(purgeCacheOnceAWeek, 1000 * 60 * 60);
        return;
    }

    lastDayDone = currentStartOfWeek

    console.log('Purging cache for ' + currentStartOfWeek);

    const child = spawn('heroku', ['repo:purge_cache', '-a', process.env.HEROKU_APP]);
    
    child.stderr.pipe(process.stderr);
    child.stdout.pipe(process.stdout);

    child.on('close', () => {
        setTimeout(purgeCacheOnceAWeek, 1000 * 60 * 60);
    });
}

purgeCacheOnceAWeek();
