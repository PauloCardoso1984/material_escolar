// BANCO DE DADOS INTEGRADO: 6º ANO EF ATÉ O 3º ANO EM (70 Temas Mapeados)
const dadosEscolares = [
    { 
        id: "6ano", 
        nome: "6º Ano do Ensino Fundamental", 
        temas: ["Sistema de Numeração", "Operações Básicas", "Frações", "Números Decimais", "Geometria Plana", "Medidas de Tempo e Espaço", "Múltiplos e Divisores", "Porcentagem Inicial", "Introdução à Álgebra", "Gráficos de Barras e Tabelas"] 
    },
    { 
        id: "7ano", 
        nome: "7º Ano do Ensino Fundamental", 
        temas: ["Números Inteiros", "Números Racionais", "Equações do 1º Grau", "Proporcionalidade", "Regra de Três", "Ângulos e Retas", "Simetria no Plano Cartesiano", "Áreas de Polígonos Básicos", "Probabilidade Básica", "Estatística e Organização de Dados"] 
    },
    { 
        id: "8ano", 
        nome: "8º Ano do Ensino Fundamental", 
        temas: ["Potenciação e Radiciação", "Notação Científica", "Expressões Algébricas", "Monômios e Polinômios", "Produtos Notáveis", "Sistemas de Equações", "Triângulos e Quadriláteros", "Transformações Geométricas", "Pesquisa Estatística e Amostragem", "Princípio Multiplicativo de Contagem"] 
    },
    { 
        id: "9ano", 
        nome: "9º Ano do Ensino Fundamental", 
        temas: ["Números Reais", "Propriedades dos Radicais", "Equações do 2º Grau", "Funções Afins", "Teorema de Tales", "Teorema de Pitágoras", "Trigonometria no Triângulo Retângulo", "Volumes de Prismas e Cilindros", "Probabilidade Amostral", "Análise de Gráficos e Tabelas Complexas"] 
    },
    { 
        id: "1em", 
        nome: "1º Ano do Ensino Médio", 
        temas: ["Conjuntos Numéricos e Lógica", "Função Afim Avançada", "Função Quadrática e Gráficos", "Função Exponencial", "Logaritmos e Propriedades", "Progressão Aritmética (PA)", "Progressão Geométrica (PG)", "Semelhança de Figuras e Triângulos", "Geometria Espacial de Posição", "Estatística Descritiva e Medidas de Tendência"] 
    },
    { 
        id: "2em", 
        nome: "2º Ano do Ensino Médio", 
        temas: ["Trigonometria na Circunferência", "Funções Trigonométricas", "Matrizes e Operações", "Determinantes e Propriedades", "Sistemas Lineares e Discussão", "Análise Combinatória", "Probabilidade Condicional e Eventos", "Geometria Espacial: Prismas e Cilindros", "Geometria Espacial: Pirâmides e Cones", "Esferas e Partes da Esfera"] 
    },
    { 
        id: "3em", 
        nome: "3º Ano do Ensino Médio", 
        temas: ["Geometria Analítica: Ponto e Reta", "Geometria Analítica: Circunferência", "Polinômios e Operações", "Números Complexos", "Funções e Modelagem Matemática", "Noções Fundamentais de Limites", "Estatística Avançada para Vestibulares", "Cálculo e Matemática Financeira", "Revisão Geral: Álgebra e Aritmética", "Revisão Geral: Geometria Plana e Espacial"] 
    }
];

// MAPEAMENTO DOS LINKS ATUALIZADO:
// Arquivos locais rodam em tags <video>. Links externos do YouTube precisam do padrão "/embed/".
const linksDosVideos = {
    "Sistema de Numeração": "videos/SISTEMA DE NUMERACAO DECIMAL.mp4",
    "Operações Básicas": "videos/OPERACOES_BASICAS.mp4",
    "Potenciação e Radiciação": "https://youtube-nocookie.com" // Link atualizado em formato embed para o player modal funcionar
};

// Inicialização segura após montagem do DOM
document.addEventListener("DOMContentLoaded", () => {
    const seriesContainer = document.getElementById('series-container');
    const modal = document.getElementById('content-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalVideo = document.getElementById('modal-video');
    const modalActivitiesList = document.getElementById('modal-activities-list');

    if (!seriesContainer || !modal || !closeModalBtn) {
        console.error("Erro estrutural interno detectado.");
        return;
    }

    // Renderiza os blocos correspondentes de cada série na página
    function renderizarSite() {
        seriesContainer.innerHTML = "";

        dadosEscolares.forEach(serie => {
            const section = document.createElement('section');
            section.className = `serie-container color-${serie.id}`;
            
            const title = document.createElement('h2');
            title.className = 'serie-title';
            title.innerText = serie.nome;
            section.appendChild(title);
            
            const grid = document.createElement('div');
            grid.className = 'themes-grid';
            
            serie.temas.forEach((nomeTema, index) => {
                const button = document.createElement('button');
                button.className = `theme-button color-${serie.id}`;
                button.innerHTML = `<span>${index + 1}. ${nomeTema}</span> ➔`;
                
                button.onclick = () => abrirModal(serie.id, serie.nome, nomeTema, index + 1);
                grid.appendChild(button);
            });
            
            section.appendChild(grid);
            seriesContainer.appendChild(section);
        });
    }

    // Preenche e exibe a janela modal com as listas de arquivos e videoaulas tratadas
    function abrirModal(serieId, serieNome, nomeTema, numeroTema) {
        modalTitle.innerText = `${serieNome} ➜ ${nomeTema}`;
        
        // CORREÇÃO DINÂMICA: Busca a chave exata correspondente ao tema clicado
        const videoLink = linksDosVideos[nomeTema] || "https://youtube.com";
        modalVideo.src = videoLink; 

        modalActivitiesList.innerHTML = "";
        
        // Laço lógico para estruturar os 20 botões direcionados aos arquivos em PDF
        for (let i = 1; i <= 20; i++) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            // CORREÇÃO AQUI: Verifica de forma dinâmica as especificações do arquivo sem travar o loop
            if (serieId === "6ano" && numeroTema === 1 && i === 1) {
                // 6º Ano - Tema 1 (Sistema de Numeração) - Atividade 1
                a.href = `pdfs/${serieId}/tema${numeroTema}/SN_Atividade_1.pdf`;

            } else if (serieId === "6ano" && numeroTema === 1 && i === 2) {
                // 6º Ano - Tema 1 (Sistema de Numeração) - Atividade 3
                a.href = `pdfs/${serieId}/tema${numeroTema}/SN_Atividade_2.pdf`;

            } else if (serieId === "7ano" && numeroTema === 1 && i === 1) {
                // 7º Ano - Tema 1 (Números Inteiros) - Atividade 1
                a.href = `pdfs/${serieId}/tema${numeroTema}/NI_Atividade_1.pdf`;
                
            } else {
                // Todos os outros arquivos seguem o padrão automatizado
                a.href = `pdfs/${serieId}/tema${numeroTema}/atividade${i}.pdf`;
            }
            
            a.target = "_blank"; 
            a.innerText = `📄 Abrir PDF - Atividade ${i}`;
            
            li.appendChild(a);
            modalActivitiesList.appendChild(li);
        }
        
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; 
    }

    function fecharModal() {
        modal.style.display = "none";
        modalVideo.src = ""; // Reseta o player anulando vazamento de áudio
        document.body.style.overflow = "auto";
    }

    closeModalBtn.onclick = fecharModal;
    window.onclick = function(event) {
        if (event.target == modal) { fecharModal(); }
    }

    renderizarSite();
});
