var xmlns = "http://www.w3.org/2000/svg";
var curGraphSize = 0;

window.addEventListener('DOMContentLoaded', () => {

    document.getElementById("graph-size").addEventListener("keypress", e => {
        if(e.key == "Enter"){
            e.preventDefault();

            if(!isNaN(document.getElementById("graph-size").value)){
                var newGraphSize = Number(document.getElementById("graph-size").value);

                if(Number.isInteger(newGraphSize) && (newGraphSize >= 0 && newGraphSize <= 32)){

                    if(newGraphSize > curGraphSize){
                        for(let i = curGraphSize; i < newGraphSize; i++){
                            /*const newNode = document.createElement("div");
                            newNode.className="node";
                            newNode.id="node"+i;
                            newNode.style.left = (i%8)*100 + 30 + "px";
                            newNode.style.top = (Math.floor(i/8))*120 + 30 + "px";
                            newNode.appendChild(document.createTextNode(i));
                            document.getElementById("graphDisplay").appendChild(newNode);*/
                            const newNode = document.createElementNS(xmlns, 'circle');
                            newNode.id = "node" + i;
                            newNode.setAttributeNS(null, "cx", (i%8)*100 + 30 + "px");
                            newNode.setAttributeNS(null, "cy", (Math.floor(i/8))*120 + 30 + "px");
                            newNode.setAttributeNS(null, "r", "25px");
                            document.getElementById("nodes").appendChild(newNode);

                            const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
                            // Set the attributes for the text element
                            textElement.id = "node" + i + "text";
                            textElement.setAttribute('x', (i%8)*100 + 30 + "px"); // X position
                            textElement.setAttribute('y', (Math.floor(i/8))*120 + 35 + "px"); // Y position
                            textElement.setAttribute('fill', 'black'); // Text color
                            textElement.setAttribute('stroke-width', "1px");
                            textElement.setAttribute('text-anchor', 'middle');
                            textElement.textContent = i;
                            document.getElementById("nodes").appendChild(textElement);

                            addNodeDragger(newNode);
                        }
                        curGraphSize = newGraphSize;
                        handleEdges();
                    }
                    else if(newGraphSize < curGraphSize){
                        for(let i = newGraphSize; i < curGraphSize; i++){
                            const oldNode = document.getElementById("node" + i);
                            oldNode.parentElement.removeChild(oldNode);
                            const oldText = document.getElementById("node" + i + "text");
                            oldText.parentElement.removeChild(oldText);

                            for(let j = 0; j < i; j++){
                                const edge = document.getElementById("edge" + j + "to" + i);
                                if(edge){
                                    edge.parentElement.removeChild(edge);
                                }
                            }
                        }
                        curGraphSize = newGraphSize;
                    }
                }
                else {
                    document.getElementById("output").value += "Invalid graph size\n";
                }
            }
            else {
                document.getElementById("output").value += "Invalid graph size\n";
            }
        }
    })

    document.getElementById("graph-edges").addEventListener("keypress", e => {
        if(e.key == "Enter"){
            handleEdges();
        }
    });
});

function getCoords(u, v){
    var ux = Number.parseInt(document.getElementById("node" + u).getAttribute("cx"));
    var uy = Number.parseInt(document.getElementById("node" + u).getAttribute("cy"));
    var vx = Number.parseInt(document.getElementById("node" + v).getAttribute("cx"));
    var vy = Number.parseInt(document.getElementById("node" + v).getAttribute("cy"));
    var dx = vx - ux;
    var dy = vy - uy;
    var x1 = ux + dx / Math.sqrt(dx * dx + dy * dy) * 27;
    var y1 = uy + dy / Math.sqrt(dx * dx + dy * dy) * 27;

    var dx = ux - vx;
    var dy = uy - vy;
    var x2 = vx + dx / Math.sqrt(dx * dx + dy * dy) * 27;
    var y2 = vy + dy / Math.sqrt(dx * dx + dy * dy) * 27;

    var dx = -(y2 - y1) / Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)) * 20
    var dy = (x2 - x1) / Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)) * 20
    var x3 = (x1 + x2) / 2 + dx
    var y3 = (y1 + y2) / 2 + dy

    return [x1, y1, x2, y2, x3, y3];
}

function handleEdges(){
    var pairs = document.getElementById("graph-edges").value.split("\n");
    for(let pair of pairs){
        let indices = pair.split(" ");
        if(indices.length >= 2 && ( !Number.isNaN(indices[0]) && !Number.isNaN(indices[1]) )){
            if(Number.isInteger(Number(indices[0])) && Number.isInteger(Number(indices[1]))) {
                var u = Number(indices[0]);
                var v = Number(indices[1]);
                if((((0 <= u) && (u < curGraphSize)) && ((0 <= v) && (v < curGraphSize))) && (u != v)) {
                    if(u > v){
                        var temp = v;
                        v = u;
                        u = temp;
                    }

                    var coords = getCoords(u, v);

                    const edge = document.getElementById("edge" + u + "to" + v);
                    if(edge){
                        edge.setAttribute('x1', coords[0] + "px");
                        edge.setAttribute('y1', coords[1] + "px");
                        edge.setAttribute('x2', coords[2] + "px");
                        edge.setAttribute('y2', coords[3] + "px");
                    }
                    else {
                        const newEdge = document.createElementNS("http://www.w3.org/2000/svg", "line");
                        newEdge.id = "edge" + u + "to" + v;
                        newEdge.setAttribute('x1', coords[0] + "px");
                        newEdge.setAttribute('y1', coords[1] + "px");
                        newEdge.setAttribute('x2', coords[2] + "px");
                        newEdge.setAttribute('y2', coords[3] + "px");
                        document.getElementById("edges").appendChild(newEdge);
                    }

                    if(indices.length >= 3 && !Number.isNaN(indices[2])){
                        if(Number.isInteger(Number(indices[2]))){
                            var w = Number(indices[2]);

                            const weight = document.getElementById("edge" + u + "to" + v + "length")
                            if(weight){
                                weight.setAttribute('x', coords[4] + "px")
                                weight.setAttribute('y', coords[5] + "px")
                                weight.textContent = w;
                            }
                            else {
                                const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
                                // Set the attributes for the text element
                                textElement.id = "edge" + u + "to" + v + "length";
                                textElement.setAttribute('x', coords[4] + "px"); // X position
                                textElement.setAttribute('y', coords[5] + "px"); // Y position
                                textElement.setAttribute('fill', 'black'); // Text color
                                textElement.setAttribute('stroke-width', "1px");
                                textElement.setAttribute('text-anchor', 'middle');
                                textElement.textContent = w;
                                document.getElementById("edges").appendChild(textElement);
                            }
                        }
                    }
                }
            }
        }
    }
}

function moveEdges(node){
    var idNum = Number.parseInt(node.id.slice(4));
    for(var i = 0 ; i < curGraphSize; i++){
        if(i < idNum){
            const edge = document.getElementById("edge" + i + "to" + idNum);
            var coords = getCoords(i, idNum);
            if(edge){
                edge.setAttribute('x1', coords[0] + "px");
                edge.setAttribute('y1', coords[1] + "px");
                edge.setAttribute('x2', coords[2] + "px");
                edge.setAttribute('y2', coords[3] + "px");
            }

            const weight = document.getElementById("edge" + i + "to" + idNum + "length")
            if(weight){
                weight.setAttribute('x', coords[4] + "px");
                weight.setAttribute('y', coords[5] + "px");
            }
        }
        else if(i > idNum){
            const edge = document.getElementById("edge" + idNum + "to" + i);
            var coords = getCoords(idNum, i);
            if(edge){
                edge.setAttribute('x1', coords[0] + "px");
                edge.setAttribute('y1', coords[1] + "px");
                edge.setAttribute('x2', coords[2] + "px");
                edge.setAttribute('y2', coords[3] + "px");
            }

            const weight = document.getElementById("edge" + idNum + "to" + i + "length")
            if(weight){
                weight.setAttribute('x', coords[4] + "px");
                weight.setAttribute('y', coords[5] + "px");
            }
        }
    }
}

function addNodeDragger(node){
    var dx = 0, dy = 0, x1 = 0, y1 = 0;

    function draggerMouseDown(event){
        event.preventDefault();

        x1 = event.clientX;
        y1 = event.clientY;

        document.onmousemove = draggerMouseMove;
        document.onmouseup = endDrag;
    }

    function draggerMouseMove(event){
        event.preventDefault();

        dx = event.clientX - x1;
        dy = event.clientY - y1;
        x1 = event.clientX;
        y1 = event.clientY;

        var newOffsetTop = Math.min(Math.max(30, parseInt(node.getAttribute("cy")) + dy), 420);
        var newOffsetLeft = Math.min(Math.max(30, parseInt(node.getAttribute("cx")) + dx), 750);

        /*node.style.top = newOffsetTop + "px";
        node.style.left = newOffsetLeft + "px";*/
        node.setAttributeNS(null, "cx", newOffsetLeft + "px");
        node.setAttributeNS(null, "cy", newOffsetTop + "px");

        document.getElementById(node.id + "text").setAttribute('x', (newOffsetLeft) + "px");
        document.getElementById(node.id + "text").setAttribute('y', (newOffsetTop + 5) + "px");

        moveEdges(node);
    }

    function endDrag(event){
        document.onmouseout = null;
        document.onmouseup = null;
        document.onmousemove = null;
    }

    node.onmousedown = draggerMouseDown;
}