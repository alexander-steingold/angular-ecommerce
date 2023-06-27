import {sample_foods, sample_tags} from "../data";
import {Router} from "express";

const router = Router();

router.get("/",(req, res) => {
    res.send(sample_foods);
})) // for getting items tags

router.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const items = sample_foods.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(items);
}) // for getting items by search term

router.get("/tags", (req, res) => {
    res.send(sample_tags);
}) // for getting items tags

router.get("/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const items = sample_foods.filter(item => item.tags?.includes(tagName));
    res.send(items);
}) // for getting items by tag

router.get("/:itemId", (req, res) => {
    const itemId = req.params.itemId;
    const item = sample_foods.find(item => item.id == itemId)
    res.send(item);
}) // for getting item by id

export default router;