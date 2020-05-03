/* eslint-disable no-unused-vars */
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
};

export type SampleInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SampleOutput = {
  accessToken: Scalars['String'];
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type MutationRoot = {
  /** delete data from the table: "settings" */
  delete_settings?: Maybe<SettingsMutationResponse>;
  /** delete data from the table: "settingsDev" */
  delete_settingsDev?: Maybe<SettingsDevMutationResponse>;
  /** delete single row from the table: "settingsDev" */
  delete_settingsDev_by_pk?: Maybe<SettingsDev>;
  /** delete single row from the table: "settings" */
  delete_settings_by_pk?: Maybe<Settings>;
  /** insert data into the table: "settings" */
  insert_settings?: Maybe<SettingsMutationResponse>;
  /** insert data into the table: "settingsDev" */
  insert_settingsDev?: Maybe<SettingsDevMutationResponse>;
  /** insert a single row into the table: "settingsDev" */
  insert_settingsDev_one?: Maybe<SettingsDev>;
  /** insert a single row into the table: "settings" */
  insert_settings_one?: Maybe<Settings>;
  /** update data of the table: "settings" */
  update_settings?: Maybe<SettingsMutationResponse>;
  /** update data of the table: "settingsDev" */
  update_settingsDev?: Maybe<SettingsDevMutationResponse>;
  /** update single row of the table: "settingsDev" */
  update_settingsDev_by_pk?: Maybe<SettingsDev>;
  /** update single row of the table: "settings" */
  update_settings_by_pk?: Maybe<Settings>;
};

/** mutation root */
export type MutationRootDeleteSettingsArgs = {
  where: SettingsBoolExp;
};

/** mutation root */
export type MutationRootDeleteSettingsDevArgs = {
  where: SettingsDevBoolExp;
};

/** mutation root */
export type MutationRootDeleteSettingsDevByPkArgs = {
  guild: Scalars['String'];
};

/** mutation root */
export type MutationRootDeleteSettingsByPkArgs = {
  guild: Scalars['String'];
};

/** mutation root */
export type MutationRootInsertSettingsArgs = {
  objects: Array<SettingsInsertInput>;
  on_conflict?: Maybe<SettingsOnConflict>;
};

/** mutation root */
export type MutationRootInsertSettingsDevArgs = {
  objects: Array<SettingsDevInsertInput>;
  on_conflict?: Maybe<SettingsDevOnConflict>;
};

/** mutation root */
export type MutationRootInsertSettingsDevOneArgs = {
  object: SettingsDevInsertInput;
  on_conflict?: Maybe<SettingsDevOnConflict>;
};

/** mutation root */
export type MutationRootInsertSettingsOneArgs = {
  object: SettingsInsertInput;
  on_conflict?: Maybe<SettingsOnConflict>;
};

/** mutation root */
export type MutationRootUpdateSettingsArgs = {
  _append?: Maybe<SettingsAppendInput>;
  _delete_at_path?: Maybe<SettingsDeleteAtPathInput>;
  _delete_elem?: Maybe<SettingsDeleteElemInput>;
  _delete_key?: Maybe<SettingsDeleteKeyInput>;
  _prepend?: Maybe<SettingsPrependInput>;
  _set?: Maybe<SettingsSetInput>;
  where: SettingsBoolExp;
};

/** mutation root */
export type MutationRootUpdateSettingsDevArgs = {
  _append?: Maybe<SettingsDevAppendInput>;
  _delete_at_path?: Maybe<SettingsDevDeleteAtPathInput>;
  _delete_elem?: Maybe<SettingsDevDeleteElemInput>;
  _delete_key?: Maybe<SettingsDevDeleteKeyInput>;
  _prepend?: Maybe<SettingsDevPrependInput>;
  _set?: Maybe<SettingsDevSetInput>;
  where: SettingsDevBoolExp;
};

/** mutation root */
export type MutationRootUpdateSettingsDevByPkArgs = {
  _append?: Maybe<SettingsDevAppendInput>;
  _delete_at_path?: Maybe<SettingsDevDeleteAtPathInput>;
  _delete_elem?: Maybe<SettingsDevDeleteElemInput>;
  _delete_key?: Maybe<SettingsDevDeleteKeyInput>;
  _prepend?: Maybe<SettingsDevPrependInput>;
  _set?: Maybe<SettingsDevSetInput>;
  pk_columns: SettingsDevPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateSettingsByPkArgs = {
  _append?: Maybe<SettingsAppendInput>;
  _delete_at_path?: Maybe<SettingsDeleteAtPathInput>;
  _delete_elem?: Maybe<SettingsDeleteElemInput>;
  _delete_key?: Maybe<SettingsDeleteKeyInput>;
  _prepend?: Maybe<SettingsPrependInput>;
  _set?: Maybe<SettingsSetInput>;
  pk_columns: SettingsPkColumnsInput;
};

/** column ordering options */
export enum OrderBy {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** query root */
export type QueryRoot = {
  /** fetch data from the table: "settings" */
  settings: Array<Settings>;
  /** fetch data from the table: "settingsDev" */
  settingsDev: Array<SettingsDev>;
  /** fetch aggregated fields from the table: "settingsDev" */
  settingsDev_aggregate: SettingsDevAggregate;
  /** fetch data from the table: "settingsDev" using primary key columns */
  settingsDev_by_pk?: Maybe<SettingsDev>;
  /** fetch aggregated fields from the table: "settings" */
  settings_aggregate: SettingsAggregate;
  /** fetch data from the table: "settings" using primary key columns */
  settings_by_pk?: Maybe<Settings>;
};

/** query root */
export type QueryRootSettingsArgs = {
  distinct_on?: Maybe<Array<SettingsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsOrderBy>>;
  where?: Maybe<SettingsBoolExp>;
};

/** query root */
export type QueryRootSettingsDevArgs = {
  distinct_on?: Maybe<Array<SettingsDevSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsDevOrderBy>>;
  where?: Maybe<SettingsDevBoolExp>;
};

/** query root */
export type QueryRootSettingsDevAggregateArgs = {
  distinct_on?: Maybe<Array<SettingsDevSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsDevOrderBy>>;
  where?: Maybe<SettingsDevBoolExp>;
};

/** query root */
export type QueryRootSettingsDevByPkArgs = {
  guild: Scalars['String'];
};

/** query root */
export type QueryRootSettingsAggregateArgs = {
  distinct_on?: Maybe<Array<SettingsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsOrderBy>>;
  where?: Maybe<SettingsBoolExp>;
};

/** query root */
export type QueryRootSettingsByPkArgs = {
  guild: Scalars['String'];
};

/** columns and relationships of "settings" */
export type Settings = {
  guild: Scalars['String'];
  settings: Scalars['jsonb'];
};

/** columns and relationships of "settings" */
export type SettingsSettingsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "settingsDev" */
export type SettingsDev = {
  guild: Scalars['String'];
  settings: Scalars['jsonb'];
};

/** columns and relationships of "settingsDev" */
export type SettingsDevSettingsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "settingsDev" */
export type SettingsDevAggregate = {
  aggregate?: Maybe<SettingsDevAggregateFields>;
  nodes: Array<SettingsDev>;
};

/** aggregate fields of "settingsDev" */
export type SettingsDevAggregateFields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<SettingsDevMaxFields>;
  min?: Maybe<SettingsDevMinFields>;
};

/** aggregate fields of "settingsDev" */
export type SettingsDevAggregateFieldsCountArgs = {
  columns?: Maybe<Array<SettingsDevSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "settingsDev" */
export type SettingsDevAggregateOrderBy = {
  count?: Maybe<OrderBy>;
  max?: Maybe<SettingsDevMaxOrderBy>;
  min?: Maybe<SettingsDevMinOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type SettingsDevAppendInput = {
  settings?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "settingsDev" */
export type SettingsDevArrRelInsertInput = {
  data: Array<SettingsDevInsertInput>;
  on_conflict?: Maybe<SettingsDevOnConflict>;
};

/** Boolean expression to filter rows from the table "settingsDev". All fields are combined with a logical 'AND'. */
export type SettingsDevBoolExp = {
  _and?: Maybe<Array<Maybe<SettingsDevBoolExp>>>;
  _not?: Maybe<SettingsDevBoolExp>;
  _or?: Maybe<Array<Maybe<SettingsDevBoolExp>>>;
  guild?: Maybe<StringComparisonExp>;
  settings?: Maybe<JsonbComparisonExp>;
};

/** unique or primary key constraints on table "settingsDev" */
export enum SettingsDevConstraint {
  /** unique or primary key constraint */
  SettingsDevGuildKey = 'settingsDev_guild_key',
  /** unique or primary key constraint */
  SettingsDevPkey = 'settingsDev_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type SettingsDevDeleteAtPathInput = {
  settings?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type SettingsDevDeleteElemInput = {
  settings?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type SettingsDevDeleteKeyInput = {
  settings?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "settingsDev" */
export type SettingsDevInsertInput = {
  guild?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type SettingsDevMaxFields = {
  guild?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "settingsDev" */
export type SettingsDevMaxOrderBy = {
  guild?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type SettingsDevMinFields = {
  guild?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "settingsDev" */
export type SettingsDevMinOrderBy = {
  guild?: Maybe<OrderBy>;
};

/** response of any mutation on the table "settingsDev" */
export type SettingsDevMutationResponse = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<SettingsDev>;
};

/** input type for inserting object relation for remote table "settingsDev" */
export type SettingsDevObjRelInsertInput = {
  data: SettingsDevInsertInput;
  on_conflict?: Maybe<SettingsDevOnConflict>;
};

/** on conflict condition type for table "settingsDev" */
export type SettingsDevOnConflict = {
  constraint: SettingsDevConstraint;
  update_columns: Array<SettingsDevUpdateColumn>;
  where?: Maybe<SettingsDevBoolExp>;
};

/** ordering options when selecting data from "settingsDev" */
export type SettingsDevOrderBy = {
  guild?: Maybe<OrderBy>;
  settings?: Maybe<OrderBy>;
};

/** primary key columns input for table: "settingsDev" */
export type SettingsDevPkColumnsInput = {
  guild: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type SettingsDevPrependInput = {
  settings?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "settingsDev" */
export enum SettingsDevSelectColumn {
  /** column name */
  Guild = 'guild',
  /** column name */
  Settings = 'settings',
}

/** input type for updating data in table "settingsDev" */
export type SettingsDevSetInput = {
  guild?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['jsonb']>;
};

/** update columns of table "settingsDev" */
export enum SettingsDevUpdateColumn {
  /** column name */
  Guild = 'guild',
  /** column name */
  Settings = 'settings',
}

/** aggregated selection of "settings" */
export type SettingsAggregate = {
  aggregate?: Maybe<SettingsAggregateFields>;
  nodes: Array<Settings>;
};

/** aggregate fields of "settings" */
export type SettingsAggregateFields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<SettingsMaxFields>;
  min?: Maybe<SettingsMinFields>;
};

/** aggregate fields of "settings" */
export type SettingsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<SettingsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "settings" */
export type SettingsAggregateOrderBy = {
  count?: Maybe<OrderBy>;
  max?: Maybe<SettingsMaxOrderBy>;
  min?: Maybe<SettingsMinOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type SettingsAppendInput = {
  settings?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "settings" */
export type SettingsArrRelInsertInput = {
  data: Array<SettingsInsertInput>;
  on_conflict?: Maybe<SettingsOnConflict>;
};

/** Boolean expression to filter rows from the table "settings". All fields are combined with a logical 'AND'. */
export type SettingsBoolExp = {
  _and?: Maybe<Array<Maybe<SettingsBoolExp>>>;
  _not?: Maybe<SettingsBoolExp>;
  _or?: Maybe<Array<Maybe<SettingsBoolExp>>>;
  guild?: Maybe<StringComparisonExp>;
  settings?: Maybe<JsonbComparisonExp>;
};

/** unique or primary key constraints on table "settings" */
export enum SettingsConstraint {
  /** unique or primary key constraint */
  SettingsGuildKey = 'settings_guild_key',
  /** unique or primary key constraint */
  SettingsPkey = 'settings_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type SettingsDeleteAtPathInput = {
  settings?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type SettingsDeleteElemInput = {
  settings?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type SettingsDeleteKeyInput = {
  settings?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "settings" */
export type SettingsInsertInput = {
  guild?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type SettingsMaxFields = {
  guild?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "settings" */
export type SettingsMaxOrderBy = {
  guild?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type SettingsMinFields = {
  guild?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "settings" */
export type SettingsMinOrderBy = {
  guild?: Maybe<OrderBy>;
};

/** response of any mutation on the table "settings" */
export type SettingsMutationResponse = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Settings>;
};

/** input type for inserting object relation for remote table "settings" */
export type SettingsObjRelInsertInput = {
  data: SettingsInsertInput;
  on_conflict?: Maybe<SettingsOnConflict>;
};

/** on conflict condition type for table "settings" */
export type SettingsOnConflict = {
  constraint: SettingsConstraint;
  update_columns: Array<SettingsUpdateColumn>;
  where?: Maybe<SettingsBoolExp>;
};

/** ordering options when selecting data from "settings" */
export type SettingsOrderBy = {
  guild?: Maybe<OrderBy>;
  settings?: Maybe<OrderBy>;
};

/** primary key columns input for table: "settings" */
export type SettingsPkColumnsInput = {
  guild: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type SettingsPrependInput = {
  settings?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "settings" */
export enum SettingsSelectColumn {
  /** column name */
  Guild = 'guild',
  /** column name */
  Settings = 'settings',
}

/** input type for updating data in table "settings" */
export type SettingsSetInput = {
  guild?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['jsonb']>;
};

/** update columns of table "settings" */
export enum SettingsUpdateColumn {
  /** column name */
  Guild = 'guild',
  /** column name */
  Settings = 'settings',
}

/** subscription root */
export type SubscriptionRoot = {
  /** fetch data from the table: "settings" */
  settings: Array<Settings>;
  /** fetch data from the table: "settingsDev" */
  settingsDev: Array<SettingsDev>;
  /** fetch aggregated fields from the table: "settingsDev" */
  settingsDev_aggregate: SettingsDevAggregate;
  /** fetch data from the table: "settingsDev" using primary key columns */
  settingsDev_by_pk?: Maybe<SettingsDev>;
  /** fetch aggregated fields from the table: "settings" */
  settings_aggregate: SettingsAggregate;
  /** fetch data from the table: "settings" using primary key columns */
  settings_by_pk?: Maybe<Settings>;
};

/** subscription root */
export type SubscriptionRootSettingsArgs = {
  distinct_on?: Maybe<Array<SettingsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsOrderBy>>;
  where?: Maybe<SettingsBoolExp>;
};

/** subscription root */
export type SubscriptionRootSettingsDevArgs = {
  distinct_on?: Maybe<Array<SettingsDevSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsDevOrderBy>>;
  where?: Maybe<SettingsDevBoolExp>;
};

/** subscription root */
export type SubscriptionRootSettingsDevAggregateArgs = {
  distinct_on?: Maybe<Array<SettingsDevSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsDevOrderBy>>;
  where?: Maybe<SettingsDevBoolExp>;
};

/** subscription root */
export type SubscriptionRootSettingsDevByPkArgs = {
  guild: Scalars['String'];
};

/** subscription root */
export type SubscriptionRootSettingsAggregateArgs = {
  distinct_on?: Maybe<Array<SettingsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SettingsOrderBy>>;
  where?: Maybe<SettingsBoolExp>;
};

/** subscription root */
export type SubscriptionRootSettingsByPkArgs = {
  guild: Scalars['String'];
};
