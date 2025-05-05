const body = document.querySelector("body"),
    sidebar = document.querySelector(".sidebar"),
    barDireita = document.querySelector(".barra-direita"),
    toggle = document.querySelector(".toggle"),
    alternar = document.querySelector(".alternar"),
    searchBtn = document.querySelector(".search-box"),
    modeSwitch = document.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text"),
    dash = body.querySelector(".home");

// fechando a barra de navegador da esquerda
toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
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

dash.addEventListener("click", () => {
    sidebar.classList.add("close")
});

dash.addEventListener("click", () => {
    barDireita.classList.add("fechar")
});

barDireita.addEventListener("click", () => {
    barDireita.classList.toggle("fechar");
})