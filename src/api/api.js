// eslint-disable-next-line import/extensions
import ERROR from '../constants/Error.js';

const BASE_URL = 'https://kdt-api.fe.dev-cos.com/documents';

// 새로운 Document 생성
// eslint-disable-next-line consistent-return
export async function generateDocument(parent) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-username': '4/5_TEAM5-user',
      },
      body: JSON.stringify({
        title: '시작하기',
        parent,
      }),
    });
    if (!response.ok) {
      throw new Error(response);
    }
    return response.json();
  } catch (err) {
    const { statusCode, error, message } = err;
    console.log(ERROR.POST_NEW_DOCUMENT);
    console.log(`${statusCode} - ${error} : ${message}`);
  }
}

export async function deleteDocument(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-username': '4/5_TEAM5-user',
      },
    });
    if (!response.ok) {
      throw new ERROR(response);
    }
  } catch (err) {
    const { statusCode, error, message } = err;
    console.log(ERROR.DELETE_DOCUMENT);
    console.log(`${statusCode} - ${error} : ${message}`);
  }
}

const API_URL = "https://kdt-api.fe.dev-cos.com";
const X_USERNAME_KEY = "blabla2";

// API의 /documents 엔드포인트에서 문서 목록을 가져옴
export async function getDocuments() {
  const result = await fetch(`${API_URL}/documents`, {
    headers: {
      "x-username": X_USERNAME_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  // FIXME: error 핸들링
  // .catch((err) => {
  //   console.error("API Error: ", err);
  // });

  return result;
}

// /documents 엔드포인트로 새로운 문서를 추가
// body: {"title": string, "content": string, "parent": null | number}
export async function postDocuments({ title, content, parent }) {
  const result = await fetch(`${API_URL}/documents`, {
    method: "post",
    body:  JSON.stringify({
      title,
      content,
      parent,
    }),
    headers: {
      "x-username": X_USERNAME_KEY,
      "Content-Type": "application/json"
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  // FIXME: error 핸들링
  // .catch((err) => {
  //   console.error("API Error: ", err);
  // });
}
