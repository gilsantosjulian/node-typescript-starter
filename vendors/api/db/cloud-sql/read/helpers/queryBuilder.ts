const splitParamsByComa = (filter: any) => {
  const filterParams: String[] = filter.split(',');
  filterParams.forEach((item, index) => {
    filterParams[index] = `entity.${item}`;
  });
  return filterParams;
};

const addOperator = (buildedQuery: any, key: string, operator: string, value: any) => {
  const operatorParser: any = {
    eq: '=',
    lt: '<=',
    gt: '>=',
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
      `${Number(key)} < :${key}1 AND ${key} >= :${key}2`,
      queryVariables,
    );
  }
};

const addWhere = (filter: any, buildedQuery: any) => {
  Object.keys(filter).forEach(key => {
    if (filter[key] && !filter[key].lt && !filter[key].gt && !filter[key].sort) {
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
    if (filter[key] && filter[key].lt && filter[key].gt) {
      buildedQuery = addOperator(buildedQuery, key, 'between', {
        lt: filter[key].lt,
        gt: filter[key].gt,
      });
    } else if (filter[key] && filter[key].lt) {
      buildedQuery = addOperator(buildedQuery, key, 'lt', filter[key].lt);
    } else if (filter[key] && filter[key].gt) {
      buildedQuery = addOperator(buildedQuery, key, 'gt', filter[key].gt);
    }
  });
  return buildedQuery;
};

const addSelect = (filter: any, buildedQuery: any) => {
  const filterParams: String[] = splitParamsByComa(filter.select);

  buildedQuery.select(filterParams);

  return buildedQuery;
};

const addOrderBy = (filter: any, buildedQuery: any) => {
  Object.keys(filter).forEach(key => {
    if (filter[key] && filter[key].sort) {
      console.log(filter[key].sort, 'thefilters sort');
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
  console.log(filter.filters);
  if (filter.filters.select) {
    buildedQuery = addSelect(filter.filters, buildedQuery);
  }
  buildedQuery = addWhere(filter.data, buildedQuery);
  buildedQuery = addInRange(filter.data, buildedQuery);
  buildedQuery = addOrderBy(filter.data, buildedQuery);
  if (filter.filters.groupBy) {
    buildedQuery = addGroupBy(filter.filters, buildedQuery);
  }
  buildedQuery = addPaginator(filter.filters, buildedQuery);
  return await buildedQuery.getManyAndCount();
};

export = {
  builder,
};
