var started = false

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("dfsButton").style.backgroundColor = "#E0DAC6";
    document.getElementById("dfsButton").style.color = "#051e39"

    document.getElementById("play").addEventListener('click', () => {
        if(!started){
            dfs(0)
            started = true
        }
    })
    document.getElementById("replay").addEventListener('click', reset)
});

function reset(){
    for(let i = curGraphSize - 1; i >= 0; i--){
        document.getElementById("node" + i).setAttribute('stroke', '#000000')
    }
    started = false
}

function dfs(src){
    var queue = []
    var vis = []
    var isPaused = false
    queue.push(src)
    vis.push(src)

    document.getElementById("pause").addEventListener('click', () => {
        isPaused = true
    })
    document.getElementById("play").addEventListener('click', () => {
        isPaused = false
    })

    const dfsStep = setInterval(() => {
        if(!isPaused){
            if(queue.length > 0){
                let cur = queue.pop()
                document.getElementById("node"+cur).setAttribute('stroke', '#008000')

                for(let i = curGraphSize - 1; i >= 0; i--){
                    if(i < cur && !vis.includes(i)){
                        const edge = document.getElementById("edge"+i+"to"+cur)
                        if(edge){
                            vis.push(i)
                            queue.push(i)
                        }
                    }
                    else if(i > cur && !vis.includes(i)){
                        const edge = document.getElementById("edge"+cur+"to"+i)
                        if(edge){
                            vis.push(i)
                            queue.push(i)
                        }
                    }
                }

                var painted = []
                var cnt = 0
                for(let i = queue.length - 1; i >= 0; i--){
                    if(!painted.includes(queue[i])){
                        painted.push(queue[i])
                        if(cnt == 0){
                            document.getElementById("node"+queue[i]).setAttribute('stroke', '#FFF200')
                            cnt++
                        }
                        else if(cnt <= 5){
                            document.getElementById("node"+queue[i]).setAttribute('stroke', "#FF" + (10-2*cnt) + "" + (10 - 2*cnt) + "00")
                            cnt++
                        }
                        else {
                            document.getElementById("node"+queue[i]).setAttribute('stroke', "#FF0000")
                            cnt++
                        }
                    }
                }
            }
            else {
                clearInterval(dfsStep)
            }
        }
    }, 750)
}