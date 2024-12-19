// History API와 커스텀 이벤트를 활용해 싱글 페이지 애플리케이션(SPA)의 라우팅을 구현
// SPA 라우팅 => URL을 변경하면서 페이지를 새로고침하지 않고 경로를 관리
// popstate를 통해 앞으로가기 뒤로가기 기능! 


// 라우팅 변경을 위한 커스텀 이벤트의 이름
const ROUTE_CHANGE_EVENT_NAME = 'route-change';
// 브라우저의 뒤로가기, 앞으로 가기 버튼 이벤트 감지
const POPSTATE_EVENT_NAME = 'popstate';

// onRoute: 경로가 변경된 후 실행할 콜백 함수로, 주로 화면을 업데이트한다. 
export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { pushUrl, replaceUrl } = e.detail;
    
    // pushUrl이 있으면 history.pushState로 URL을 변경
    pushUrl && history.pushState(null, null, pushUrl);

    // replaceUrl이 있으면 history.replaceState로 URL을 교체
    replaceUrl && history.replaceState(null, null, replaceUrl);

    // 페이지 렌더링이나 업데이트 실행
    onRoute(); 
  });
  // popstate 이벤트를 감지해 onRoute()를 실행
  // 뒤로 가기/앞으로 가기 버튼을 눌렀을 때 페이지를 다시 그리도록 함함
  window.addEventListener(POPSTATE_EVENT_NAME, () => {
    onRoute();
  });
};

// pushUrl 값을 받아 route-change 커스텀 이벤트를 발생
// initRouter에서 감지되어 history.pushState를 호출
// 새 URL로 이동하면서 브라우저의 히스토리 스택에 새로운 경로로를 추가
export const push = (pushUrl) => {
  window.dispatchEvent(
    new CustomEvent('route-change', {
      detail: {
        pushUrl,
      },
    })
  );
};

// replaceUrl 값을 받아 route-change 커스텀 이벤트를 발생
// initRouter에서 감지되면 history.replaceState가 호출됨
// 현재 URL(경로)을 교체하지만 브라우저의 히스토리 스택은 추가되지 않음음
export const replace = (replaceUrl) => {
  window.dispatchEvent(
    new CustomEvent('route-change', {
      detail: {
        replaceUrl,
      },
    })
  );
};

// replaceBack(): URL을 '/'로 교체한 후 이전 페이지로 돌아감감
export const replaceBack = () => {
  // // 현재 URL을 '/'로 교체
  // 히스토리 스택에 새로운 항목을 추가하지 않고 교체
  history.replaceState(null, null, '/');

  // 브라우저의 히스토리 스택에서 이전 페이지로 돌아갑
  // 뒤로 가되, URL은 '/'로 바뀜
  history.back();
};
