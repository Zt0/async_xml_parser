const fsPromises = require("fs").promises
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
const promisify = require("util").promisify

async function readXML(path) {
    const XMLdata = await fsPromises.readFile(path);
    return XMLdata
}



async function parseXML(xml) {
    const XMLData = await readXML("./menu.xml")
    const parser = new XMLParser();
    console.time()
    parser.parse(XMLData)
    parser.parse(XMLData)
    parser.parse(XMLData)
    parser.parse(XMLData)
    parser.parse(XMLData)
    parser.parse(XMLData)
    parser.parse(XMLData)
    parser.parse(XMLData)
    console.timeEnd()
}

parseXML()
