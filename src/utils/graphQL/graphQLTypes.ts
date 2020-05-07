export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
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

/** columns and relationships of "cases" */
export type Cases = {
  action: Scalars['Int'];
  action_duration?: Maybe<Scalars['timestamptz']>;
  action_processed?: Maybe<Scalars['Boolean']>;
  case_id: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  guild: Scalars['String'];
  id: Scalars['uuid'];
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id: Scalars['String'];
  target_tag: Scalars['String'];
};

/** columns and relationships of "casesDev" */
export type CasesDev = {
  action: Scalars['Int'];
  action_duration?: Maybe<Scalars['timestamptz']>;
  action_processed?: Maybe<Scalars['Boolean']>;
  case_id: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  guild: Scalars['String'];
  id: Scalars['uuid'];
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id: Scalars['String'];
  target_tag: Scalars['String'];
};

/** aggregated selection of "casesDev" */
export type CasesDevAggregate = {
  aggregate?: Maybe<CasesDevAggregateFields>;
  nodes: Array<CasesDev>;
};

/** aggregate fields of "casesDev" */
export type CasesDevAggregateFields = {
  avg?: Maybe<CasesDevAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<CasesDevMaxFields>;
  min?: Maybe<CasesDevMinFields>;
  stddev?: Maybe<CasesDevStddevFields>;
  stddev_pop?: Maybe<CasesDevStddevPopFields>;
  stddev_samp?: Maybe<CasesDevStddevSampFields>;
  sum?: Maybe<CasesDevSumFields>;
  var_pop?: Maybe<CasesDevVarPopFields>;
  var_samp?: Maybe<CasesDevVarSampFields>;
  variance?: Maybe<CasesDevVarianceFields>;
};


/** aggregate fields of "casesDev" */
export type CasesDevAggregateFieldsCountArgs = {
  columns?: Maybe<Array<CasesDevSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "casesDev" */
export type CasesDevAggregateOrderBy = {
  avg?: Maybe<CasesDevAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<CasesDevMaxOrderBy>;
  min?: Maybe<CasesDevMinOrderBy>;
  stddev?: Maybe<CasesDevStddevOrderBy>;
  stddev_pop?: Maybe<CasesDevStddevPopOrderBy>;
  stddev_samp?: Maybe<CasesDevStddevSampOrderBy>;
  sum?: Maybe<CasesDevSumOrderBy>;
  var_pop?: Maybe<CasesDevVarPopOrderBy>;
  var_samp?: Maybe<CasesDevVarSampOrderBy>;
  variance?: Maybe<CasesDevVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "casesDev" */
export type CasesDevArrRelInsertInput = {
  data: Array<CasesDevInsertInput>;
  on_conflict?: Maybe<CasesDevOnConflict>;
};

/** aggregate avg on columns */
export type CasesDevAvgFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "casesDev" */
export type CasesDevAvgOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "casesDev". All fields are combined with a logical 'AND'. */
export type CasesDevBoolExp = {
  _and?: Maybe<Array<Maybe<CasesDevBoolExp>>>;
  _not?: Maybe<CasesDevBoolExp>;
  _or?: Maybe<Array<Maybe<CasesDevBoolExp>>>;
  action?: Maybe<IntComparisonExp>;
  action_duration?: Maybe<TimestamptzComparisonExp>;
  action_processed?: Maybe<BooleanComparisonExp>;
  case_id?: Maybe<IntComparisonExp>;
  created_at?: Maybe<TimestamptzComparisonExp>;
  guild?: Maybe<StringComparisonExp>;
  id?: Maybe<UuidComparisonExp>;
  message?: Maybe<StringComparisonExp>;
  mod_id?: Maybe<StringComparisonExp>;
  mod_tag?: Maybe<StringComparisonExp>;
  reason?: Maybe<StringComparisonExp>;
  ref_id?: Maybe<IntComparisonExp>;
  target_id?: Maybe<StringComparisonExp>;
  target_tag?: Maybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "casesDev" */
export enum CasesDevConstraint {
  /** unique or primary key constraint */
  CasesDevPkey = 'casesDev_pkey'
}

/** input type for incrementing integer column in table "casesDev" */
export type CasesDevIncInput = {
  action?: Maybe<Scalars['Int']>;
  case_id?: Maybe<Scalars['Int']>;
  ref_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "casesDev" */
export type CasesDevInsertInput = {
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  action_processed?: Maybe<Scalars['Boolean']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type CasesDevMaxFields = {
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "casesDev" */
export type CasesDevMaxOrderBy = {
  action?: Maybe<OrderBy>;
  action_duration?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  created_at?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  mod_id?: Maybe<OrderBy>;
  mod_tag?: Maybe<OrderBy>;
  reason?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
  target_id?: Maybe<OrderBy>;
  target_tag?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type CasesDevMinFields = {
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "casesDev" */
export type CasesDevMinOrderBy = {
  action?: Maybe<OrderBy>;
  action_duration?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  created_at?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  mod_id?: Maybe<OrderBy>;
  mod_tag?: Maybe<OrderBy>;
  reason?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
  target_id?: Maybe<OrderBy>;
  target_tag?: Maybe<OrderBy>;
};

/** response of any mutation on the table "casesDev" */
export type CasesDevMutationResponse = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<CasesDev>;
};

/** input type for inserting object relation for remote table "casesDev" */
export type CasesDevObjRelInsertInput = {
  data: CasesDevInsertInput;
  on_conflict?: Maybe<CasesDevOnConflict>;
};

/** on conflict condition type for table "casesDev" */
export type CasesDevOnConflict = {
  constraint: CasesDevConstraint;
  update_columns: Array<CasesDevUpdateColumn>;
  where?: Maybe<CasesDevBoolExp>;
};

/** ordering options when selecting data from "casesDev" */
export type CasesDevOrderBy = {
  action?: Maybe<OrderBy>;
  action_duration?: Maybe<OrderBy>;
  action_processed?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  created_at?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  mod_id?: Maybe<OrderBy>;
  mod_tag?: Maybe<OrderBy>;
  reason?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
  target_id?: Maybe<OrderBy>;
  target_tag?: Maybe<OrderBy>;
};

/** primary key columns input for table: "casesDev" */
export type CasesDevPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "casesDev" */
export enum CasesDevSelectColumn {
  /** column name */
  Action = 'action',
  /** column name */
  ActionDuration = 'action_duration',
  /** column name */
  ActionProcessed = 'action_processed',
  /** column name */
  CaseId = 'case_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  ModId = 'mod_id',
  /** column name */
  ModTag = 'mod_tag',
  /** column name */
  Reason = 'reason',
  /** column name */
  RefId = 'ref_id',
  /** column name */
  TargetId = 'target_id',
  /** column name */
  TargetTag = 'target_tag'
}

/** input type for updating data in table "casesDev" */
export type CasesDevSetInput = {
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  action_processed?: Maybe<Scalars['Boolean']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type CasesDevStddevFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "casesDev" */
export type CasesDevStddevOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type CasesDevStddevPopFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "casesDev" */
export type CasesDevStddevPopOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type CasesDevStddevSampFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "casesDev" */
export type CasesDevStddevSampOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type CasesDevSumFields = {
  action?: Maybe<Scalars['Int']>;
  case_id?: Maybe<Scalars['Int']>;
  ref_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "casesDev" */
export type CasesDevSumOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** update columns of table "casesDev" */
export enum CasesDevUpdateColumn {
  /** column name */
  Action = 'action',
  /** column name */
  ActionDuration = 'action_duration',
  /** column name */
  ActionProcessed = 'action_processed',
  /** column name */
  CaseId = 'case_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  ModId = 'mod_id',
  /** column name */
  ModTag = 'mod_tag',
  /** column name */
  Reason = 'reason',
  /** column name */
  RefId = 'ref_id',
  /** column name */
  TargetId = 'target_id',
  /** column name */
  TargetTag = 'target_tag'
}

/** aggregate var_pop on columns */
export type CasesDevVarPopFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "casesDev" */
export type CasesDevVarPopOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type CasesDevVarSampFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "casesDev" */
export type CasesDevVarSampOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type CasesDevVarianceFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "casesDev" */
export type CasesDevVarianceOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregated selection of "cases" */
export type CasesAggregate = {
  aggregate?: Maybe<CasesAggregateFields>;
  nodes: Array<Cases>;
};

/** aggregate fields of "cases" */
export type CasesAggregateFields = {
  avg?: Maybe<CasesAvgFields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<CasesMaxFields>;
  min?: Maybe<CasesMinFields>;
  stddev?: Maybe<CasesStddevFields>;
  stddev_pop?: Maybe<CasesStddevPopFields>;
  stddev_samp?: Maybe<CasesStddevSampFields>;
  sum?: Maybe<CasesSumFields>;
  var_pop?: Maybe<CasesVarPopFields>;
  var_samp?: Maybe<CasesVarSampFields>;
  variance?: Maybe<CasesVarianceFields>;
};


/** aggregate fields of "cases" */
export type CasesAggregateFieldsCountArgs = {
  columns?: Maybe<Array<CasesSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "cases" */
export type CasesAggregateOrderBy = {
  avg?: Maybe<CasesAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<CasesMaxOrderBy>;
  min?: Maybe<CasesMinOrderBy>;
  stddev?: Maybe<CasesStddevOrderBy>;
  stddev_pop?: Maybe<CasesStddevPopOrderBy>;
  stddev_samp?: Maybe<CasesStddevSampOrderBy>;
  sum?: Maybe<CasesSumOrderBy>;
  var_pop?: Maybe<CasesVarPopOrderBy>;
  var_samp?: Maybe<CasesVarSampOrderBy>;
  variance?: Maybe<CasesVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "cases" */
export type CasesArrRelInsertInput = {
  data: Array<CasesInsertInput>;
  on_conflict?: Maybe<CasesOnConflict>;
};

/** aggregate avg on columns */
export type CasesAvgFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "cases" */
export type CasesAvgOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "cases". All fields are combined with a logical 'AND'. */
export type CasesBoolExp = {
  _and?: Maybe<Array<Maybe<CasesBoolExp>>>;
  _not?: Maybe<CasesBoolExp>;
  _or?: Maybe<Array<Maybe<CasesBoolExp>>>;
  action?: Maybe<IntComparisonExp>;
  action_duration?: Maybe<TimestamptzComparisonExp>;
  action_processed?: Maybe<BooleanComparisonExp>;
  case_id?: Maybe<IntComparisonExp>;
  created_at?: Maybe<TimestamptzComparisonExp>;
  guild?: Maybe<StringComparisonExp>;
  id?: Maybe<UuidComparisonExp>;
  message?: Maybe<StringComparisonExp>;
  mod_id?: Maybe<StringComparisonExp>;
  mod_tag?: Maybe<StringComparisonExp>;
  reason?: Maybe<StringComparisonExp>;
  ref_id?: Maybe<IntComparisonExp>;
  target_id?: Maybe<StringComparisonExp>;
  target_tag?: Maybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "cases" */
export enum CasesConstraint {
  /** unique or primary key constraint */
  CasesPkey = 'cases_pkey'
}

/** input type for incrementing integer column in table "cases" */
export type CasesIncInput = {
  action?: Maybe<Scalars['Int']>;
  case_id?: Maybe<Scalars['Int']>;
  ref_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "cases" */
export type CasesInsertInput = {
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  action_processed?: Maybe<Scalars['Boolean']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type CasesMaxFields = {
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "cases" */
export type CasesMaxOrderBy = {
  action?: Maybe<OrderBy>;
  action_duration?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  created_at?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  mod_id?: Maybe<OrderBy>;
  mod_tag?: Maybe<OrderBy>;
  reason?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
  target_id?: Maybe<OrderBy>;
  target_tag?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type CasesMinFields = {
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "cases" */
export type CasesMinOrderBy = {
  action?: Maybe<OrderBy>;
  action_duration?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  created_at?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  mod_id?: Maybe<OrderBy>;
  mod_tag?: Maybe<OrderBy>;
  reason?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
  target_id?: Maybe<OrderBy>;
  target_tag?: Maybe<OrderBy>;
};

/** response of any mutation on the table "cases" */
export type CasesMutationResponse = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Cases>;
};

/** input type for inserting object relation for remote table "cases" */
export type CasesObjRelInsertInput = {
  data: CasesInsertInput;
  on_conflict?: Maybe<CasesOnConflict>;
};

/** on conflict condition type for table "cases" */
export type CasesOnConflict = {
  constraint: CasesConstraint;
  update_columns: Array<CasesUpdateColumn>;
  where?: Maybe<CasesBoolExp>;
};

/** ordering options when selecting data from "cases" */
export type CasesOrderBy = {
  action?: Maybe<OrderBy>;
  action_duration?: Maybe<OrderBy>;
  action_processed?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  created_at?: Maybe<OrderBy>;
  guild?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  message?: Maybe<OrderBy>;
  mod_id?: Maybe<OrderBy>;
  mod_tag?: Maybe<OrderBy>;
  reason?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
  target_id?: Maybe<OrderBy>;
  target_tag?: Maybe<OrderBy>;
};

/** primary key columns input for table: "cases" */
export type CasesPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "cases" */
export enum CasesSelectColumn {
  /** column name */
  Action = 'action',
  /** column name */
  ActionDuration = 'action_duration',
  /** column name */
  ActionProcessed = 'action_processed',
  /** column name */
  CaseId = 'case_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  ModId = 'mod_id',
  /** column name */
  ModTag = 'mod_tag',
  /** column name */
  Reason = 'reason',
  /** column name */
  RefId = 'ref_id',
  /** column name */
  TargetId = 'target_id',
  /** column name */
  TargetTag = 'target_tag'
}

/** input type for updating data in table "cases" */
export type CasesSetInput = {
  action?: Maybe<Scalars['Int']>;
  action_duration?: Maybe<Scalars['timestamptz']>;
  action_processed?: Maybe<Scalars['Boolean']>;
  case_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  guild?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  mod_id?: Maybe<Scalars['String']>;
  mod_tag?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  ref_id?: Maybe<Scalars['Int']>;
  target_id?: Maybe<Scalars['String']>;
  target_tag?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type CasesStddevFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "cases" */
export type CasesStddevOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type CasesStddevPopFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "cases" */
export type CasesStddevPopOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type CasesStddevSampFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "cases" */
export type CasesStddevSampOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type CasesSumFields = {
  action?: Maybe<Scalars['Int']>;
  case_id?: Maybe<Scalars['Int']>;
  ref_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "cases" */
export type CasesSumOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** update columns of table "cases" */
export enum CasesUpdateColumn {
  /** column name */
  Action = 'action',
  /** column name */
  ActionDuration = 'action_duration',
  /** column name */
  ActionProcessed = 'action_processed',
  /** column name */
  CaseId = 'case_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Guild = 'guild',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  ModId = 'mod_id',
  /** column name */
  ModTag = 'mod_tag',
  /** column name */
  Reason = 'reason',
  /** column name */
  RefId = 'ref_id',
  /** column name */
  TargetId = 'target_id',
  /** column name */
  TargetTag = 'target_tag'
}

/** aggregate var_pop on columns */
export type CasesVarPopFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "cases" */
export type CasesVarPopOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type CasesVarSampFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "cases" */
export type CasesVarSampOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type CasesVarianceFields = {
  action?: Maybe<Scalars['Float']>;
  case_id?: Maybe<Scalars['Float']>;
  ref_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "cases" */
export type CasesVarianceOrderBy = {
  action?: Maybe<OrderBy>;
  case_id?: Maybe<OrderBy>;
  ref_id?: Maybe<OrderBy>;
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
  /** delete data from the table: "cases" */
  delete_cases?: Maybe<CasesMutationResponse>;
  /** delete data from the table: "casesDev" */
  delete_casesDev?: Maybe<CasesDevMutationResponse>;
  /** delete single row from the table: "casesDev" */
  delete_casesDev_by_pk?: Maybe<CasesDev>;
  /** delete single row from the table: "cases" */
  delete_cases_by_pk?: Maybe<Cases>;
  /** delete data from the table: "settings" */
  delete_settings?: Maybe<SettingsMutationResponse>;
  /** delete data from the table: "settingsDev" */
  delete_settingsDev?: Maybe<SettingsDevMutationResponse>;
  /** delete single row from the table: "settingsDev" */
  delete_settingsDev_by_pk?: Maybe<SettingsDev>;
  /** delete single row from the table: "settings" */
  delete_settings_by_pk?: Maybe<Settings>;
  /** insert data into the table: "cases" */
  insert_cases?: Maybe<CasesMutationResponse>;
  /** insert data into the table: "casesDev" */
  insert_casesDev?: Maybe<CasesDevMutationResponse>;
  /** insert a single row into the table: "casesDev" */
  insert_casesDev_one?: Maybe<CasesDev>;
  /** insert a single row into the table: "cases" */
  insert_cases_one?: Maybe<Cases>;
  /** insert data into the table: "settings" */
  insert_settings?: Maybe<SettingsMutationResponse>;
  /** insert data into the table: "settingsDev" */
  insert_settingsDev?: Maybe<SettingsDevMutationResponse>;
  /** insert a single row into the table: "settingsDev" */
  insert_settingsDev_one?: Maybe<SettingsDev>;
  /** insert a single row into the table: "settings" */
  insert_settings_one?: Maybe<Settings>;
  /** update data of the table: "cases" */
  update_cases?: Maybe<CasesMutationResponse>;
  /** update data of the table: "casesDev" */
  update_casesDev?: Maybe<CasesDevMutationResponse>;
  /** update single row of the table: "casesDev" */
  update_casesDev_by_pk?: Maybe<CasesDev>;
  /** update single row of the table: "cases" */
  update_cases_by_pk?: Maybe<Cases>;
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
export type MutationRootDeleteCasesArgs = {
  where: CasesBoolExp;
};


/** mutation root */
export type MutationRootDeleteCasesDevArgs = {
  where: CasesDevBoolExp;
};


/** mutation root */
export type MutationRootDeleteCasesDevByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type MutationRootDeleteCasesByPkArgs = {
  id: Scalars['uuid'];
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
export type MutationRootInsertCasesArgs = {
  objects: Array<CasesInsertInput>;
  on_conflict?: Maybe<CasesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCasesDevArgs = {
  objects: Array<CasesDevInsertInput>;
  on_conflict?: Maybe<CasesDevOnConflict>;
};


/** mutation root */
export type MutationRootInsertCasesDevOneArgs = {
  object: CasesDevInsertInput;
  on_conflict?: Maybe<CasesDevOnConflict>;
};


/** mutation root */
export type MutationRootInsertCasesOneArgs = {
  object: CasesInsertInput;
  on_conflict?: Maybe<CasesOnConflict>;
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
export type MutationRootUpdateCasesArgs = {
  _inc?: Maybe<CasesIncInput>;
  _set?: Maybe<CasesSetInput>;
  where: CasesBoolExp;
};


/** mutation root */
export type MutationRootUpdateCasesDevArgs = {
  _inc?: Maybe<CasesDevIncInput>;
  _set?: Maybe<CasesDevSetInput>;
  where: CasesDevBoolExp;
};


/** mutation root */
export type MutationRootUpdateCasesDevByPkArgs = {
  _inc?: Maybe<CasesDevIncInput>;
  _set?: Maybe<CasesDevSetInput>;
  pk_columns: CasesDevPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCasesByPkArgs = {
  _inc?: Maybe<CasesIncInput>;
  _set?: Maybe<CasesSetInput>;
  pk_columns: CasesPkColumnsInput;
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
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type QueryRoot = {
  /** fetch data from the table: "cases" */
  cases: Array<Cases>;
  /** fetch data from the table: "casesDev" */
  casesDev: Array<CasesDev>;
  /** fetch aggregated fields from the table: "casesDev" */
  casesDev_aggregate: CasesDevAggregate;
  /** fetch data from the table: "casesDev" using primary key columns */
  casesDev_by_pk?: Maybe<CasesDev>;
  /** fetch aggregated fields from the table: "cases" */
  cases_aggregate: CasesAggregate;
  /** fetch data from the table: "cases" using primary key columns */
  cases_by_pk?: Maybe<Cases>;
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
export type QueryRootCasesArgs = {
  distinct_on?: Maybe<Array<CasesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesOrderBy>>;
  where?: Maybe<CasesBoolExp>;
};


/** query root */
export type QueryRootCasesDevArgs = {
  distinct_on?: Maybe<Array<CasesDevSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesDevOrderBy>>;
  where?: Maybe<CasesDevBoolExp>;
};


/** query root */
export type QueryRootCasesDevAggregateArgs = {
  distinct_on?: Maybe<Array<CasesDevSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesDevOrderBy>>;
  where?: Maybe<CasesDevBoolExp>;
};


/** query root */
export type QueryRootCasesDevByPkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type QueryRootCasesAggregateArgs = {
  distinct_on?: Maybe<Array<CasesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesOrderBy>>;
  where?: Maybe<CasesBoolExp>;
};


/** query root */
export type QueryRootCasesByPkArgs = {
  id: Scalars['uuid'];
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
  SettingsDevPkey = 'settingsDev_pkey'
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
  Settings = 'settings'
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
  Settings = 'settings'
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
  SettingsPkey = 'settings_pkey'
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
  Settings = 'settings'
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
  Settings = 'settings'
}

/** subscription root */
export type SubscriptionRoot = {
  /** fetch data from the table: "cases" */
  cases: Array<Cases>;
  /** fetch data from the table: "casesDev" */
  casesDev: Array<CasesDev>;
  /** fetch aggregated fields from the table: "casesDev" */
  casesDev_aggregate: CasesDevAggregate;
  /** fetch data from the table: "casesDev" using primary key columns */
  casesDev_by_pk?: Maybe<CasesDev>;
  /** fetch aggregated fields from the table: "cases" */
  cases_aggregate: CasesAggregate;
  /** fetch data from the table: "cases" using primary key columns */
  cases_by_pk?: Maybe<Cases>;
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
export type SubscriptionRootCasesArgs = {
  distinct_on?: Maybe<Array<CasesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesOrderBy>>;
  where?: Maybe<CasesBoolExp>;
};


/** subscription root */
export type SubscriptionRootCasesDevArgs = {
  distinct_on?: Maybe<Array<CasesDevSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesDevOrderBy>>;
  where?: Maybe<CasesDevBoolExp>;
};


/** subscription root */
export type SubscriptionRootCasesDevAggregateArgs = {
  distinct_on?: Maybe<Array<CasesDevSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesDevOrderBy>>;
  where?: Maybe<CasesDevBoolExp>;
};


/** subscription root */
export type SubscriptionRootCasesDevByPkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type SubscriptionRootCasesAggregateArgs = {
  distinct_on?: Maybe<Array<CasesSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<CasesOrderBy>>;
  where?: Maybe<CasesBoolExp>;
};


/** subscription root */
export type SubscriptionRootCasesByPkArgs = {
  id: Scalars['uuid'];
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


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};
