import { Request } from "express";
import { RowDataPacket } from "mysql2/promise";

export interface ReturnValue {
  key: string;
  value: string | boolean;
}
export interface ExtendedRequest extends Request {
  session: any;
}

export interface Post extends RowDataPacket {
  id: number;
  title: string;
  content: string;
}
