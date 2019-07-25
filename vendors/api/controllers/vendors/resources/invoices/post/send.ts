'use strict';
import loggin from '../../../../../../logger';
import { sendQueue } from '../../../../../serivces/rabbitService';

export const send = async (data: any): Promise<any> => {
  try {
    const rabbitResponse = await sendQueue(data);
    return rabbitResponse.data;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
