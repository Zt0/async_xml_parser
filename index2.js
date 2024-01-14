const fsPromises = require("fs").promises;
const { XMLParser } = require("fast-xml-parser");
const { promisify } = require("util");

async function readXML(path) {
    const XMLdata = await fsPromises.readFile(path);
    return XMLdata;
}

function parseXML(xml) {
    return new Promise((resolve, reject) => {
        const parser = new XMLParser();
        try {
            const jObj = parser.parse(xml);
            resolve(JSON.stringify(jObj, null, 2));
        } catch (error) {
            reject(error);
        }
    });
}

async function processXML() {
    try {
        const xmlData = await readXML("./menu.xml");
        console.time()
        Promise.all([
            await parseXML(xmlData),
            await parseXML(xmlData),
            await parseXML(xmlData),
            await parseXML(xmlData),
            await parseXML(xmlData),
            await parseXML(xmlData),
            await parseXML(xmlData),
            await parseXML(xmlData),
            await parseXML(xmlData),
            await parseXML(xmlData)
        ]);
        console.timeEnd()
    } catch (error) {
        console.error("Error:", error);
    }
}

processXML();
