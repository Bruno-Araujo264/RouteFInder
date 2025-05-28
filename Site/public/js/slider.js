const body = document.querySelector("body"),
    sidebar = document.querySelector(".sidebar"),
    barDireita = document.querySelector(".barra-direita"),
    toggle = document.querySelector(".toggle"),
    alternar = document.querySelector(".alternar"),
    searchBtn = document.querySelector(".search-box"),
    modeSwitch = document.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text"),
    dash = body.querySelector(".home"),
    pesquisar = body.querySelector(".search-box");

// fechando a barra de navegador da esquerda
sidebar.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

pesquisar.addEventListener("click", () => {
    sidebar.classList.add("close");
});

dash.addEventListener("click", () => {
    sidebar.classList.add("close")
});

// pegando o classe 'toggle-switch', altere a classe dele para 'dark'
modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light Mode"
    } else {
        modeText.innerText = "Dark Mode"
    }
});

sidebar.addEventListener("click", () => {
    sidebar.classList.toggle("close");
}); 

dash.addEventListener("click", () => {
    barDireita.classList.add("fechar")
});

barDireita.addEventListener("click", () => {
    barDireita.classList.toggle("fechar");
})