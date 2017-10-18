const { Algorithms } = require('./Algorithms');

const Main = () =>
{
    console.log("Hello, World!");
    
    // Algorithms.bisection(
    //     x => Math.pow(x,3) + 3 * Math.pow(x, 2) + 12 * x + 8,
    //     -5,
    //     5,
    //     0.0001
    // );

    // Algorithms.newton(
    //     'x^3 - 9x + 3',
    //     .5,
    //     .01
    // );

    Algorithms.gauss(
        [[0, 2, 4], 
         [1, 0, 2], 
         [1, 3, 0]],
        [6, 10, 14]
    );
}

// Run.
Main();