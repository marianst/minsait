$(document).ready(function() {
    // URL do arquivo CSV
    const csvUrl = 'https://dados.saude.go.gov.br/dataset/b126599d-de89-4e4c-8a88-d9ff7b592aba/resource/0382d2cb-5114-49c0-86ab-b0cc75427260/download/aids-adulto.csv';

    // Função para converter CSV em JSON
    function csvToJson(csv) {
        const lines = csv.split('\n');
        const headers = lines[0].split(';');
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(';');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    }

    // Função para carregar e processar o CSV
    $.get(csvUrl, function(data) {
        const jsonData = csvToJson(data);

        // Processar os dados JSON e criar o gráfico
        const parsedData = parseData(jsonData);
        createChart(parsedData);
    });
});

function parseData(data) {
    // Adapte esta função conforme a estrutura dos seus dados
    const labels = [];
    const values = [];

    data.forEach(record => {
        labels.push(record['escolaridade']); // Ajuste para o nome da coluna relevante
        values.push(parseFloat(record['Valor'])); // Ajuste para o nome da coluna relevante
    });

    return { labels, values };
}

function createChart(data) {
    var chartDom = document.getElementById('chart');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: 'Número de Testes',
            subtext: 'Dados de Testes e Experimentos',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Número de Testes'],
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: data.labels,
            axisLabel: {
                rotate: 45
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Número de Testes',
                type: 'bar',
                data: data.values,
                itemStyle: {
                    color: '#4CAF50'
                }
            }
        ]
    };

    myChart.setOption(option);
}