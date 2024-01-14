const { XMLParser } = require("fast-xml-parser");
const { parentPort } = require("worker_threads")
const parser = new XMLParser();


parentPort.on('message', async (jobs) => {
    // console.log({jobs}, jobs)
    await Promise.all([jobs.forEach(async (job) => {
        console.log(324)
        console.log(1111, job, await new Promise(() => resolve(333)))
        console.log(parser.parse(job))
        // const textDecoder = new TextDecoder('utf-8');
        // const xmlString = textDecoder.decode(job);

        // // Now 'xmlString' contains the XML content as a string
        // console.log({xmlString});

        // // If you want to parse it using an XML parser (e.g., DOMParser in the browser)
        // // if (typeof window !== 'undefined' && window.DOMParser) {
        //     const parser = new DOMParser();
        //     const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

        //     // Now 'xmlDoc' contains the XML document
        //     console.log(xmlDoc);
        // // }
        // // const a = parser.parse(xmlData)
        // console.log(333)
    })])
    
    parentPort.postMessage('done')
})
