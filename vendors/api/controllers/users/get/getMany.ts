"use strict";
const userModel = require("../../../db/datastore/users/get/getMany");

export const getMany = async (query: object): Promise<any> => {
  try {
    const result = await userModel.getMany(query);
    return result;
  } catch (err) {
    const error = {
      error: 500,
      message: err.message
    };
    throw error;
  }
};
