import axiosInstance from "./axiosInstance.js";

const maxPathSize = 4;

function FindPath(current, target) {
  if(current.id == target) return [ current ];
  if(!current.documents) return [];
  let results = [];
  current.documents.some(e => {
    let temp = FindPath(e, target);
    if(temp.length > 0){
      results.push(...temp);
      return true;
    }
  });
  if(results.length > 0) results.unshift(current);
  return results;
}

async function render(data) {
  //TODO: Switch to custom Network API
  const response = await axiosInstance.get(`/documents`);
  let fakeRoot = { id: -1, documents: response.data, title: "Home" };
  let traverse = FindPath(fakeRoot, data.id);
  
  let header = `<nav aria-label="breadcrumb"> <ol class="breadcrumb breadcrumb-chevron p-3 rounded-3">`;
  let footer = `</ol> </nav>`;
  let content = ``;
  switch(true){
    case traverse.length <= maxPathSize:
      traverse.slice(0, -1).forEach((e)=>{
        let id = (e.id === -1 ? '/' : '/app/' + e.id);
        content += `<li class="breadcrumb-item">
                      <div class="pe-auto" onclick="navigater('${id}');">${e.title}</div>
                    </li>`;
      });
      break;
    case traverse.length > maxPathSize:
      traverse.slice(0, 1).forEach((e)=>{
        let id = (e.id === -1 ? '/' : '/app/' + e.id);
        content += `<li class="breadcrumb-item">
                      <div class="pe-auto" onclick="navigater('${id}');">${e.title}</div>
                    </li>`;
      });
      content += `<li class="breadcrumb-item">...</li>`;
      traverse.slice(-2, -1).forEach((e)=>{
        let id = (e.id === -1 ? '/' : '/app/' + e.id);
        content += `<li class="breadcrumb-item">
                      <div class="pe-auto" onclick="navigater('${id}');">${e.title}</div>
                    </li>`;
      });
      break;
  }
  content += `<li id="breadcrumbTitle" class="breadcrumb-item active fw-bold" aria-current="page">${traverse.at(-1).title}</li>`;


  return header + content + footer;
}

export default render;