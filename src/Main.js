const { Algorithms } = require('./Algorithms');

const Main = () =>
{
    console.log("Hello, World!");
    
    // Algorithms.bisection(
    //     'x^3 + 3(x^2) + 12x + 8',
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

    // Algorithms.LU(
    //     [[3, 2, 4], 
    //      [1, 1, 2], 
    //      [4, 3, -2]],
    //     [1, 2, 3]
    // );
}

// Run.
Main();