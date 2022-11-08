import {CsvConstant} from "../../constants/csv.constant";
import * as csv from 'csv';
import * as fs from 'fs'
import * as path from "path";
import {BASE_DIRECTORY} from "../../configuration/application.config";
import {Options} from "csv-parse";
import {TotoRecordType} from "../../types/toto-record.type";

export abstract class CsvAbstract {
  protected constructor(protected readonly filePath: string) {
    if (!fs.existsSync(this.getCsvFilePath())) {
      fs.openSync(this.getCsvFilePath(), 'a');
    }
  }

  protected getCsvFilePath() {
    return path.join(BASE_DIRECTORY, this.filePath)
  }
}
