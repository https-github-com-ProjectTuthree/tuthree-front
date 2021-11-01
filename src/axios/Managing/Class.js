import axios from 'axios';
import { ROOT_URL } from '../index';

export function getClass(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/room`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getDetailClass(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/room/find`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function setSchedule(req) {
  return axios({
    method: 'POST',
    url: `${ROOT_URL}/room/calendar`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}
export function putSchedule(req) {
  return axios({
    method: 'PUT',
    url: `${ROOT_URL}/room/calendar/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function delSchedule(req) {
  return axios({
    method: 'DELETE',
    url: `${ROOT_URL}/room/calendar/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getSchedule(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/room/calendar`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getDetailSchedule(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/room/calendar/date`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function setReport(req) {
  return axios({
    method: 'POST',
    url: `${ROOT_URL}/room/post`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}
export function putReport(req) {
  return axios({
    method: 'PUT',
    url: `${ROOT_URL}/room/post/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function delReport(req) {
  return axios({
    method: 'DELETE',
    url: `${ROOT_URL}/room/post/${req.id}`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getReport(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/room/calendar`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getDetailReport(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/room/post/date`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getTimeTable(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/users/schedule`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function enrollmentChild(req) {
  return axios({
    method: 'POST',
    url: `${ROOT_URL}/user/child`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
    data: req.data,
  });
}

export function getEnrollmentList(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/user/parent`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function acceptEnrollment(req) {
  return axios({
    method: 'POST',
    url: `${ROOT_URL}/user/parent`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function getChildClassList(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/room/child`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}

export function endClass(req) {
  return axios({
    method: 'GET',
    url: `${ROOT_URL}/room/close`,
    params: req.params ? req.params : null,
    headers: req.headers ? req.headers : null,
  });
}
