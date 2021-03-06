import axios from 'axios';
import { ROOT_URL } from '../index';

export function getTutorList(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/tutor/list/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getDetailTutorList(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/tutor/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}
