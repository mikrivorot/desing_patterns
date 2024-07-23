// class Shape
// {
//   constructor(name)
//   {
//     this.name = name;
//   }
// }
//
// class Triangle extends Shape
// {
//   constructor()
//   {
//     super('triangle');
//   }
// }
//
// class Square extends Shape
// {
//   constructor()
//   {
//     super('square');
//   }
// }
//
// class VectorSquare extends Square
// {
//   toString()
//   {
//     return `Drawing square as lines`;
//   }
// }
//
// class RasterSquare extends Square
// {
//   toString()
//   {
//     return `Drawing square as pixels`;
//   }
// }

// imagine VectorTriangle and RasterTriangle are here too

// Connect different components through abstractions
// Avoid Cartesian-product duplication
class Renderer
{
    constructor(){}
    get whatToRenderAs() {
        return this._whatToRenderAs;
    }
    set whatToRenderAs(name) {
        this._whatToRenderAs = name;
    }
}

class RasterRenderer 
{
    constructor(){}

    toString() {
        return `Drawing ${this.whatToRenderAs} as pixels`
    }
}

class VectorRenderer 
{
    constructor(){}
    toString() {
        return `Drawing ${this.whatToRenderAs} as lines`
    }
}

class Shape {
    constructor(renderer, name)
      {
          this.name = name;
          this.renderer = renderer;
          this.renderer.whatToRenderAs = name;
      }
      
  toString() {
    return this.renderer.toString();
  }
}


class Triangle extends Shape
{
  constructor(renderer)
  {
    super(renderer, 'triangle');
  }
}

class Square extends Shape
{
  constructor(renderer)
  {
    super(renderer, 'square');
  }
}

