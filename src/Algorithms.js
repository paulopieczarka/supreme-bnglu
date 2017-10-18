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
    bisection(fun, x1, x2, e, it = 100)
    {
        let f = math.compile(fun);

        if(Math.abs(x2 - x1) < e) {
            console.log(" -> Result: ", x1, " or ", x2);
            return;
        }

        let f1, f2, k = 0;

        while((k++) < it)
        {
            console.log(` -- Iteration #${k}`);

            f1 = f.eval({x: x1});
            f2 = f.eval({x: x2});;

            if((f1 * f2) > 0) {
                console.log(" -> Result: Guesses are wrong.");
                break;
            }

            let x = (x1 + x2) / 2;

            if( Math.abs((x2 - x1)/x) < e) {
                console.log(" -> Result: ", x);
                break;
            }

            let calcF = f.eval({x: x});

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

    /**
     * Com pivoteamento parcial.
     * @param {[[]]} mat - matrix
     * @param {[]} x - vector (right part)
     */
    gauss(mat, x)
    {
        if(math.det(mat) === 0) {
            console.log("O determinante da matriz é nulo.");
            return;
        }

        // Completa a matriz (gera matriz aumentada).
        for(i=0; i < mat.length; i++) {
            mat[i].push( x[i] );
        }

        let n = mat.length;
        console.log(n, " => ", mat);

        for(let k=0; k < n; k++)
        {
            // Encontra o maior pivo em módulo.
            let max = k;
            for(let i=k+1; i < n; i++)
                if(Math.abs(mat[i][k]) > Math.abs(mat[max][k]))
                    max = i;

            if(max === 0) {
                console.log(" -> Matriz sem solução.");
                return;
            }

            // Troca as linhas para o pivo ir para o lugar.
            let temp = mat[k];
            mat[k] = mat[max];
            mat[max] = temp;

            // Gera a matriz triangular de coeficientes.
            for(let i=k+1; i < n; i++)
            {
                let alpha = mat[i][k] / mat[k][k];
                for(let j=k; j < mat[0].length; j++)
                    mat[i][j] -= alpha * mat[k][j];
            }

            console.log(mat);
        }

        // Encontra as raizes, resolvendo Ax = b
        let raizes = Array(n).fill(0);
        for(let i=n-1; i >= 0; i--)
        {
            let soma = 0;
            for(let j=i+1; j < n; j++)
                soma += mat[i][j] * raizes[j];

            raizes[i] = (mat[i][mat[0].length-1] - soma) / mat[i][i];
        }

        console.log(" -> Result: ", raizes);
    },

    /**
     * @param {[[]]} mat - matrix
     * @param {[]} vect - vector (right part)
     */
    LU(mat, vect)
    {
        console.log("det(A) = ", math.det(mat));
        if(math.det(mat) === 0) {
            console.log("O determinante da matriz é nulo.");
            return;
        }

        let n = mat.length;

        // decomposition of matrix.
        let lu = Array(n).fill(0).map( x => Array(n).fill(0) );

        for(let i=0; i < n; i++)
        {
            for(let j=i; j < n; j++)
            {
                let sum = 0;
                for(let k=0; k < i; k++)
                    sum += lu[i][k] * lu[k][j];
                
                lu[i][j] = mat[i][j] - sum;
            }

            for(let j=i+1; j < n; j++)
            {
                let sum = 0;
                for(let k=0; k < i; k++) 
                    sum += lu[j][k] * lu[k][i];
                
                lu[j][i] = (1 / lu[i][i]) * (mat[j][i] - sum);
            }
        }

        // find solution of Ly = b
        let y = Array(n).fill(0);

        for(let i=0; i < n; i++)
        {
            let sum = 0;
            for(let k=0; k < i; k++)
                sum += lu[i][k] * y[k];
            
            y[i] = vect[i] - sum;
        }

        // find solution of Ux = y
        let x = Array(n).fill(0);

        for(let i=n-1; i >= 0; i--)
        {
            let sum = 0;
            for(let k=i+1; k < n; k++)
                sum += lu[i][k] * x[k];

            x[i] = (1 / lu[i][i]) * (y[i] - sum);
        }

        console.log("Original:");
        console.log(mat);

        console.log("\nLU");
        console.log(lu);

        console.log("\nY");
        console.log(y);

        console.log("\nX");
        console.log(x);
    }
}

module.exports = { Algorithms : Algorithms };