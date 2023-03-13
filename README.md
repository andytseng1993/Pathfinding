# Dijkstra algorithm

1.  Make sure the start & end coordinate is not empty.
2.  Create two empty arrays, marking visited order : visitedNodesInOrder, and unvisited cell : unvisitedNode.
3.  Add start cell to the unvisitedNode array.
4.  Use queue which base on the first-in, first-out (FIFO) principle, shifting the unvisitedNode array and make it to currentNode.
5.  Make sure currentNode is not wall, unvisited and add to visitedNodesInOrder array.
6.  Search for the adjacent cell and filter them by not isVisited.
7.  Update the distances of the adjacent cell, then push the node with the distance to the unvisitedNode and record the previos node is current node.
    Repeat steps 4 through 7 until there are no more unvisitedNode cells or touch the end point.
    If no more unvisitedNode, it mean cannot find finish node. Return visitedNodesInOrder.

# PRIM Maze

1.  Make every cell is wall and maze unvisited cell.
2.  Start with a random cell and make sure its x & y are even.
3.  Create two empty arrays, marking visited cells : visited, and what we’ll call frontier cells : frontier.
4.  Add start cell to the frontier array.
5.  Choose a cell randomly from the frontier array and make it the current cell, removing it from the frontier,removing the wall and adding it to the visited.
6.  Search for the adjacent cell and filter them to isVisited and unVisited part. (adjacent cell is +2 distance because the wall take 1)
7.  Remove the wall between the current cell and a random adjacent cell that belongs to the isVisited part.
8.  Add all unVisited part that are adjacent to the current cell to the frontier array.
    Repeat steps 5 through 8 until there are no more frontier cells and return visited array.
