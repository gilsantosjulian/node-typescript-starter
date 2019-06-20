const usersMock: Array<object> = [
  {
    name: "Julian",
    username: "juliangils",
    email: "julian@minka.io"
  },
  {
    name: "Damian",
    username: "damianf",
    email: "damian@minka.io"
  },
  {
    name: "Luis",
    username: "luise",
    email: "luise@minka.io"
  }
];

const getMany = async (filters: object): Promise<any> => {
  if (filters) {
    return usersMock;
  }
  new Error("Filter object required");
};

export = {
  getMany
};
