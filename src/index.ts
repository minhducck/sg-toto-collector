import {main as subscriberFunction} from './processor/subscriber/toto-crawler';
import {main as publisherFunction} from './processor/publisher/toto-task-deliver'
import {CsvReader} from "./processor/io/csv-reader";
import {APPLICATION_CONFIGURATION} from "./configuration/application.config";

subscriberFunction().then(subscriber => {
  publisherFunction()
})

async function main() {
  const reader = new CsvReader(APPLICATION_CONFIGURATION['RESULT_DATABASE']);
  const data:any = {};
  const csvContents = await reader.getData();
  for (const drawId of Object.keys(csvContents)) {
    const totoRecord = csvContents[drawId];

    data[totoRecord.Num1] = (data[totoRecord.Num1]||0) + 1
    data[totoRecord.Num2] = (data[totoRecord.Num2]||0) + 1
    data[totoRecord.Num3] = (data[totoRecord.Num3]||0) + 1
    data[totoRecord.Num4] = (data[totoRecord.Num4]||0) + 1
    data[totoRecord.Num5] = (data[totoRecord.Num5]||0) + 1
    data[totoRecord.Num6] = (data[totoRecord.Num6]||0) + 1
    data[totoRecord.AdditionalNum] = (data[totoRecord.AdditionalNum]||0) + 1
  }
  console.log(data);
  return;
}

main();
