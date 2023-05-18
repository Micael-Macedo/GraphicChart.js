const ctx = document.getElementById('tabela');
const ctx1 = document.getElementById('linha');
const dados = fetch("http://127.0.0.1:5500/dados.json")
    .then(r => { return r.json() })
let StructureDados = [
    {
        mes: "Janeiro",
        valor: 0,
        qtdMes: 0
    },
    {
        mes: "Fevereiro",
        valor: 0,
        qtdMes: 0
    },
    {
        mes: "Março",
        valor: 0,
        qtdMes: 0
    },
    {
        mes: "Abril",
        valor: 0,
        qtdMes: 0
    },
    {
        mes: "Maio",
        valor: 0,
        qtdMes: 0
    },
    {
        mes: "Junho",
        valor: 0,
        qtdMes: 0
    },
    {
        mes: "Julho",
        valor: 0,
        qtdMes: 0
    },
    {
        mes: "Agosto",
        valor: 0,
        qtdMes: 0
    },
    {
        mes: "Setembro",
        valor: 0,
        qtdMes: 0
    },
    {
        mes: "Outubro",
        valor: 0,
        qtdMes: 0
    },
    {
        mes: "Novembro",
        valor: 0,
        qtdMes: 0
    },
    {
        mes: "Dezembro",
        valor: 0,
        qtdMes: 0
    }
]

ReceitaMeses =  JSON.parse(JSON.stringify(StructureDados))
DespesaMeses = JSON.parse(JSON.stringify(StructureDados))
graficos = []  

const gerarGraficos = async () => {
    const allDados = await dados;
    const receitas =  []
    const despesas =  []

    allDados.forEach(function (dado) {
        if (dado.natureza === 0) {
            dado.natureza = "despesa"
            receitas.push(dado)

        } else {
            despesas.push(dado)
            dado.natureza = "lucro"
        }
    });

    dataTabelaMes(despesas, DespesaMeses)
    dataTabelaMes(receitas, ReceitaMeses)

    graficoBarra = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ReceitaMeses.map(a => a.mes),
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

    graficoLinha = new Chart(ctx1, {
        type: 'polarArea',
        data: {
            labels: DespesaMeses.map(a => a.mes),
            datasets: [
                {
                    label: 'quantidade de atividades lucrativas',
                    data: ReceitaMeses.map(a => a.valor),
                },
                {
                    label: 'quantidade de atividades de despesas',
                    data: DespesaMeses.map(a => a.valor),
                }
            ]
        },
        options: {
            parsing: {
                xAxisKey: 'id'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
    graficos.push(graficoLinha, graficoBarra)

};

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

function naturezaData(natureza) {
    const isDataShown = graficoBarra.isDatasetVisible(natureza.value)
    if (natureza.value != "") {
        if (isDataShown === false) {
            graficoBarra.show(natureza.value);
        }
        if (isDataShown === true) {
            graficoBarra.hide(natureza.value);
        }
    } else {

    }
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
        graficoBarra.config.data.labels = [mes.value];
        graficoBarra.config.data.datasets[0].data = [ReceitaMes[0].Receita];
        graficoBarra.config.data.datasets[1].data = [DespesaMes[0].Despesa];

        graficoLinha.config.data.labels = [mes.value];
        graficoLinha.config.data.datasets[0].data = [ReceitaMes[0].qtdReceita];
        graficoLinha.config.data.datasets[1].data = [DespesaMes[0].qtdDespesa];

    } else {
        graficoBarra.config.data.labels = ReceitaMeses.map(a => a.mes);
        graficoBarra.config.data.datasets[0].data = ReceitaMeses.map(a => a.Receita);
        graficoBarra.config.data.datasets[1].data = DespesaMeses.map(a => a.Despesa);

        graficoLinha.config.data.labels = [ReceitaMeses.map(a => a.mes)];
        graficoLinha.config.data.datasets[0].data = ReceitaMeses.map(a => a.qtdReceita);
        graficoLinha.config.data.datasets[1].data = DespesaMeses.map(a => a.qtdDespesa);

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

    graficoLinha.update();
    graficoBarra.update();
}

function changeGraphics(label, data) {
    graficos.forEach(grafico => {
        grafico.config.data.labels = [label]
        grafico.config.data.datasets.forEach(dataset => {
            dataset.data = [data[0].valor]
        });
        grafico.update();
    });
}
const inputMes = document.getElementById("mes");
const inputReceita = document.getElementById("receita");
const inputDespesa = document.getElementById("despesa");

inputReceita.addEventListener("change", changeGraphics())
inputMes.addEventListener("change", function (){
    console.log(this.value);
})

gerarGraficos()


