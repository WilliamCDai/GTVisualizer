var started = false

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("dijkstraButton").style.backgroundColor = "#E0DAC6";
    document.getElementById("dijkstraButton").style.color = "#051e39"

    document.getElementById("play").addEventListener('click', () => {
        if(!started){
            dijkstra(0)
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

function dijkstra(src){
    var queue = []
    var vis = []
    var dist = Array(curGraphSize)
    var isPaused = false
    dist[0] = 0
    queue.push({index: 0, distance: 0})

    document.getElementById("pause").addEventListener('click', () => {
        isPaused = true
    })
    document.getElementById("play").addEventListener('click', () => {
        isPaused = false
    })

    const dijkstraStep = setInterval(() => {
        if(!isPaused){
            if(queue.length > 0){

                const cur = queue.shift()
                if(!vis.includes(cur.index)){
                    vis.push(cur.index)
                    dist[cur.index] = cur.distance
                    document.getElementById("node"+cur.index).setAttribute('stroke', '#008000')

                    for(let i = curGraphSize - 1; i >= 0; i--){
                        if(i < cur.index && !vis.includes(i)){
                            const edge = document.getElementById("edge"+i+"to"+cur.index)
                            const weight = document.getElementById("edge"+i+"to"+cur.index+"length")
                            if(edge && weight){
                                queue.push({index: i, distance: cur.distance + Number.parseInt(weight.textContent)});
                            }
                            else if(edge){
                                queue.push({index: i, distance: cur.distance + 1});
                            }
                        }
                        else if(i > cur.index && !vis.includes(i)){
                            const edge = document.getElementById("edge"+cur.index+"to"+i)
                            const weight = document.getElementById("edge"+cur.index+"to"+i+"length")
                            if(edge && weight){
                                queue.push({index: i, distance: cur.distance + Number.parseInt(weight.textContent)});
                            }
                            else if(edge){
                                queue.push({index: i, distance: cur.distance + 1});
                            }
                        }
                    }

                    queue.sort(function(a, b) {
                        if(a.distance == b.distance){
                            return a.index > b.index ? 1 : -1
                        }
                        return a.distance > b.distance ? 1 : -1
                    });

                    var painted = []
                    var cnt = 0
                    for(let v of queue){
                        if(!vis.includes(v.index)){
                            if(!painted.includes(v.index)){
                                painted.push(v.index)
                                if(cnt == 0){
                                    document.getElementById("node"+v.index).setAttribute('stroke', '#FFF200')
                                    cnt++
                                }
                                else if(cnt <= 5){
                                    document.getElementById("node"+v.index).setAttribute('stroke', "#FF" + (10-2*cnt) + "" + (10 - 2*cnt) + "00")
                                    cnt++
                                }
                                else {
                                    document.getElementById("node"+v.index).setAttribute('stroke', "#FF0000")
                                    cnt++
                                }
                            }
                        }
                    }
                }
            }
            else {
                clearInterval(dijkstraStep)
            }
        }
    }, 750)
}