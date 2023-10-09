const uuid = require("uuid");

function getNextId(db) {
    const allItems = db.getAll();
    if (allItems.length) {
        allItems.sort((a, b) => b.id - a.id);
        return allItems[0].id + 1;
    }
    return 0;
}

function parseImages(item, bucketLocation) {
    item.images.forEach((_, i) => {
        const fileName = uuid.v4();
        item.images[
            i
        ] = `${process.env.DEFAULT_CDN_URL}/tourism/${bucketLocation}/${fileName}`;
    });

    return item.images;
}

async function clearFolder(folderName) {
    return db.drive.listObjects({
        Bucket: process.env.DO_BUCKET,
        Prefix: `tourism/${folderName}`,
    });
}

module.exports = {
    getNextId,
    parseImages,
    clearFolder,
};
