let nomi_label
document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault()
    let username = document.querySelector('#user').value
    let response = await fetch(`https://api.github.com/users/${username}/repos`)
    let oggetto = await response.json()

    // Display nome repop per colonna
    myChart.data.labels = await oggetto.map(repo => repo.name)

    // Aggiornamento titolo chart
    myChart.options.plugins.title.text = `${username} repositiories`

    // Display numero commits per repo
    let repo_commits = []
    await Promise.all(oggetto.map(async repo => {
        let commit_response = await fetch(`https://api.github.com/repos/${repo.full_name}/commits`)
        let commit_obj =  await commit_response.json()
        repo_commits.push(commit_obj.length)
    }))
    console.log(repo_commits.length)
    myChart.data.datasets[0].data = repo_commits
    myChart.update()

})

// Chart
let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'polarArea', // bar, horizontalBAr, pie, line, doughnut, radar, polarArea
        data: {
            labels: [],
            datasets:[{
                label:'Commits',
                data: [],
                backgroundColor:['rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'],
                borderWidth:2,
                borderColor:'#777',
                hoverBorderWidth:4,
                hoverBorderColor:'#000'
            }]
        },
        options: {
            layout: {
                autoPadding: true
            },
            plugins: {
                title:{
                    display: true,
                    text: 'Repositories',
                    fontSize: 25
                },
                legend: {
                    text: 'Legenda',
                    position:'bottom',
                    lables:{
                        fontcolor:'#000'
                    }
                }
            }
        }
    });