import {Options} from "csv-parse/lib";

export const CsvConstant: Options = {
  autoParse: false,
  encoding: "utf-8",
  columns: true,
  skip_empty_lines: true,
  trim: true,
}
