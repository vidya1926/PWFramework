import fs from 'fs';
import csv from 'csv-parser';

export const readCsvFile = (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

export const writeCsvFile = (filePath: string, data: any[]): void => {
  const csvWriter = require('csv-writer').createObjectCsvWriter({
    path: filePath,
    header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
  });

  csvWriter.writeRecords(data);
};
