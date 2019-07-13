const errors: any = {
  '200': {
    code: '0',
    message: 'Success',
  },
  '401': {
    code: '402',
    message: 'Error retrieving data',
  },
  '406': {
    code: '403',
    message: 'Invalid amount',
  },
  '503': {
    code: '402',
    message: 'Error retrieving data',
  },
  '500': {
    code: '402',
    message: 'Error retrieving data',
  },
  '400': {
    code: '404',
    message: 'Invalid request format',
  },
  '006': {
    code: '401',
    message: 'Invalid invoice',
  },
  '404': {
    code: '401',
    message: 'Invalid invoice',
  },
  '009': {
    code: '405',
    message: 'Duplicate payment',
  },
  '010': {
    code: '401',
    message: 'Invalid invoice',
  },
};

const mapper = (code: string) => {
  return errors[code];
};

export = {
  mapper,
};
