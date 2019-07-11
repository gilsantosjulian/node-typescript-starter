const addFilterString = (
  filterString: string,
  element: string,
  decorator: string,
  operator: string,
) => {
  const queryElement = `${decorator}.${element} = :${element}`;
  if (filterString.length === 0) {
    return (filterString = queryElement); // TODO validate element on queries get request
  } else {
    return (filterString = ` ${operator} ${queryElement}`);
  }
};

const filterByParamsBuilder = (filter: any, savedQuery: any, decorator: string) => {
  let filterString: string = '';

  const filterObject: any = {};
  if (filter.vendor) {
    filterString =
      filterString + addFilterString(filterString, 'vendor', decorator, 'OR');
    filterObject.vendor = filter.vendor;
    console.log(filterString, filter.vendor, 'filters');
  }
  if (filter.invoice) {
    filterString =
      filterString + addFilterString(filterString, 'vendor', decorator, 'OR');
    filterObject.vendor = filter.vendor;
    console.log(filterString, filter.vendor, 'filters');
  }
  if (filterString.length > 0) {
    return savedQuery.where(filterString, filterObject);
  } else {
    return savedQuery;
  }
};

const pageBuilder = (page: number, pageSize: number, savedQuery: any) => {
  return savedQuery.skip(pageSize * (page - 1)).take(pageSize);
};

const builder = async (Query: any, filter: any, connection: any, decorator: string) => {
  const queryRepository = connection.getRepository(Query);
  let savedQuerie: any = queryRepository.createQueryBuilder(decorator);
  savedQuerie = filterByParamsBuilder(filter, savedQuerie, decorator);

  if (filter.page && filter.pageSize) {
    savedQuerie = pageBuilder(filter.page, filter.pageSize, savedQuerie);
  }

  return savedQuerie.getMany();
};

export = {
  builder,
};
