//exports.run = 
export function co(generator) {
    var gen = generator();
    function next(data) {
        var ret = gen.next(data);
        if (ret.done) {
            return;
        } else {
            ret.value(function cb(err, data) {
                if (err) {
                    throw (err);
                }
                next(data);
            });
        }
    }
    next();
}