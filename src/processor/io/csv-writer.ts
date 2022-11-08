import {CsvAbstract} from "./csv-abstract";
import {createObjectCsvWriter} from 'csv-writer'

export class CsvWriter extends CsvAbstract {
  private csvStream: any;

  constructor(protected readonly filePath: string) {
    super(filePath);

    this.csvStream = createObjectCsvWriter({
      path: this.getCsvFilePath(),
      header: ["DrawId","DrawDate","DrawNo","Num1","Num2","Num3","Num4","Num5","Num6","AdditionalNum","FirstPrice"],
      fieldDelimiter: ",",
      encoding: "utf8",
      append: true
    })
  }

  async appendRecord(data: object) {
    return this.csvStream.writeRecords([data]);
  }
}
