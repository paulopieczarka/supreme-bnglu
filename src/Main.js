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

    Algorithms.newton(
        'x^3 - 9x + 3',
        .5,
        .01
    );
}

// Run.
Main();