class Lazy {
    chainedFunctions = null;
    add(fn, ...args) {
        if (!this.chainedFunctions) {
            this.chainedFunctions = (target) => {
                const result = fn.bind(null, ...args, target)();
                return result;
            };
        } else {
            let prev = this.chainedFunctions;
            this.chainedFunctions = (target) => {
                return fn.bind(null, ...args, prev(target))();
            };
        }
        return this;
    }

    evaluate(targets) {
        const result = targets.map((target) => this.chainedFunctions(target));
        return result;
    }
}

const lazy = new Lazy();
const evaluateResult = lazy
    .add(function timesTwo(a) {
        return a * 2;
    })
    .add(function plus(a, b) {
        return a + b;
    }, )
    .evaluate([1, 2, 3]);

console.log(evaluateResult);