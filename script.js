const dados = fetch("http://127.0.0.1:5500/dados.json")
    .then(r => { return r.json() })

const StructureDados = []
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

meses.forEach(mes => {
    StructureDados.push({
        mes: mes,
        valor: 0,
        qtdMes: 0
    });
});

const StructureGrafico = {
    grafico: "grafico",
    dados: "dados"
}


ReceitaMeses = JSON.parse(JSON.stringify(StructureDados))
DespesaMeses = JSON.parse(JSON.stringify(StructureDados))
graficos = []

const gerarGraficos = async () => {
    const allDados = await dados;
    const receitas = []
    const despesas = []

    allDados.forEach(dado => {
        if (dado.natureza === 0) {
            dado.natureza = "despesa"
            despesas.push(dado)
        } else {
            receitas.push(dado)
            dado.natureza = "lucro"
        }
    });

    //Preenche dados para posição
    dataTabelaMes(despesas, DespesaMeses)
    dataTabelaMes(receitas, ReceitaMeses)

    const ctx = document.getElementById('tabela');
    const ctx1 = document.getElementById('linha');
    const ctx2 = document.getElementById('linhaValor');

    const graficoValores = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Lucro',
                    data: ReceitaMeses.map(a => a.valor),
                    borderWidth: 1
                },
                {
                    label: 'Despesa',
                    data: DespesaMeses.map(a => a.valor),
                    borderWidth: 1
                }
            ],
        },
        options: {
            parsing: {
                xAxisKey: 'id',
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        }
    });

    const graficoQuantidade = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Lucro',
                    data: ReceitaMeses.map(a => a.qtdMes),
                    borderWidth: 1
                },
                {
                    label: 'Despesa',
                    data: DespesaMeses.map(a => a.qtdMes),
                    borderWidth: 1
                }
            ],
        },
        options: {
            parsing: {
                xAxisKey: 'id',
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        }
    });
    const graficoValorLinha = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [
                {
                    label: 'Lucro',
                    data: ReceitaMeses.map(a => a.valor),
                    borderWidth: 1
                },
                {
                    label: 'Despesa',
                    data: DespesaMeses.map(a => a.valor),
                    borderWidth: 1
                }
            ],
        },
        options: {
            parsing: {
                xAxisKey: 'id',
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        }
    });

    let conteudoGraficoQuantidade = JSON.parse(JSON.stringify(StructureGrafico))
    let conteudoGraficoValores = JSON.parse(JSON.stringify(StructureGrafico))
    let conteudoGraficoValoresLinha = JSON.parse(JSON.stringify(StructureGrafico))

    conteudoGraficoQuantidade.grafico = graficoQuantidade
    conteudoGraficoQuantidade.dados = [ReceitaMeses.map(a => a.qtdMes), DespesaMeses.map(a => a.qtdMes)]

    conteudoGraficoValores.dados = [ReceitaMeses.map(a => a.valor), DespesaMeses.map(a => a.valor)]
    conteudoGraficoValores.grafico = graficoValores
    
    conteudoGraficoValoresLinha.dados = [ReceitaMeses.map(a => a.valor), DespesaMeses.map(a => a.valor)]
    conteudoGraficoValoresLinha.grafico = graficoValorLinha

    graficos.push(conteudoGraficoQuantidade, conteudoGraficoValores, conteudoGraficoValoresLinha)

};
gerarGraficos()

function dataTabelaMes(listData, tabela) {
    listData.forEach(data => {
        const posicao = meses.indexOf(data.mes);
        tabela[posicao].valor += data.valor;
        tabela[posicao].qtdMes += 1;
    });
}

function changeGraphicsLabel(label) {
    if (label !== "Todos") {
        graficos.forEach(infoGrafico => {
            infoGrafico.grafico.config.data.labels = meses;
            let mes = infoGrafico.grafico.config.data.labels.indexOf(label)
            infoGrafico.grafico.config.data.labels = [label];

            infoGrafico.grafico.config.data.datasets.forEach((dataset, index) => {
                let dados = infoGrafico.dados[index]
                dataset.data = [dados[mes]]
            });
            infoGrafico.grafico.update()
        });
    } else {
        graficos.forEach(infoGrafico => {
            infoGrafico.grafico.config.data.labels = meses;
            infoGrafico.grafico.config.data.datasets.forEach((dataset, index) => {
                dataset.data = infoGrafico.dados[index]
            });
            infoGrafico.grafico.update()
        })
    }

}
function changeGraphicsByDataset(natureza) {
    console.log(natureza);
    graficos.forEach(infoGrafico => {
        const isDataShown = infoGrafico.grafico.isDatasetVisible(natureza)
        if (natureza != "") {
            if (isDataShown === false) {
                infoGrafico.grafico.show(natureza);
            }
            if (isDataShown === true) {
                infoGrafico.grafico.hide(natureza);
            }
        }
        infoGrafico.grafico.update()
    });
}
const inputMes = document.getElementById("mes");
const inputNaturezas = document.querySelectorAll(".natureza");

inputNaturezas.forEach(inputNatureza => {
    inputNatureza.addEventListener("change", function () {
        changeGraphicsByDataset(this.value);
    })
});

inputMes.addEventListener("change", function () {
    changeGraphicsLabel(this.value);
})
