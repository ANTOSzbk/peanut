export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: string;
  uuid: string;
  _text: string[];
  jsonb: string;
}

export interface Settings {
  guild: Scalars['String'];
  settings: Scalars['jsonb'];
}
