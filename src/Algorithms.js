const math = require('mathjs');

const Algorithms =
{
    /**
     * 
     * @param {string} f  - function.
     * @param {double} x1 - lower bound.
     * @param {double} x2 - upper bound.
     * @param {double} e  - precision.
     * @param {int} it - max iterations.
     */
    bisection(f, x1, x2, e, it = 100)
    {
        if(Math.abs(x2 - x1) < e) {
            console.log(" -> Result: ", x1, " or ", x2);
            return;
        }

        let f1, f2, k = 0;

        while((k++) < it)
        {
            console.log(` -- Iteration #${k}`);

            f1 = f(x1);
            f2 = f(x2);

            if((f1 * f2) > 0) {
                console.log(" -> Result: Guesses are wrong.");
                break;
            }

            let x = (x1 + x2) / 2;

            if( Math.abs((x2 - x1)/x) < e) {
                console.log(" -> Result: ", x);
                break;
            }

            let calcF = f(x);

            if( (calcF * f1) > 0 ) {
                x1 = x;
                f1 = f;
            }
            else {
                x2 = x;
                f2 = f;
            }
        }
    },

    /**
     * 
     * @param {string} fun - function.
     * @param {double} x0 - first guess.
     * @param {double} e - precision (epsilon).
     * @param {int} it - max iterations.
     */
    newton(fun, x0, e, it = 100)
    {
        let f = math.compile(fun);
        let fh = math.derivative(fun, 'x');

        let fx = f.eval({x: x0}), k = 1;
        
        if( Math.abs(fx) > e )
        {
            let fxLine = fh.eval({x: x0});
            let x1 = x0 - (fx / fxLine);
            fx = f.eval({x: x1});

            console.log(` -- Running #${k} iteration with x0=${x0}; x1=${x1} fx=${fx}`);

            while( Math.abs(fx) > e && Math.abs(x1 - x0) > e && (k++) < it )
            {
                console.log(` -- Running #${k} iteration with x0=${x0}; x1=${x1} fx=${fx}`);

                x0 = x1;
                fxLine = fh.eval({x: x0});
                x1 = x0 - (fx/fxLine);
                fx = f.eval({x: x1});
            }

            console.log(" -> Iterations #", k, "; ε=", x1);
            return;
        }

        console.log(" -> First result is best ε=", x0);
    }
}

module.exports = { Algorithms : Algorithms };