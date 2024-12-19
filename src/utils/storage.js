// localStorage를 다루기 위한 유틸리티 함수
// 데이터를 안전하게 저장, 불러오기, 삭제하는 기능

// Web Storage API의 localStorage 객체
// 데이터를 문자열 형식으로 저장하고, 브라우저를 닫아도 유지
const storage = window.localStorage;

// key: localStorage에서 값을 불러올 키 이름
// defaultValue: 해당 키에 값이 없거나 오류가 발생했을 때 반환할 기본값
export const getItem = (key, defaultValue) => {
  try {
    // 해당 키의 값을 가져옴옴
    const storedValue = storage.getItem(key);

    // 값이 존재하면 JSON.parse를 사용해 문자열을 객체나 원시값으로 변환
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    // 오류
    return defaultValue;
  }
};

// key: 저장할 키 이름
// value: 저장할 데이터
export const setItem = (key, value) => {
  // JSON.stringify(value) : 값을 문자열로 변환하고,
  // storage.setItem를 호출해서 localStorage에 데이터를 저장
  storage.setItem(key, JSON.stringify(value));
};

// key: 삭제할 키 이름
export const removeItem = (key) => {
  // 해당 키의 데이터를 localStorage에서 삭제
  storage.removeItem(key);
};
