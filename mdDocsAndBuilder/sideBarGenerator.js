function generateSidebarHTML(structure) {
  function renderItems(obj, level = 0, dataKey = "") {
    let html = `<ul class="level-${level}">`;
    for (const key in obj) {
      const value = obj[key];
      const isFolder = typeof value === "object";
      if (isFolder) {
        dataKey = dataKey + key + "/";
        html += `
          <li class="folder">
            <span class="folder-toggle" data-key-path=${dataKey}>${key}</span>
            ${renderItems(value, level + 1, dataKey)}
          </li>
        `;
      } else {
        html += `
          <li><a href="${value}" data-key-path=${dataKey + key}>${key}</a></li>
        `;
      }
    }

    html += `</ul>`;
    return html;
  }

  return `
    <div class="sidebar">
    <div class="sidebarHeader">
    <div class="sidebarLogoContainer">
    <img
    class="logo-phone"
    src="{cssAndJsFileLocation}assets/images/logo.svg"
    alt="logo"
    />
    <h1 class="sidebarTitle">CG Docs</h1>
    </div>
    <svg class="menuClose" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
    </div> 
      ${renderItems(structure)}
    </div>
  `;
}

export default generateSidebarHTML;
