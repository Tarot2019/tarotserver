const Models = require('./models.js');
module.exports.createTable = function (modelName) {
    if(modelName) {
        Models[modelName].sync().then(() => console.log("创建表成功 -> " + modelName));
    } else {
        let keys = Object.keys(Models);
        let runner = () => new Promise((resolve, reject) => {
            if(keys.length == 0) {
                console.log("++++++++创建所有表完成+++++++");
                return resolve("done");
            }
            let key = keys[0];
            Models[key].sync()
                .then(() => {
                    console.log("创建表成功 -> " + key);
                    keys.shift();
                    resolve(runner());
                })
                .catch(err => {
                    console.log("创建表失败 -> " + key);
                    console.log(err);
                    reject(err);
                });
        });
        runner();
    }
}