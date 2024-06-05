const urlSearchParams = new URLSearchParams(location.search)
const paginaAtual = parseInt(urlSearchParams.get("page")) || 0
console.log(paginaAtual)

insereNoticiasNaPagina()

const listaPaginacao = document.getElementById("paginacao")
if (paginaAtual == 0 || (paginaAtual > 0 && paginaAtual < 6))
    for (let i = 1; i < 11; i++)
        listaPaginacao.appendChild(criaBotaoPaginacao(i))
else
    for (let i = paginaAtual - 4; i < paginaAtual + 6; i++)
        listaPaginacao.appendChild(criaBotaoPaginacao(i))

if (paginaAtual == 0) {
    history.pushState(null, null, window.location.pathname + "?qtd=10")
    document.getElementById("1").disabled = true
} else
    document.getElementById(paginaAtual).disabled = true

function insereNoticiasNaPagina() {
    let quantidadeNoticias = (paginaAtual > 1 ? urlSearchParams.get("qtd") * paginaAtual : urlSearchParams.get("qtd"))
    fetch(`https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=${quantidadeNoticias || 10}`)
        .then((fetchData) => {
            return fetchData.json()
        })
        .then((jsonData) => {
            jsonData.items.forEach(element => {
                if (quantidadeNoticias > 10)
                    quantidadeNoticias--
                else
                    gerarConteudo(
                        element.titulo,
                        "https://agenciadenoticias.ibge.gov.br/" +
                        JSON.parse(element.imagens).image_intro,
                        element.introducao,
                        element.data_publicacao,
                        element.editorias,
                        element.link)
            });
        })

    function gerarConteudo(titulo, imagem, introducao, data, editoria, link) {
        const ul = document.getElementById("lista-noticias")
        const li = document.createElement("li")
        const div = document.createElement("div")
        div.classList.add("div-imagem-noticia")
        const div2 = document.createElement("div")
        const div3 = document.createElement("div")
        div3.classList.add("div-informacao-noticia")
        const img = document.createElement("img")
        const h2 = document.createElement("h2")
        const p = document.createElement("p")
        const p2 = document.createElement("p")
        const p3 = document.createElement("p")
        const a = document.createElement("a")
        const button = document.createElement("button")
        button.id = "button-leia-mais"
        a.href = link
        button.textContent = "Leia mais"
        a.appendChild(button)
        img.src = imagem
        h2.textContent = titulo
        p.textContent = introducao
        p2.textContent = "#" + editoria
        p3.textContent = retornaDiferencaData(data)
        div3.appendChild(p2)
        div3.appendChild(p3)
        div.appendChild(img)
        div2.appendChild(h2)
        div2.appendChild(p)
        div2.appendChild(div3)
        div2.appendChild(a)
        div.appendChild(div2)
        li.appendChild(div)
        ul.appendChild(li)
    }
}

function retornaDiferencaData(data) {
    const dataAtual = new Date().toLocaleString('pt-BR', { timezone: 'UTC' }).replace(",", "")
    let dataPublicacao = ""
    let horaPublicacao = ""
    for (let i = 0; i < 10; i++) {
        if (i < 9)
            dataPublicacao += data[i]
        horaPublicacao += data[i + 9]
    }

    var diferenca = moment(dataAtual, "DD/MM/YYYY HH:mm:ss").diff(moment(data, "DD/MM/YYYY HH:mm:ss"))
    diferencaTempo = Math.floor(moment.duration(diferenca).asDays())

    if (diferencaTempo == 1)
        diferencaTipo = "dia"
    else if (diferencaTempo > 1) {
        if (diferencaTempo < 30)
            diferencaTipo = "dias"
        else {
            diferencaTempo = Math.floor(moment.duration(diferenca).asMonths())
            diferencaTipo = (diferencaTempo == 1 ? "mes" : "meses")
        }
    } else {
        diferencaTempo = Math.floor(moment.duration(diferenca).asHours())
        if (diferencaTempo < 1) {
            diferencaTempo = Math.floor(moment.duration(diferenca).asMinutes())
            if (diferencaMinutos < 1) {
                diferencaTempo = diferencaMeses = Math.floor(moment.duration(diferenca).asSeconds())
            }
        } else {
            diferencaTipo = (diferencaTempo == 1 ? "hora" : "horas")
        }

    }
    return "Publicado há " + diferencaTempo + " " + diferencaTipo
}

function atualizaPage(pagina) {
    window.location.href = window.location.pathname + `?qtd=10&page=${pagina}`
}

function criaBotaoPaginacao(id) {
    const li = document.createElement("li")
    const botao = document.createElement("button")
    botao.id = id
    botao.textContent = id
    botao.onclick = function () { atualizaPage(id); };
    li.appendChild(botao)
    return li
}