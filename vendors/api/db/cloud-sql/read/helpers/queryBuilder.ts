const addOperator = (buildedQuery: any, key: string, operator: string, value: any) => {
  const operatorParser: any = {
    eq: '=',
    lt: '<',
    gt: '>',
  };
  const queryVariables: any = {};

  if (operator != 'between') {
    queryVariables[key] = value;
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
    if (filter[key].eq) {
      buildedQuery = addOperator(buildedQuery, key, 'eq', filter[key].eq);
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
  const filterParams: String[] = filter.select.split(',');

  filterParams.forEach((item, index) => {
    filterParams[index] = `entity.${item}`;
  });

  buildedQuery.select(filterParams);

  return buildedQuery;
};

const builder = async (filter: any, buildedQuery: any) => {
  if (filter.select) {
    buildedQuery = addSelect(filter, buildedQuery);
  }

  buildedQuery = addWhere(filter, buildedQuery);
  buildedQuery = addInRange(filter, buildedQuery);
  buildedQuery = addPaginator(filter, buildedQuery);
  return await buildedQuery.getManyAndCount();
};

export = {
  builder,
};
