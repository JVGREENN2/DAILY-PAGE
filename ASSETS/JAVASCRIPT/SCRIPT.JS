// SELECIONA TODAS AS ABAS E CONTEÚDOS
const tabs = document.querySelectorAll('.TAB'); // SELECIONA ABAS NO SIDEBAR
const tabContents = document.querySelectorAll('.tab-content');
// ADICIONA EVENTO DE CLIQUE PARA CADA ABA
tabs.forEach(tab => {
   tab.addEventListener('click', () => {
        // REMOVE A CLASSE ATIVA DE TODAS AS ABAS
        tabs.forEach(tab => tab.classList.remove('active-tab'));
        // REMOVE A CLASSE ATIVA DE TODOS OS CONTEÚDOS
        tabContents.forEach(content => content.classList.remove('active'));
        // ADICIONA A CLASSE ATIVA NA ABA CLICADA
        tab.classList.add('active-tab');
        //ADICIONA A CLASSE ATIVA NO CONTEÚDO CORRESPONDENTE
        const target = tab.getAttribute('data-tab')
        document.getElementById(target).classList.add('active');
    });
});