const { Worker } = require("worker_threads")

const tick = performance.now()
let completedWorkers = 0


const fsPromises = require("fs").promises;

async function readXML(path) {
    const XMLdata = await fsPromises.readFile(path);
    return XMLdata;
}

async function chunkify(array, n) {
    let chunks = [];
    for (let i = n; i > 0; i--) {
        chunks.push(array.splice(0, Math.ceil(array.length / i)).map(async (a) => await readXML('./menu.xml')))
    }
    return chunks
}

async function run(jobs, concurrentWorkers) {
    const chunks = await chunkify(jobs, concurrentWorkers)

    await Promise.all([chunks.forEach(async (data, i) => {
        const worker = new Worker('./worker.js')
        console.log(await Promise.all(data.map(async (d) => await d)))
        worker.postMessage(await Promise.all(data.map(async (d) => await d)));
        worker.on("message", () => {
            console.log(`Worker ${i} completed`)
            completedWorkers++;
            if (completedWorkers === concurrentWorkers) {
                console.log(`${concurrentWorkers} workers took ${performance.now() - tick}`)
                process.exit()
            }
        })
    })])
}

run(['./menu.xml','./menu.xml', './menu.xml', './menu.xml', './menu.xml','./menu.xml', './menu.xml', './menu.xml'], 1)