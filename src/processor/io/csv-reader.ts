import {CsvConstant} from "../../constants/csv.constant";
import * as csv from 'csv';
import * as fs from 'fs'
import * as path from "path";
import {BASE_DIRECTORY} from "../../configuration/application.config";
import {Options} from "csv-parse";
import {TotoRecordType} from "../../types/toto-record.type";
import {CsvAbstract} from "./csv-abstract";

export class CsvReader extends CsvAbstract{
  private csvStream: fs.ReadStream;

  constructor(protected readonly filePath: string) {
    super(filePath);
    this.csvStream = fs.createReadStream(this.getCsvFilePath());
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
