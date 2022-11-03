import {main as subscriberFunction} from './processor/subscriber/toto-crawler';
import {main as publisherFunction} from './processor/publisher/toto-task-deliver'
import {CsvReader} from "./processor/io/csv-reader";
import {APPLICATION_CONFIGURATION} from "./configuration/application.config";
import {TotoRecordType} from "./types/toto-record.type";


// subscriberFunction().then(subscriber => {
//   publisherFunction()
// })


async function main() {
  const reader = new CsvReader(APPLICATION_CONFIGURATION['RESULT_DATABASE']);
  console.log(await reader.getData())
  return;
}

main();
