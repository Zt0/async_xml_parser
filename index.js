import { Worker } from 'worker_threads';

function chunkify(array, n) {
  let chunks = [];
  for (let i = n; i > 0; i--) {
      chunks.push(array.splice(0, Math.ceil(array.length / i)))
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
                  reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        }
    })
}


run(['./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml'], 4)
.then(data => console.log({awaited: data}))


