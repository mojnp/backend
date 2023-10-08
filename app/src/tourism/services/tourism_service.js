const os = require("os");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");
const { promisify } = require("util");
const sharp = require("sharp"); // You may need to install the 'sharp' package
const { TOURISM_CATEGORIES } = require("../constants"); // Import your constants

const tourismAccess = require("../data_access/tourism_access");
const { HTTPException, status } = require("http-exceptions"); // You may need to install the 'http-exceptions' package

const BUCKET_NAME = process.env.DO_BUCKET;

function deleteOldImages(itemName) {
    const key = itemName.replace(/ /g, "_").replace(/-/g, "_");
    return new Promise(async (resolve, reject) => {
        try {
            const objects = await tourismAccess.drive.listObjects({
                Bucket: BUCKET_NAME,
                Prefix: `tourism/${key}`,
            });
            if (objects.Contents) {
                for (const obj of objects.Contents) {
                    await tourismAccess.drive.deleteObject({
                        Bucket: BUCKET_NAME,
                        Key: obj.Key,
                    });
                }
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

async function resizeImage(image) {
    const { width, height } = await image.metadata();
    let newWidth, newHeight;

    if (width > height) {
        newWidth = Math.floor(width * 0.7);
        newHeight = Math.floor(height * (newWidth / width));
    } else {
        newHeight = Math.floor(height * 0.7);
        newWidth = Math.floor(width * (newHeight / height));
    }

    return image.resize(newWidth, newHeight);
}

function getTourismItems(request) {
    return tourismAccess.getAll();
}

async function getTourismItemsByCategory(request, category) {
    try {
        return await tourismAccess.getByCategory(request, category);
    } catch (error) {
        throw new HTTPException(
            status.BAD_REQUEST,
            `Error: Cannot get the items in the ${category} category`
        );
    }
}

async function createTourismItem(data) {
    if (
        TOURISM_CATEGORIES.includes(data.category) &&
        !(await tourismAccess.db.countDocuments({ name: data.name }))
    ) {
        data.id = await tourismCrudHelpers.getNextId(tourismAccess);
        data.is_active = true;
        data.bucket_location = data.name.replace(/ /g, "_").replace(/-/g, "_");
        data.images = tourismCrudHelpers.parseImages(
            data,
            data.bucket_location
        );

        try {
            return await tourismAccess.create(data);
        } catch (error) {
            throw new HTTPException(
                status.BAD_REQUEST,
                "Error: Cannot create the item"
            );
        }
    } else {
        throw new HTTPException(
            status.BAD_REQUEST,
            "Error: Cannot create the item, data invalid or item already exists"
        );
    }
}

async function updateTourismItem(name, request) {
    if (TOURISM_CATEGORIES.includes(request.category)) {
        const item = await tourismAccess.getByName(name);

        if (item.length > 0) {
            try {
                request.images = [];
                request.bucket_location = request.name
                    .replace(/ /g, "_")
                    .replace(/-/g, "_");
                await deleteOldImages(request.name);
                return await tourismAccess.update(name, request);
            } catch (error) {
                throw new HTTPException(
                    status.BAD_REQUEST,
                    "Error: Cannot update the item"
                );
            }
        } else {
            throw new HTTPException(status.NOT_FOUND, "Error: Item not found");
        }
    }
}

async function softDeleteTourismItem(name) {
    const items = await tourismAccess.getAll();
    for (const item of items) {
        if (item.name === name) {
            item.is_active = false;
            return await tourismAccess.update(item);
        }
    }
    throw new HTTPException(status.NOT_FOUND, "Item not found");
}

async function hardDeleteTourismItem(name) {
    const items = await tourismAccess.getByName(name);
    if (items.length > 0) {
        await tourismAccess.delete(items[0].name);
        return `Item with name ${name} deleted successfully`;
    }
    throw new HTTPException(status.NOT_FOUND, "Item not found");
}

async function getTourismItemByCategoryAndName(category, name, request) {
    const items = await tourismAccess.getByCategory(request, category);
    const item = items.find((item) => item.name === name && item.is_active);
    if (item) {
        return item;
    }
    throw new HTTPException(status.NOT_FOUND, "Item not found");
}

async function createTourismItemImage(category, name, image_data) {
    try {
        const item = await tourismAccess.db.findOne({ category, name });

        if (!item) {
            throw new HTTPException(
                status.NOT_FOUND,
                `Item with name ${name} and category ${category} not found`
            );
        }

        const imageBytes = await getBufferFromStream(image_data.stream);
        const resizedImage = await resizeImage(sharp(imageBytes));
        const webpBuffer = await resizedImage.toBuffer({
            resolveWithObject: true,
            format: "webp",
            quality: 90,
            method: 0,
        });

        const s3Key = `tourism/${name
            .replace(/-/g, "_")
            .replace(/ /g, "_")}/${uuid.v4()}.webp`;
        await tourismAccess.drive.upload({
            Body: webpBuffer.data,
            Bucket: BUCKET_NAME,
            Key: s3Key,
            ACL: "public-read",
            ContentDisposition: "inline",
        });

        const path = `${process.env.DEFAULT_CDN_URL}/${s3Key}`;
        item.images.push(path);
        await tourismAccess.update(name, item);

        return item;
    } catch (error) {
        throw new HTTPException(
            status.NOT_FOUND,
            `Item with name ${name} and category ${category} not found`
        );
    }
}

function getBufferFromStream(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => {
            chunks.push(chunk);
        });
        stream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        stream.on("error", (error) => {
            reject(error);
        });
    });
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
