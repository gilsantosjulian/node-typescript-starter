'use strict';
import { send } from './resources/invoices/post/send';
import { getById, getList } from './resources/queries/get/invoice';
import { create } from './resources/queries/post/create';

export = {
  getList,
  getById,
  create,
  send,
};
