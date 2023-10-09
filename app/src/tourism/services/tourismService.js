const uuid = require("uuid");
const sharp = require("sharp");

const BUCKET_NAME = process.env.DO_BUCKET;

function deleteOldImages(itemName) {
    const key = itemName.replace(/ /g, "_").replace(/-/g, "_");
    const objects = db.drive.listObjects({
        Bucket: BUCKET_NAME,
        Prefix: `tourism/${key}`,
    });
    if (objects.Contents) {
        for (const obj of objects.Contents) {
            db.drive.deleteObject({ Bucket: BUCKET_NAME, Key: obj.Key });
        }
    }
}

async function resizeImage(imageBuffer) {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    let newWidth, newHeight;

    if (metadata.width > metadata.height) {
        newWidth = Math.floor(metadata.width * 0.7);
        newHeight = Math.floor((metadata.height * newWidth) / metadata.width);
    } else {
        newHeight = Math.floor(metadata.height * 0.7);
        newWidth = Math.floor((metadata.width * newHeight) / metadata.height);
    }

    return image.resize(newWidth, newHeight).toBuffer();
}

function getTourismItems(request) {
    return db.getAll();
}

function getTourismItemsByCategory(request, category) {
    try {
        return db.getByCategory(request, category);
    } catch (error) {
        throw new Error(
            `Error: Cannot get the items in the ${category} category`
        );
    }
}

function createTourismItem(data) {
    if (
        TOURISM_CATEGORIES.includes(data.category) &&
        !db.db.countDocuments({ name: data.name })
    ) {
        data.id = tourismCrudHelpers.getNextId(db);
        data.is_active = true;
        data.bucket_location = String(data.name)
            .replace(/ /g, "_")
            .replace(/-/g, "_");
        data.images = tourismCrudHelpers.parseImages(
            data,
            data.bucket_location
        );
        try {
            return db.create(data);
        } catch (error) {
            throw new Error(`Error: Cannot create the item`);
        }
    } else {
        throw new Error(
            `Error: Cannot create the item, data invalid or item already exists`
        );
    }
}

function updateTourismItem(name, request) {
    if (TOURISM_CATEGORIES.includes(request.category)) {
        const item = db.getByName(name);

        if (item.length) {
            try {
                request.images = [];
                request.bucket_location = String(request.name)
                    .replace(/ /g, "_")
                    .replace(/-/g, "_");
                deleteOldImages(request.name);
                return db.update(name, request);
            } catch (error) {
                throw new Error(`Error: Cannot update the item`);
            }
        } else {
            throw new Error(`Error: Item not found`);
        }
    }
}

function softDeleteTourismItem(name) {
    const item = db.getAll().find((item) => item.name === name);

    if (item) {
        item.is_active = false;
        return db.update(item);
    } else {
        throw new Error(`Item not found`);
    }
}

function hardDeleteTourismItem(name) {
    const items = db.getByName(name);
    if (items.length) {
        db.delete(items[0].name);
        return `Item with id ${id} deleted successfully`;
    } else {
        throw new Error(`Item not found`);
    }
}

function getTourismItemByCategoryAndName(category, name, request) {
    const items = db.getByCategory(request, category);

    const item = items.find((item) => item.name === name && item.is_active);

    if (item) {
        return item;
    } else {
        throw new Error(`Item not found`);
    }
}

async function createTourismItemImage(category, name, imageFile) {
    try {
        const item = db.db.findOne({ category, name });

        if (!item) {
            throw new Error(`Item not found`);
        }

        const imageBuffer = await sharp(imageFile.buffer).toBuffer();

        const resizedImageBuffer = await resizeImage(imageBuffer);

        const s3Key = `tourism/${name
            .replace(/-/g, "_")
            .replace(/ /g, "_")}/${uuid.v4()}.webp`;

        await db.drive.putObject({
            Bucket: BUCKET_NAME,
            Key: s3Key,
            ACL: "public-read",
            ContentDisposition: "inline",
            Body: resizedImageBuffer,
        });

        const path = `${process.env.DEFAULT_CDN_URL}/${s3Key}`;
        item.images.push(path);
        db.update(name, item);

        return item;
    } catch (error) {
        throw new Error(
            `Item with name ${name} and category ${category} not found`
        );
    }
}

module.exports = {
    getTourismItems,
    getTourismItemsByCategory,
    createTourismItem,
    updateTourismItem,
    softDeleteTourismItem,
    hardDeleteTourismItem,
    getTourismItemByCategoryAndName,
    createTourismItemImage,
};
