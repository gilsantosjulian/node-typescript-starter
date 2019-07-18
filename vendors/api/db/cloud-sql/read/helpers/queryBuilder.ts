const splitParamsByComa = (filter: any) => {
  console.log(filter);
  const filterParams: String[] = filter.split(',');
  filterParams.forEach((item, index) => {
    filterParams[index] = `entity.${item}`;
  });
  return filterParams;
};

const copyJSON = (json: any) => {
  const newJson: any = {};
  Object.keys(json).forEach(key => {
    newJson[key] = json[key];
  });
  return newJson;
};

const sanitizeFilter = (filter: any) => {
  delete filter.select;
  delete filter.page;
  delete filter.groupBy;
  delete filter.pageSize;
};

// TODO validations and helpers has to be in controller, utils or helper: they are here in order to make filter works

const addOperator = (buildedQuery: any, key: string, operator: string, value: any) => {
  const operatorParser: any = {
    eq: '=',
    lt: '<',
    gt: '>',
    gte: '>=',
    lte: '<=',
  };
  const queryVariables: any = {};
  if (operator != 'between') {
    queryVariables[key] = value;
    console.log(`${key} ${operatorParser[operator]} :${key}`);
    return buildedQuery.andWhere(
      `${key} ${operatorParser[operator]} :${key}`,
      queryVariables,
    );
  } else {
    queryVariables[`${key}1`] = value.lt;
    queryVariables[`${key}2`] = value.gt;
    return buildedQuery.andWhere(
      `${key} < :${key}1 AND ${key} > :${key}2`,
      queryVariables,
    );
  }
};

const addWhere = (filter: any, buildedQuery: any) => {
  Object.keys(filter).forEach(key => {
    if (!filter[key].lt && !filter[key].gt && !filter[key].sort) {
      buildedQuery = addOperator(buildedQuery, key, 'eq', filter[key]);
    }
  });
  return buildedQuery;
};

const addPaginator = (filter: any, buildedQuery: any) => {
  return buildedQuery.skip(filter.pageSize * (filter.page - 1)).take(filter.pageSize);
};

const addInRange = (filter: any, buildedQuery: any) => {
  Object.keys(filter).forEach(key => {
    if (filter[key].lt && filter[key].gt) {
      buildedQuery = addOperator(buildedQuery, key, 'between', {
        lt: filter[key].lt,
        gt: filter[key].gt,
      });
    } else if (filter[key].lt) {
      buildedQuery = addOperator(buildedQuery, key, 'lt', filter[key].lt);
    } else if (filter[key].gt) {
      buildedQuery = addOperator(buildedQuery, key, 'gt', filter[key].gt);
    }
  });
  return buildedQuery;
};

const addSelect = (filter: any, buildedQuery: any) => {
  console.log(filter.select, 'the filter');
  const filterParams: String[] = splitParamsByComa(filter.select);
  console.log(filterParams);

  buildedQuery.select(filterParams);

  return buildedQuery;
};

const addOrderBy = (filter: any, buildedQuery: any) => {
  Object.keys(filter).forEach(key => {
    if (filter[key].sort) {
      const sortDirection = filter[key].sort;
      buildedQuery.addOrderBy(`entity.${key}`, sortDirection);
    }
  });
  return buildedQuery;
};

const addGroupBy = (filter: any, buildedQuery: any) => {
  const filterParams: String[] = splitParamsByComa(filter.groupBy);
  filterParams.forEach(element => {
    buildedQuery.addGroupBy(element);
  });
  buildedQuery.addGroupBy('id');

  return buildedQuery;
};

const builder = async (filter: any, buildedQuery: any) => {
  const sanitizedFilter: any = copyJSON(filter);
  sanitizeFilter(sanitizedFilter);

  console.log(sanitizedFilter);
  if (filter.select) {
    buildedQuery = addSelect(filter, buildedQuery);
  }
  buildedQuery = addWhere(sanitizedFilter, buildedQuery);
  buildedQuery = addInRange(filter, buildedQuery);
  buildedQuery = addOrderBy(filter, buildedQuery);
  if (filter.groupBy) {
    buildedQuery = addGroupBy(filter, buildedQuery);
  }
  buildedQuery = addPaginator(filter, buildedQuery);
  return await buildedQuery.getManyAndCount();
};

export = {
  builder,
};
