import {CsvConstant} from "../../constants/csv.constant";
import * as csv from 'csv';
import * as fs from 'fs'
import * as path from "path";
import {BASE_DIRECTORY} from "../../configuration/application.config";
import {Options} from "csv-parse";
import {TotoRecordType} from "../../types/toto-record.type";

export class CsvReader {
  private csvStream: fs.ReadStream;

  constructor(protected readonly filePath: string) {
    if (!fs.existsSync(this.getCsvFilePath())) {
      fs.openSync(this.getCsvFilePath(), 'a');
    }

    console.log(this.getCsvFilePath())
    this.csvStream = fs.createReadStream(this.getCsvFilePath());
  }

  private getCsvFilePath() {
    return path.join(BASE_DIRECTORY, this.filePath)
  }

  public async getData(): Promise<Record<string, TotoRecordType>> {
    const hashMap: Record<string, TotoRecordType> = {}

    return new Promise((resolve, reject) => {
      this.csvStream.pipe(csv.parse(CsvConstant as Options))
        .on("data", function (row: TotoRecordType) {
          hashMap[row.DrawId] = row
        }).on('error', function (err) {
          reject(err);
        }).on("end", () => resolve(hashMap))
    })
  }
}
