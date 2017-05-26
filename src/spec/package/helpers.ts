import * as fs from 'fs';
import * as path from 'path';
import {Readable} from 'stream';
export const root: string = path.resolve(__dirname, '../../../');
export type PackageJson = {
  name?: string; license?: string;
};
export type VscodeSettings = {
  'editor.tabSize': number;
};
export const changelog = getFileAsString('CHANGELOG.md');
export const clangFormat = getFileAsString('.clang-format');
export const editorConfig = getFileAsString('.editorconfig');
export const license = getFileAsString('LICENSE');
export const packageJson =
    parseJson(getFileAsString('package.json')) as PackageJson;
export const readme = getFileAsString('README.md');
export const vscodeSettings =
    parseJson(stripJsComments(getFileAsString('.vscode/settings.json'))) as
    VscodeSettings;

export async function streamOutputs<T>(stream: Readable): Promise<T[]> {
  const results: T[] = [];
  return new Promise<T[]>((resolve, reject) => {
    stream.on('data', (data: T) => results.push(data));
    stream.on('error', (e) => reject(e));
    stream.on('end', () => resolve(results));
  });
}

export function stringAsStream(text: string): Readable {
  const stream = new Readable();
  stream.push(text);
  stream.push(null);
  return stream;
}

function getFileAsString(filename: string): string {
  try {
    return fs.readFileSync(path.join(root, filename)).toString('utf-8');
  } catch (e) {
    console.log(`Unable to read ${filename}: ${e.message}`);
    return '';
  }
}

function parseJson(json: string): {} {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.log(`Unable to parse JSON: ${e.message}\n---\nJSON\n: ${json}`);
    return {};
  }
}

function stripJsComments(json: string): string {
  return json.replace(/\/\/[^\n]+/g, '');
}
