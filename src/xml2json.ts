const xml2js = require('xml2js');
const fs = require('fs')
import {
  root
} from './path'

const fileName = 'quran-uthmani' // 'quran-simple'

const filePath = `${root}/docs/texts/${fileName}.xml`

// read XML from a file
const xml = fs.readFileSync(filePath)

// convert XML to JSON
xml2js.parseString(xml, {
  mergeAttrs: true
}, (err, result) => {
  if (err) {
    throw err;
  }

  // `result` is a JavaScript object
  // convert it to a JSON string
  const json = JSON.stringify(result, null, 4);

  // save JSON in a file
  fs.writeFileSync(`${root}/docs/texts/${fileName}.json`, json);
})
