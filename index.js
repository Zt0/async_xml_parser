import { Worker } from 'worker_threads'

function chunkify(array, n) {
    let chunks = [];
    let limit = Math.ceil(array.length / n)
    for (let i = 0; i < n; i++) {
        let offset = i * limit
        chunks.push(array.slice(offset, offset + limit))
    }
  return chunks
}

let completedWorkers = 0
const result = []

 function run(jobs, concurrentWorkers) {
    const tick = performance.now()
    const chunks = chunkify(jobs, concurrentWorkers)

    return new Promise((resolve, reject) => {
        for (const chunk of chunks) {
            const worker = new Worker("./worker.js");
            worker.postMessage(chunk);
            worker.once("message", (data) => {
                console.log(`Worker completed`)
                result.push(data)
                completedWorkers++;
                if (completedWorkers === concurrentWorkers) {
                    console.log(`${concurrentWorkers} workers took ${performance.now() - tick}`)
                    resolve(result)
                }
            })
            worker.once('exit', (code) => {
                if (code !== 0) {
                  reject(new Error(`Worker stopped with exit code ${code}`))
                }
            });
        }
    })
}


run(['./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml'], 2)
.then(data => console.log({data}))


