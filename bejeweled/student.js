function width(grid){
    return grid[0].length;
}

function height(grid){
    return grid.length;
}

function isInside(grid, position){
    return (position.x >= 0 &&position.x < width(grid)
                &&position.y >=0 && position.y < height(grid))

}

function swap(grid, p, q)
{
    console.log(grid);
    let a = grid[p.y][p.x];
    let b = grid[q.y][q.x];

    grid[p.y][p.x] = b;
    grid[q.y][q.x] = a;
}

function horizontalChainAt(grid, position)
{
    let X = position.x;
    Width = width(grid);
    function checkNextJewel(grid, position, color)
    {
        let result = 1;
        while(color == grid[position.y][position.x] && position.x <= Width)
        {
            result += 1;
            position.x += 1;
        }
        position.x = X;
        position.x -= 1;
        while(color == grid[position.y][position.x] && position.x >= 0)
        {
            result += 1;
            position.x -= 1;
        }
        position.x = X;
        return result;
    }
    let result;
    let color;
    color = grid[position.y][position.x];
    position.x += 1;
    result = checkNextJewel(grid, position, color)
    return result;
}

function verticalChainAt(grid, position)
{
    let Y = position.y;
    Height = height(grid);

    function checkNextJewell(grid, position, color)
    {
        let result = 1;
        while(position.y < Height && color == grid[position.y][position.x])
        {
            console.log(grid[position.y][position.x]);
            result += 1;
            position.y += 1;
        }
        position.y = Y;
        position.y -= 1;
        while(position.y >= 0 && color == grid[position.y][position.x] )
        {
            result += 1;
            position.y -= 1;
        }
        position.y = Y;
        return result;
    }

    let result;
    let color;
    color = grid[position.y][position.x];
    position.y += 1;
    result = checkNextJewell(grid, position, color)
    return result;
}

function removeChains(grid){

}