fetch("https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10")
    .then((fetchData) => {
        return fetchData.json()
    })
    .then((jsonData) => {
        jsonData.items.forEach(element => {
            gerarConteudo(element.titulo,
                "https://agenciadenoticias.ibge.gov.br/" + JSON.parse(element.imagens).image_intro,
                element.introducao, null, element.editorias)
        });
    })

function gerarConteudo(titulo, imagem, introducao, data, hashtag) {
    const ul = document.getElementById("lista-noticias")
    const li = document.createElement("li")
    const div = document.createElement("div")
    div.classList.add("div-imagem-noticia")
    const div2 = document.createElement("div")
    div2.classList.add("div-introducao-noticia")
    const div3 = document.createElement("div")
    div3.classList.add("div-informacao-noticia")
    const img = document.createElement("img")
    const h2 = document.createElement("h2")
    const p = document.createElement("p")
    const p2 = document.createElement("p")
    const p3 = document.createElement("p")
    const button = document.createElement("button")
    button.id = "button-leia-mais"
    img.src = imagem
    h2.textContent = titulo
    p.textContent = introducao
    p2.textContent = "#" + hashtag
    p3.textContent = "Publicado hoje"
    button.textContent = "Leia mais"
    div3.appendChild(p2)
    div3.appendChild(p3)
    div.appendChild(img)
    div2.appendChild(h2)
    div2.appendChild(p)
    div2.appendChild(div3)
    div2.appendChild(button)
    div.appendChild(div2)
    li.appendChild(div)
    ul.appendChild(li)
}