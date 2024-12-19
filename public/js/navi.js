// navi.js
import axiosInstance from "./axiosInstance.js";

window.addNewNote = async function addNewNote(parent) {
  const response = await axiosInstance.post("/documents", {
    title: "새 문서",
    parent,
  });

  const data = await response.data;

  navigater(`/app/${data.id}`);
};

window.deleteNote = async function deleteNote(id) {
  const response = await axiosInstance.delete(`/documents/${id}`);

  const data = await response.data;
  navigater(`${data.parent ? '/app/'+data.parent.id : "/"}`);
};

function renderMenuList(id, list) {
  let items = "";
  let isOpenCollapse = false;

  list.forEach((e) => {
    const { isOpen, child } = renderMenuList(id, e.documents);
    isOpenCollapse = isOpenCollapse || isOpen || e.id.toString() === id;

    items += `<li onclick="navigater('/app/${e.id}');"
     class="item-container btn btn-outline-light overflow-x-hidden overflow-y-hidden text-black d-block rounded border-0 text-start d-flex justify-content-between pe-1" style="height: 30px;">
      <div>
        <span type="button" id="collapse" data-bs-toggle="collapse" data-bs-target='#collapse${
          e.id
        }' aria-controls='collapse${e.id}' onclick="event.stopPropagation();">
          <i class="fa-regular fa-note-sticky" style="color: #5f5e5b;"></i>
          ${
            child.length > 0
              ? `<i class="fa-solid fa-chevron-down" style="color: #5f5e5b; width: 14px; font-size: small;"></i>`
              : `<i class="fa-regular fa-note-sticky" style="color: #5f5e5b;"></i>`
          }
        </span>
        <span id="${e.id}" class="nav-item-title">${e.title}</span>
      </div>
      <div class="d-flex document-control-btn">
        <button class="btn btn-outline-light d-block rounded border-0 py-0 px-1" onclick="event.stopPropagation(); deleteNote(${
          e.id
        })" style="font-size: small;">
          <i class="fa-regular fa-trash-can" style="color: #5f5e5b;"></i>
        </button>
        <button class="btn btn-outline-light d-block rounded border-0 py-0 px-1" onclick="event.stopPropagation(); addNewNote(${
          e.id
        })" style="font-size: small;">
          <i class="fa-solid fa-plus" style="color: #5f5e5b;"></i>
        </button>
      </div>
    </li>
    <div class="collapse ps-2 ${isOpen ? "show" : ""}" id='collapse${
      e.id
    }'>${child}</div>`;
  });

  return { isOpen: isOpenCollapse, child: items };
}

async function render(path, query) {
  const response = await axiosInstance.get("/documents");
  
  const header = `<div class="position-relative h-100">
        <div class="d-flex justify-content-between align-items-start w-100">
          <div class="w-80 link-body-emphasis text-decoration-none" onclick="navigater('/');" style="cursor:pointer;">
              <span class="fs-5 fw-semibold text-break">${response.config.headers["x-username"]}의 노션</span>
            </div>
          <button id="close" class="btn text-black d-block rounded border-sm pe-0 py-1">
                <i class="fa-solid fa-angles-left" style="color: #4f4f4f; pointer-events:none; font-size:small;"></i>
          </button>
        </div>
        <hr>
        <ul class="list-unstyled ps-0" >`;
  const end = `
      </ul>
      <button id="write" class="btn text-black d-block rounded border-0 position-absolute bottom-0 w-100 py-2">
        <i class="fa-sharp fa-regular fa-pen-to-square" style="color: #4f4f4f; pointer-events:none"></i> 새 페이지
      </button>
    </div>
  `;
  
  if (response.status !== 200) {
    return header + end;
  }

  const data = await response.data;
  const body = renderMenuList(path.split("/app/")[1], data).child;
  return header + body + end;
}

export default render;
