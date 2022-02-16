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
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                this.seoClusterData = JSON.parse(xhr.responseText);
                // console.log(xhr.responseText);
                // console.log(this.seoClusterData);
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
        this.innerHTML = "";
        const title = document.createElement("h2");
        title.innerHTML = "SEO Cluster App";
        this.appendChild(title);
        this.seoClusterData.forEach(e => {
            const el = document.createElement('seo-cluster');
            el.setData(e);
            this.appendChild(el);
        });
    }
}
export class SeoCluster extends HTMLElement {
    connectedCallback() {
        // this.render();
    }
    setData(data) {
        this.data = data;
        this.render();
    }
    render() {
        // this.innerHTML = this.data["Cluster Name"] +
        //     " " + this.data["Cluster Members"].length +
        //     " " + this.data["Competition Level"] +
        //     " " + this.data["Volume Category"] +
        //     " " + this.data["Number of Pages"]            
        // ;
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
        ].forEach(text => {
            const li = document.createElement("li");
            li.innerText = text;
            infoList.appendChild(li);
        });
        // "Cluster Members" - Expandable list widget
        //    perhaps with links, filtering, sorting, scrolling
        //  "Cluster Tree" - Monospace text based on current data
        //    preferably hierarchical structured data
    }
}
