'use strict';
import loggin from '../../../../../../logger';
import { sendQueue } from '../../../../../serivces/rabbitService';
import parse from '../../../../../utils/parse';

export const send = async (data: any): Promise<any> => {
  try {
    const queueData = parse.formatPayment(data);
    const rabbitResponse = await sendQueue(queueData);
    return rabbitResponse.data;
  } catch (error) {
    loggin.error(error);
    return error;
  }
};
