class SeoCluster extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = "SEO Cluster"
    }
}

export { SeoCluster }