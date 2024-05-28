fetch("https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10")
    .then((fetchData) => {
        return fetchData.json()
    })
    .then((jsonData) => {
        jsonData.items.forEach(element => {
            gerarInformacao(element.titulo,
                "https://agenciadenoticias.ibge.gov.br/" + JSON.parse(element.imagens).image_intro,
                element.introducao)
            console.log()
        });
    })

function gerarInformacao(titulo, imagem, introducao) {
    const ul = document.getElementById("lista-noticias")
    const li = document.createElement("li")
    const div = document.createElement("div")
    const img = document.createElement("img")
    const h2 = document.createElement("h2")
    const p = document.createElement("p")
    img.src = imagem
    h2.textContent = titulo
    p.textContent = introducao
    div.appendChild(img)
    div.appendChild(h2)
    div.appendChild(p)
    li.appendChild(div)
    ul.appendChild(li)
}