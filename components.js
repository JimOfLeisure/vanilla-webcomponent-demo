export class SeoClusterApp extends HTMLElement {
    connectedCallback() {
        this.seoClusterData = [{
              "Seed Keyword Distribution" : "",
              "Cluster Name" : "",
              "Cluster Size" : 0,
              "Cluster Members" : [""],
              "Cluster Tree" : "",
              "Competition Level" : "",
              "Volume Category" : "",
              "Number of Pages" : 0
            }];
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                this.seoClusterData = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
                console.log(this.seoClusterData);
                this.render();
            } else {
                console.log(xhr);
            }
        }
        
        xhr.onerror = e => {
            console.log(e);
        }
                xhr.open('GET', "/data/data.json");
        xhr.send();
        this.render();
    }
    render() {
        this.innerHTML = "SEO Cluster App";
        this.seoClusterData.forEach(e => {
            let el = document.createElement('seo-cluster');
            el.setAttribute('data-cluster-name', e["Cluster Name"]);
            this.appendChild(el);
        });
    }
}
export class SeoCluster extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = this.getAttribute('data-cluster-name');
    }
}
