import axios from 'axios';
import { ROOT_URL } from '../index';

export function getUserInfo(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/user/mypage`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function putUserInfo(req) {
  return axios({
    method: 'PUT',
    url: `${ROOT_URL}/user/mypage`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function getTutorInfo(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/user/tutorclass`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function putTutorInfo(req) {
  return axios({
    method: 'PUT',
    url: `${ROOT_URL}/user/tutorclass`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function getTuteeInfo(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/user/tuteeclass`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function putTuteeInfo(req) {
  return axios({
    method: 'PUT',
    url: `${ROOT_URL}/user/tuteeclass`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function alterPassword(req) {
  return axios({
    method: 'PUT',
    url: `${ROOT_URL}/user/changepw`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function withDrawal(req) {
  return axios({
    method: 'DELETE',
    url: `${ROOT_URL}/user/quit`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}
