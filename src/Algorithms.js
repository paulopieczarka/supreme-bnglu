const math = require('mathjs');

const Algorithms =
{
    /**
     * 
     * @param {*} f  - function.
     * @param {*} x1 - lower bound.
     * @param {*} x2 - upper bound.
     * @param {*} e  - precision.
     * @param {*} it - max iteractions.
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

    newton(fun, x0, e, it = 100)
    {
        let f = math.compile(fun);
        let result, fx = f.eval({x: x0}), k = 0;
        console.log(" -- ", fx, x0);

        if( Math.abs(fx) > e )
        {
            k++;
            let fxLine = (equivalent(fun))(x0);
            let x1 = x0 - (fx/fxLine);
            fx = f.eval({x: x1});

            while(Math.abs(fx) > e && Math.abs(x1 - x0) > e && k <= it)
            {
                k++;
                x0 = x1;
                fxLine = (equivalent(fun))(x0);
                x1 = x0 - (fx/fxLine);
                fx = f.eval({x: x1});

                console.log(" -- ", fx, x0);
            }

            result = x1;
        }
        else {
            result = x0;
        }

        console.log(` -> Root: ${result} in ${k} iterations.`);
    }
}

function equivalent(f) {
    let dy = x => math.derivative(f, 'x').eval({x: x});
    return x => math.compile(f).eval({x: x}) / dy(x);
}

module.exports = { Algorithms : Algorithms };