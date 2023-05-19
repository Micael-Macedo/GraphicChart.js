const ctx = document.getElementById('tabela');
const ctx1 = document.getElementById('linha');
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

    allDados.forEach(function (dado) {
        if (dado.natureza === 0) {
            dado.natureza = "despesa"
            despesas.push(dado)
        } else {
            receitas.push(dado)
            dado.natureza = "lucro"
        }
    });

    dataTabelaMes(despesas, DespesaMeses)
    dataTabelaMes(receitas, ReceitaMeses)

    graficoValores = new Chart(ctx, {
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
            }
        }
    });
    graficoQuantidade = new Chart(ctx1, {
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
            }
        }
    });
    let conteudoGraficoQuantidade = JSON.parse(JSON.stringify(StructureGrafico))
    let conteudoGraficoValores = JSON.parse(JSON.stringify(StructureGrafico))

    conteudoGraficoQuantidade.grafico = graficoQuantidade
    conteudoGraficoQuantidade.dados = [ReceitaMeses.map(a => a.qtdMes), DespesaMeses.map(a => a.qtdMes)]

    conteudoGraficoValores.dados = [ReceitaMeses.map(a => a.valor), DespesaMeses.map(a => a.valor)]
    conteudoGraficoValores.grafico = graficoValores

    graficos.push(conteudoGraficoQuantidade, conteudoGraficoValores)

};
gerarGraficos()


function dataTabelaMes(listData, tabela) {
    listData.forEach(data => {
        switch (data.mes) {
            case 'Janeiro':
                tabela[0].valor += data.valor
                tabela[0].qtdMes += 1
                break;
            case 'Fevereiro':
                tabela[1].valor += data.valor
                tabela[1].qtdMes += 1
                break;
            case 'Março':
                tabela[2].valor += data.valor
                tabela[2].qtdMes += 1
                break;
            case 'Abril':
                tabela[3].valor += data.valor
                tabela[3].qtdMes += 1
                break;
            case 'Maio':
                tabela[4].valor += data.valor
                tabela[4].qtdMes += 1
                break;
            case 'Junho':
                tabela[5].valor += data.valor
                tabela[5].qtdMes += 1
                break;
            case 'Julho':
                tabela[6].valor += data.valor
                tabela[6].qtdMes += 1
                break;
            case 'Agosto':
                tabela[7].valor += data.valor
                tabela[7].qtdMes += 1
                break;
            case 'Setembro':
                tabela[8].valor += data.valor
                tabela[8].qtdMes += 1
                break;
            case 'Outubro':
                tabela[9].valor += data.valor
                tabela[9].qtdMes += 1
                break;
            case 'Novembro':
                tabela[10].valor += data.valor
                tabela[10].qtdMes += 1
                break;
            case 'Dezembro':
                tabela[11].valor += data.valor
                tabela[11].qtdMes += 1
                break;
        }
    });
}

async function mesData(mes) {
    console.log(mes.value)
    let allDados = await dados;


    var table = document.getElementById('tableData');

    var rowLength = table.rows.length;

    for (var i = 1; i < rowLength; i += 1) {
        table.deleteRow(i)
        i = 0
        rowLength = table.rows.length
    }

    if (mes.value != "Todos") {
        let ReceitaMes = ReceitaMeses.filter(a => a.mes == mes.value)
        let DespesaMes = DespesaMeses.filter(a => a.mes == mes.value)


        console.log(dados)
        console.log("Dados", allDados);



        let rowDados = allDados.filter(a => a.mes === mes.value)

        rowDados.forEach(dado => {
            $("#tableData").append(
                `
                <tr>
                <td>${dado.descricao}</td>
                <td>${dado.valor}</td>
                <td>${dado.natureza}</td>
                    <td>${dado.mes}</td>
                </tr>
                
                `
            )
        });

    } else {
        allDados.forEach(dado => {
            $("#tableData").append(
                `
                <tr>
                <td>${dado.descricao}</td>
                <td>${dado.valor}</td>
                <td>${dado.natureza}</td>
                    <td>${dado.mes}</td>
                </tr>
                
                `
            )
        });
    }

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
    console.log("Hi")
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



