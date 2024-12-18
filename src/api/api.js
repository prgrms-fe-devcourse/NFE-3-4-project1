// eslint-disable-next-line import/extensions
import ERROR from '../constants/Error.js';

const BASE_URL = 'https://kdt-api.fe.dev-cos.com/documents';
const USER_ID = '4/5_TEAM5-user';

// 새로운 Document 생성
// eslint-disable-next-line consistent-return
export async function generateDocument(parent) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-username': USER_ID,
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
        'x-username': USER_ID,
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

// 특정 id를 가진 Doc 조회
export async function getSelectedDocument(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-username': USER_ID,
      },
    });
    if (!response.ok) {
      throw new ERROR(response);
    }
  } catch (err) {
    const { statusCode, error, message } = err;
    console.log(ERROR.GET_SELECTED_DOCUMENT);
    console.log(`${statusCode} - ${error} : ${message}`);
  }
}

// API의 /documents 엔드포인트에서 문서 목록을 가져옴
export async function getDocuments() {
  const result = await fetch(BASE_URL, {
    headers: {
      'x-username': USER_ID,
    },
  })
    .then(response => response.json())
    .then(data => data);
  return result;
}
