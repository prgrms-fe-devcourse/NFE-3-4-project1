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
