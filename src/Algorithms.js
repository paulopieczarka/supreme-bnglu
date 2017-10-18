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
    },

    gauss(mat, x)
    {
        for(i=0; i < mat.length; i++) {
            mat[i].push( x[i] );
        }

        let n = mat.length;
        console.log(n, " => ", mat);

        for(let k=0; k < n; k++)
        {
            let max = k;
            for(let i=k+1; i < n; i++)
                if(Math.abs(mat[i][k]) > Math.abs(mat[max][k]))
                    max = i;

            if(max === 0) {
                console.log(" -> Matriz sem solução.");
                return;
            }

            let temp = mat[k];
            mat[k] = mat[max];
            mat[max] = temp;

            for(let i=k+1; i < n; i++)
            {
                let alpha = mat[i][k] / mat[k][k];
                for(let j=k; j < mat[0].length; j++)
                    mat[i][j] -= alpha * mat[k][j];
            }

            if(Math.abs(mat[k][k]) <= 1e-10) {
                console.log("O determinante é zero (matriz singular).");
                return;
            }

            console.log(mat);
        }

        let raizes = Array(n).fill(0);
        
        for(let i=n-1; i >= 0; i--)
        {
            let soma = 0;
            for(let j=i+1; j < n; j++)
                soma += mat[i][j] * raizes[j];

            raizes[i] = (mat[i][mat[0].length-1] - soma) / mat[i][i];
        }

        console.log(" -> Result: ", raizes);
    }
}

module.exports = { Algorithms : Algorithms };