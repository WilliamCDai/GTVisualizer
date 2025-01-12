window.addEventListener('DOMContentLoaded', () => {
    const editorButton = document.getElementById("editorButton").addEventListener('click', function() {
        fetch('/')
            .then(data => {
                window.location.href = '/'
            })
    })

    const dfsButton = document.getElementById("dfsButton").addEventListener('click', function() {
        fetch('/dfs')
            .then(data => {
                window.location.href = '/dfs'
            })
    })

    const bfsButton = document.getElementById("bfsButton").addEventListener('click', function() {
        fetch('/bfs')
            .then(data => {
                window.location.href = '/bfs'
            })
    })

    const dijkstraButton = document.getElementById("dijkstraButton").addEventListener('click', function() {
        fetch('/dijkstra')
            .then(data => {
                window.location.href = '/dijkstra'
            })
    })
});