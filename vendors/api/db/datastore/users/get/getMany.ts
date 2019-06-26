import http from '../../../../services/http';

const getMany = async (filters: object): Promise<any> => {
  if (filters) {
    const response = await http.get('https://pokeapi.co/api/v2/pokemon');
    return response.data.results;
  }
  new Error('Filter object required');
};

export = {
  getMany,
};
