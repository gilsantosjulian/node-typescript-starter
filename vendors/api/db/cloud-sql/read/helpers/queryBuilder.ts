import { whereParams } from '../../models/query';

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
    if (whereParams.includes(key)) {
      // TODO validate fields in a better way, such as page and pageSize ... don't appear as where params
      filterString = filterString + addWhereValue(filterString, key, operator);
      filterObject[key] = filter[key];
    }
  });

  if (filterString.length > 0) {
    console.log(filterString, 'there were filter params');
    return buildedQuery.where(filterString, filterObject);
  } else {
    console.log("there weren't filter params");
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
  buildedQuery = addWhere(filter, buildedQuery);

  if (filter.page && filter.pageSize) {
    buildedQuery = addPaginator(filter, buildedQuery);
  }

  addOrderBy(filter, buildedQuery);

  return buildedQuery.getMany();
};

export = {
  builder,
};
