  // helper function to insert node into priority queue
  async function dijkstraPQinsert(PriorityQueue, node) {
      for (let i = 0; i < PriorityQueue.length; i++) {
          if (node.gScore + node.weight < PriorityQueue[i].gScore + PriorityQueue[i].weight) {
              PriorityQueue.splice(i, 0, node);
              return;
          }
      }
      PriorityQueue.push(node);
  }


  async function dijkstraAlgo() {

      let PriorityQueue = [start];

      for (let c = 0; c < columns; c++) {
          for (let r = 0; r < rows; r++) {
              tiles[c][r].gScore = Infinity;
          }
      }

      start.gScore = 0;

      while (PriorityQueue.length > 0 && !interrupt) {
          let current = PriorityQueue.splice(0, 1)[0];

          // If any of the neighbors is the end, then exit
          if (current == end) {
              console.log("Path Found !")
              await drawPath();
              return "Found";
          }

          // Checking every neighbor of current node
          for (let pos of getNeighbors(current)) {
              let node = tiles[pos[0]][pos[1]];

              if (node.state != "w" && node.state != "v") {
                  // node was discovered from current node
                  node.gScore = current.gScore + current.weight;
                  await visitNode(node, current);
                  dijkstraPQinsert(PriorityQueue, node);
                //   await sleep(1000 / fps);
              }
          }
          drawStartAndEnd()

      }
  }


  async function dijkstra() {

      let result = await dijkstraAlgo();

      if (result != "Found") {
          displayResult.innerHTML = "Path Not Possible !"
      } else {
          displayResult.innerHTML = "Path Found!"
      }
      window.scrollBy({
          top: 1000,
          behavior: "smooth"
      });
  }