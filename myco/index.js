const co = require('./co')['run'];

var readFile = thunkify(_readFile);
var sleep = thunkify(_sleep);

/** 主任务函数 **/
function* flow() {
  var file1 = yield readFile("file1.txt");
  console.log('file1的内容是: ' + file1);
  console.log(yield sleep(2000))
  // sleep 1s
  var file2 = yield readFile(file1);
  console.log('file2的内容是: ' + file2);
}

co(flow); // 运行

function _readFile(filename, callback) {
  setTimeout(function () { callback(null, 'file2.txt'); }, 0);
}

function _sleep(ms, callback) {
  setTimeout(function () { callback(null, 'sleeped' + ms + 'ms!') }, ms);
}

function thunkify(fn) {
  return function () {
    var args = [].slice.apply(arguments);
    return function (cb) {
      args.push(cb);
      fn.apply(null, args);
    }
  }
}