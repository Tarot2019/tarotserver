let models = require('../database/models.js');
let divination = models.divination;
module.exports = {
    homeDivinations: async () => {
        return await divination.findAll({
            where: {isHome: true},
            attributes: ['id', 'picTop', 'picSquare', 'isBanner', 'title', 'subTitle']
        });
    },
    divinationDetail: async (divinationID) => {
        return await divination.findById(divinationID);
    }
}