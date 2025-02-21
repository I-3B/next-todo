/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Account {
  access_token: string | null;
  expires_at: Int8 | null;
  id: Generated<string>;
  id_token: string | null;
  provider: string;
  provider_account_id: string;
  refresh_token: string | null;
  scope: string | null;
  session_state: string | null;
  token_type: string | null;
  type: string;
  user_id: string;
}

export interface Session {
  expires: Timestamp;
  id: Generated<string>;
  session_token: string;
  user_id: string;
}

export interface Todo {
  completed: Generated<boolean>;
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  description: string | null;
  id: Generated<string>;
  title: string;
  updated_at: Generated<Timestamp>;
  user_id: string;
}

export interface User {
  created_at: Generated<Timestamp>;
  email: string;
  email_verified: Timestamp | null;
  id: Generated<string>;
  image: string | null;
  name: string | null;
  password: string;
}

export interface VerificationToken {
  expires: Timestamp;
  identifier: string;
  token: string;
}

export interface DB {
  account: Account;
  session: Session;
  todo: Todo;
  user: User;
  verification_token: VerificationToken;
}
