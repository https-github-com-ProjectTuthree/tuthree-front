import axios from 'axios';
import { ROOT_URL } from '../index';

export function getQuestionList(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/room/exam`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    // responseType: 'arraybuffer',
  });
}

// export function getDetailClass(req) {
//   return axios({
//     method: 'GET',
//     url: `${ROOT_URL}/room/find`,
//     params: req.params ? req.params : null,
//     headers: req.headers ? req.headers : null,
//   });
// }

export function setQuestion(req) {
  return axios({
    method: 'POST',
    url: `${ROOT_URL}/room/exam`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function setAnswer(req) {
  return axios({
    method: 'POST',
    url: `${ROOT_URL}/room/exam/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function getAnswer(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/room/exam/answer/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    // responseType: 'arraybuffer',
  });
}

export function markingAnswer(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/room/exam/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    // responseType: 'arraybuffer',
  });
}

// export function putSchedule(req) {
//   return axios({
//     method: 'PUT',
//     url: `${ROOT_URL}/room/calendar/${req.id}`,
//     params: req.params ? req.params : null,
//     headers: req.headers ? req.headers : null,
//     data: req.data,
//   });
// }

export function delQuestion(req) {
  return axios({
    method: 'DELETE',
    url: `${ROOT_URL}/room/exam/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}
