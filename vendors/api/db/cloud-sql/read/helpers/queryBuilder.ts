const addWhereValue = (filterString: string, element: string, operator: string) => {
  const queryElement = `${element} = :${element}`;
  if (filterString.length === 0) {
    return (filterString = queryElement); // TODO validate element on queries get request
  } else {
    return (filterString = ` ${operator} ${queryElement}`);
  }
};

const addWhere = (filter: any, buildedQuery: any) => {
  let filterString: string = '';
  const operator: string = 'AND';
  const filterObject: any = {};
  Object.keys(filter).forEach(key => {
    if (filter[key].eq) {
      filterString = filterString + addWhereValue(filterString, key, operator);
      filterObject[key] = filter[key].eq;
    }
  });

  if (filterString.length > 0) {
    return buildedQuery.where(filterString, filterObject);
  } else {
    return buildedQuery;
  }
};

const addPaginator = (filter: any, buildedQuery: any) => {
  return buildedQuery.skip(filter.pageSize * (filter.page - 1)).take(filter.pageSize);
};

const addOrderBy = (filter: any, buildedQuery: any) => {
  console.log(filter);
};

const builder = async (filter: any, buildedQuery: any) => {
  const whereFilter = filter;
  delete whereFilter.page;
  delete whereFilter.pageSize;

  buildedQuery = addWhere(whereFilter, buildedQuery);

  if (filter.page && filter.pageSize) {
    buildedQuery = addPaginator(filter, buildedQuery);
  }

  addOrderBy(filter, buildedQuery);

  return buildedQuery.getMany();
};

export = {
  builder,
};
