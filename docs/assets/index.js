const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
var style = "";
class SeoClusterApp extends HTMLElement {
  connectedCallback() {
    this.seoClusterData = [{
      "Seed Keyword Distribution": "",
      "Cluster Name": "",
      "Cluster Size": 0,
      "Cluster Members": [""],
      "Cluster Tree": "",
      "Competition Level": "",
      "Volume Category": "",
      "Number of Pages": 0
    }];
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        this.seoClusterData = JSON.parse(xhr.responseText);
        this.render();
      } else {
        console.log(xhr);
      }
    };
    xhr.onerror = (e) => {
      console.log(e);
    };
    xhr.open("GET", "./data/data.json");
    xhr.send();
    this.render();
  }
  render() {
    this.innerHTML = "";
    const title = document.createElement("h2");
    title.innerHTML = "SEO Cluster App";
    this.appendChild(title);
    this.seoClusterData.forEach((e) => {
      const el = document.createElement("seo-cluster");
      el.setData(e);
      this.appendChild(el);
    });
  }
}
class SeoCluster extends HTMLElement {
  connectedCallback() {
  }
  setData(data) {
    this.data = data;
    this.render();
  }
  render() {
    const title = document.createElement("h3");
    title.innerText = this.data["Cluster Name"];
    this.appendChild(title);
    const infoList = document.createElement("ul");
    this.appendChild(infoList);
    [
      this.data["Cluster Members"].length,
      this.data["Competition Level"],
      this.data["Volume Category"],
      this.data["Number of Pages"]
    ].forEach((text) => {
      const li = document.createElement("li");
      li.innerText = text;
      infoList.appendChild(li);
    });
  }
}
window.customElements.define("seo-cluster-app", SeoClusterApp);
window.customElements.define("seo-cluster", SeoCluster);
