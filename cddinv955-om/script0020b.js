// Função para calcular o custo de Turnover
function calcularTurnover(quantidadeFuncionarios, salarioMedio) {
    return salarioMedio * 2 * 2 * (quantidadeFuncionarios * 0.45) + (quantidadeFuncionarios * 0.45) * 2 * salarioMedio;
}

// Função para calcular o custo de Absenteísmo
function calcularAbsentismo(quantidadeFuncionarios, salarioMedio) {
    return (quantidadeFuncionarios * 251 * 0.07) * ((salarioMedio * 12) / 251);
}

// Função para calcular o custo de Saúde
function calcularCustoSaude(quantidadeFuncionarios, salarioMedio) {
    return (quantidadeFuncionarios * salarioMedio * 0.1) * 12 * 1.15;
}

// Função para calcular o investimento
function calcularInvestimento(quantidadeFuncionarios) {
    return 6.15 * 12 * quantidadeFuncionarios;
}

// Função para calcular o retorno
function calcularRetorno(quantidadeFuncionarios, salarioMedio) {
    const turnover = calcularTurnover(quantidadeFuncionarios, salarioMedio);
    const investimento = calcularInvestimento(quantidadeFuncionarios);
    const fatorCusto = calcularFatorCusto(quantidadeFuncionarios);
    return 6.15 * 12 * quantidadeFuncionarios * 2.73 + 6.15 * 12 * quantidadeFuncionarios * 4.3 + turnover * 0.25;
}

// Função para calcular o fator de custo
function calcularFatorCusto(quantidadeFuncionarios) {
    if (quantidadeFuncionarios < 100) return 6.5;
    else if (quantidadeFuncionarios >= 100 && quantidadeFuncionarios < 500) return 6.5 - 0.049 * (quantidadeFuncionarios - 100) / 10;
    else if (quantidadeFuncionarios == 500) return 4.7;
    else if (quantidadeFuncionarios > 500 && quantidadeFuncionarios < 1000) return 4.7 - 0.016 * (quantidadeFuncionarios - 500) / 10;
    else if (quantidadeFuncionarios == 1000) return 3.9;
    else if (quantidadeFuncionarios > 1000 && quantidadeFuncionarios < 5000) return 3.9 - 0.003 * (quantidadeFuncionarios - 1000) / 10;
    else if (quantidadeFuncionarios == 5000) return 2.92;
    else if (quantidadeFuncionarios > 5000 && quantidadeFuncionarios < 10000) return 2.92 - 0.0013 * (quantidadeFuncionarios - 5000) / 10;
    else if (quantidadeFuncionarios == 10000) return 2.49;
    else return 2.49 - 0.00006 * (quantidadeFuncionarios - 10000) / 10;
}

// Função para calcular o ROI final
function calcularROI(quantidadeFuncionarios, salarioMedio) {
    const retorno = calcularRetorno(quantidadeFuncionarios, salarioMedio);
    const investimento = calcularInvestimento(quantidadeFuncionarios);
    const fatorCusto = calcularFatorCusto(quantidadeFuncionarios);
    return retorno / (investimento * fatorCusto);
}
	
// Função para calcular o custo total
function calcularCustoTotal(quantidadeFuncionarios, salarioMedio) {
    const turnover = calcularTurnover(quantidadeFuncionarios, salarioMedio);
    const absentismo = calcularAbsentismo(quantidadeFuncionarios, salarioMedio);
    const custoSaude = calcularCustoSaude(quantidadeFuncionarios, salarioMedio);

    return turnover + absentismo + custoSaude;
}

// Função para atualizar o valor do label quando o slider é movido
function atualizarValor(value, labelId) {
    let label = document.getElementById(labelId);
    label.textContent = value;

    // Calcula a posição da caixa de diálogo
    let input = label.previousElementSibling;
    let newPosition = ((value - input.min) / (input.max - input.min)) * 100;
    label.style.left = `calc(${newPosition}% - (${label.offsetWidth / 2}px))`;
}
	
	        function spinButton(idInput, operator){
            const element = document.getElementById(idInput),
                maxVal = Number(element.getAttribute('max'));
                
            let value = Number(element.value);
            operator === 'minus' ? (value -= 1) : (value += 1);

            element.value = value < 0 ? 0 : value > maxVal ? maxVal : value;
            element.dispatchEvent(new Event('input'));
        }

// Função para pegar os valores dos inputs, calcular os resultados e exibir na página
function calcular() {
    let quantidadeFuncionarios = parseFloat(document.getElementById("quantidadeFuncionarios").value);
    let salarioMedio = parseFloat(document.getElementById("salarioMedio").value);

    let turnover = calcularTurnover(quantidadeFuncionarios, salarioMedio);
    let absentismo = calcularAbsentismo(quantidadeFuncionarios, salarioMedio);
    let custoSaude = calcularCustoSaude(quantidadeFuncionarios, salarioMedio);
    let roi = calcularROI(quantidadeFuncionarios, salarioMedio);
	
	// Calcula o custo total
    let custoTotal = calcularCustoTotal(quantidadeFuncionarios, salarioMedio);

    // Formatação em Reais
    document.getElementById("turnover").innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(turnover);
    document.getElementById("absentismo").innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(absentismo);
    document.getElementById("custoSaude").innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custoSaude);
	
		// Atualiza o custo total na página
    document.getElementById("custoTotal").innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custoTotal);

    // Arredondando o ROI para duas casas decimais e exibindo
    document.getElementById("roi").innerText = parseFloat(roi.toFixed(2)) + "x";
}

// Atualiza a posição inicial da caixa de diálogo quando a página é carregada
window.addEventListener("load", function () {
    atualizarValor(document.getElementById("quantidadeFuncionarios").value, "valorFuncionarios");
    atualizarValor(document.getElementById("salarioMedio").value, "valorSalario");
    calcular();  // Chamar a função calcular no carregamento da página para exibir os valores iniciais
});

// Chamar a função calcular quando os valores dos inputs mudarem
document.getElementById("quantidadeFuncionarios").addEventListener("input", calcular);
document.getElementById("salarioMedio").addEventListener("input", calcular);

// Atualiza a posição dos elementos ao redimensionar a janela
window.addEventListener('resize', function () {
    atualizarValor(document.getElementById("quantidadeFuncionarios").value, "valorFuncionarios");
    atualizarValor(document.getElementById("salarioMedio").value, "valorSalario");
});

// Manipuladores de eventos para os elementos <input type="range"> e botões
document.getElementById("salarioMedioRange").addEventListener("input", function () {
    document.getElementById("salarioMedio").value = this.value;
    calcular();
});

document.getElementById("quantidadeFuncionariosRange").addEventListener("input", function () {
    document.getElementById("quantidadeFuncionarios").value = this.value;
    calcular();
});

document.getElementById("salarioMedio").addEventListener("input", function () {
    document.getElementById("salarioMedioRange").value = this.value;
    calcular();
});

document.getElementById("quantidadeFuncionarios").addEventListener("input", function () {
    document.getElementById("quantidadeFuncionariosRange").value = this.value;
    calcular();
});

document.querySelectorAll(".arrow-up").forEach(function (button) {
    button.addEventListener("click", function () {
        let inputId = this.getAttribute("data-target");
        let input = document.getElementById(inputId);
        input.value = parseFloat(input.value) + 1;
        input.dispatchEvent(new Event("input"));
    });
});

document.querySelectorAll(".arrow-down").forEach(function (button) {
    button.addEventListener("click", function () {
        let inputId = this.getAttribute("data-target");
        let input = document.getElementById(inputId);
        input.value = parseFloat(input.value) - 1;
        input.dispatchEvent(new Event("input"));
    });
});
	
function calcXLine(id){
    const sizeElement = document.getElementById(id).offsetWidth, 
          valMinRange = Number(document.getElementById(id).min),
          valMaxRange = Number(document.getElementById(id).max),
          currentValInput = Number(document.getElementById(id).value),
          percentValue = ((currentValInput - valMinRange) * 100) / (valMaxRange - valMinRange),
          xlineBoxShadow = ((sizeElement * percentValue) / 100);

    document.getElementById(id).style.boxShadow = `inset ${xlineBoxShadow}px 0px 0px 0px #006A5B`;
}

document.getElementById('salarioMedioRange').addEventListener('input', function() {
    calcXLine('salarioMedioRange');
});
	
document.getElementById('quantidadeFuncionariosRange').addEventListener('input', function() {
    calcXLine('quantidadeFuncionariosRange');
});

document.addEventListener('DOMContentLoaded', function() {
    calcXLine('salarioMedioRange');
		calcXLine('quantidadeFuncionariosRange');
});
	



