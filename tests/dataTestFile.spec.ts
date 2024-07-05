import { test, expect } from '@playwright/test';
import path from 'path';
import { readCsvFile, writeCsvFile } from '../data-utility/csvUtils';
import { getEnvVariable } from '../data-utility/envUtils';
import { readJsonFile, writeJsonFile } from '../data-utility/jsonUtils';
import { readExcelFile, writeExcelFile } from '../data-utility/excelUtils';

test('example test', async ({ page }) => {
  // Reading environment variable
  const apiUrl = getEnvVariable('API_URL');
  console.log('API URL:', apiUrl);

  // Reading and writing CSV files
  const csvData = await readCsvFile(path.resolve(__dirname, '../data/data.csv'));
  console.log('CSV Data:', csvData);
  writeCsvFile(path.resolve(__dirname, '../data/data_output.csv'), csvData);

  // Reading and writing JSON files
  const jsonData = await readJsonFile(path.resolve(__dirname, '../data/data.json'));
  console.log('JSON Data:', jsonData);
  writeJsonFile(path.resolve(__dirname, '../data/data_output.json'), jsonData);

  // Reading and writing Excel files
  const excelData = readExcelFile(path.resolve(__dirname, '../data/data.xlsx'));
  console.log('Excel Data:', excelData);
  writeExcelFile(path.resolve(__dirname, '../data/data_output.xlsx'), excelData);

  // Example Playwright action
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
