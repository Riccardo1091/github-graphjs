let nomi_label
document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault()
    let username = document.querySelector('#user').value
    let response = await fetch(`https://api.github.com/users/${username}/repos`)
    let oggetto = await response.json()

    // recupero nome repo
    myChart.data.labels = oggetto.map(repo => repo.name)
    myChart.data.datasets[0].label = 'Commits'

    // recupero commits repo
    let repo_commits = []
    oggetto.forEach(async repo => {
        let commit_response = await fetch(`https://api.github.com/repos/${repo.full_name}/commits`)
        let commit_obj =  await commit_response.json()
        repo_commits.push(commit_obj.length)
    })

    myChart.data.datasets[0].data = repo_commits
    myChart.update()
})

// Chart
let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar', // bar, horizontalBAr, pie, line, doughnut, radar, polarArea
        data: {
            labels: [],
            datasets:[{
                label:'Repositories',
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
            title:{
                display:true,
                text:'',
                fontSize:25
            },
            legend:{
                position:'right',
                lables:{
                    fontcolor:'#000'
                }
            }
        }
    });