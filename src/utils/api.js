// replace는 경로를 변경하는 함수입니다.
// 일반적으로 SPA(Single Page Application)에서 페이지를 리다이렉션하는 데 사용

import { replace } from "./router.js";

// API 호출의 기본 URL 로 사용됨
// 호출시 경로 url를 이 값에 추가해서 최종 API URL 을 생성합니다
// ex ) API_END_POINT가 "https://kdt-api.fe.dev-cos.com"이고,
// url이 "/items"라면 최종 호출 URL은 "https://kdt-api.fe.dev-cos.com/items"
export const API_END_POINT = "https://kdt-api.fe.dev-cos.com";

// fetch 함수를 사용하여 API를 호출
// URL은 API_END_POINT와 url을 합쳐서 생성
// options를 확장하여 추가 옵션을 포함
// 기본 헤더로 Content-Type: application/json과 x-username: username이 설정
export const request = async (url, options = {}, username = "dhs0000") => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": username,
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리중 뭔가 이상합니다!");
    // /로 리다이렉션하여 사용자를 기본 페이지로 돌려보냄
  } catch (e) {
    alert(e);
    replace("/");
  }
};
