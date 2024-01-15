import { XMLParser } from "fast-xml-parser";
import {promises as fsPromises} from "fs";
import { parentPort } from "worker_threads";

const parser = new XMLParser();


async function readXML(path) {
    const XMLdata = await fsPromises.readFile(path);
    return XMLdata
}


parentPort.once('message', async (value) => {
      const a = await Promise.all(value.map(async(v) => {
          return parser.parse(await readXML(v))
      }))

  parentPort.postMessage(a)
});
