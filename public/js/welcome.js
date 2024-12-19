// welcome.js

import axiosInstance from "./axiosInstance.js";

function updateTimeCalc(updateAt){
  const updateDate = new Date(updateAt);
  const now = new Date();
  const diffMs = now - updateDate;

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
      return '방금 전';
  } else if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
  } else {
      return `${diffDays}일 전`;
  }
}

async function render(path, query){
  let userName = "사용자"
  const response = await axiosInstance.get(`/documents`);

  if(response.status !== 200) {
    return "응답 실패";
  }

  userName = response.config.headers["x-username"];
  let documents = await response.data;

  //최근에 변경한 문서
  let latestDocs = documents
                  .sort((a, b)=>new Date(b.updatedAt) - new Date(a.updatedAt))
                  .slice(0,5);

  latestDocs = await Promise.all(
    latestDocs.map(async (doc)=>{
      try {
        const docData = await axiosInstance.get(`/documents/${doc.id}`);
        return{
          ...doc, content : docData.data.content
        }
      }catch(err){
        console.error(`${doc.id}를 가지고 오다 문제가 생겼습니다.`);
        return{
          ...doc, content : "Loading Error"
        }
      }
    })
  )
  
  return `
    <div id="welcomeContents" class="my-5 mx-auto text-left col-lg-10">
        <h2 class="fw-semibold text-center mb-4">${userName}님, 안녕하세요.</h2>
        <div class="my-4">
          <p class="fs-6"><i class="bi bi-clock-history fs-6"></i> <span class="ms-1">최근 파일</span></p>
          <div class="d-grid gap-2">
          ${
            latestDocs.map((doc, idx)=>{
              return `
              <div class="list border rounded-2 p-3 col" data-id="${doc.id}">
                  <h6 class="text-truncate">${doc.title}</h6>
                  <blockquote class="mb-1 fs-6 fw-light lh-sm">${doc.content.replace(/<[^>]+>/g,"").slice(0,500)}</blockquote>
                  <span class="updated">${updateTimeCalc(doc.updatedAt)}</span>
              </div>`
            }).join("")
          }
          </div>
        </div>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button id="write1" type="button" class="btn btn-lg px-4 gap-3 fs-6">글쓰기</button>
          </div>
    </div>`;
}

export default render;