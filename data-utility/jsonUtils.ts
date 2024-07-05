import jsonfile from 'jsonfile';

export const readJsonFile = (filePath: string): Promise<any> => {
  return jsonfile.readFile(filePath);
};

export const writeJsonFile = (filePath: string, data: any): void => {
  jsonfile.writeFile(filePath, data, { spaces: 2 });
};
