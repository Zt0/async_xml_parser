import { Worker } from 'worker_threads';

function chunkify(array, n) {
  let chunks = [];
  for (let i = n; i > 0; i--) {
      chunks.push(array.splice(0, Math.ceil(array.length / i)))
  }
  return chunks
}

let completedWorkers = 0

function run(jobs, concurrentWorkers) {
  const chunks = chunkify(jobs, concurrentWorkers)
    
  const tick = performance.now()
  for (const x of chunks) {
    const worker = new Worker("./worker4.js");

    worker.postMessage(x);
    worker.on("message", () => {
      console.log(`Worker completed`)
      completedWorkers++;
      if (completedWorkers === concurrentWorkers) {
          console.log(`${concurrentWorkers} workers took ${performance.now() - tick}`)
          process.exit()
      }
    })
  }
}
run(['./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml','./menu.xml'], 1)
