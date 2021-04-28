import { Stream } from "stream";


export interface IProfileUpload{
  fileName: string;
  mimeType: string;
  encoding: string;
  createReadStream: () => Stream;
}