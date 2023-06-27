import {sample_foods, sample_tags} from "../data";
import {Router} from "express";
import asyncHandler from "express-async-handler";
import {ItemModel} from "../models/item.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const itemsCount = await ItemModel.countDocuments(); // get items collection
        if (itemsCount > 0) { // if there are items in collection
            res.send("Seed is already done!")
            return;
        }
        await ItemModel.create(sample_foods);
        res.send("Seed is done!");
    })) // for seed all items


router.get("/", asyncHandler(async (req, res) => {
    const items = await ItemModel.find();
    res.send(items);
})) // for getting items tags

router.get("/search/:searchTerm", asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const items = await ItemModel.find({name: {$regex: searchRegex}});
    res.send(items);
})) // for getting items by search term

router.get("/tags", asyncHandler(async (req, res) => {
    const tags = await ItemModel.aggregate([
        {
            $unwind: "$tags"
        },
        {
            $group: {
                _id: "$tags",
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                name: "$_id",
                count: "$count"
            }
        }
    ]).sort({'count': -1});
    const all = {
        name: 'All',
        count: await ItemModel.countDocuments()
    }
    tags.unshift(all);
    res.send(tags);
})) // for getting items tags

router.get("/tag/:tagName", asyncHandler(async (req, res) => {
    const items = await ItemModel.find({tags: req.params.tagName});
    res.send(items);
})) // for getting items by tag

router.get("/:itemId", asyncHandler(async (req, res) => {
    const item = await ItemModel.findById(req.params.itemId);
    res.send(item);
})) // for getting item by id

export default router;