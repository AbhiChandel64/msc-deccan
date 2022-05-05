const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));


const connect = () => {
    return mongoose.connect("mongodb+srv://dbadmin:passw0rd@cluster0.blzg8.mongodb.net/deccan");
}

const getCategoryWiseNews = (news) => {
    return news.reduce((map, curr_news) => {
        const { category } = curr_news;
        category.forEach(category => {
            category = category.toUpperCase();
            if (!(category in map)) {
                map[category] = [curr_news];
            } else {
                map[category].push(curr_news);
            }
        });

        return map;
    }, {});
}


const newsSchema = new mongoose.Schema({
    "category": { type: String, required: true },
    "providerId": { type: String, required: true },
    "service": { type: String, required: true },
    "type": { type: String, required: true },
    "title": { type: String, required: true },
    "comment": { type: String, required: true },
    "url": { type: String, required: true },
    "authorName": { type: String, required: true },
    "authorUsername": { type: String, required: true },
    "authorPageurl": { type: String, required: true },
    "authorProfileImage": { type: String, required: true },
    "mediaImage": { type: String, required: true },
    "date": { type: String, required: true },
    "pid": { type: String, required: true },
});


const News = mongoose.model("news", newsSchema);

app.get("/news", async (req, res) => {
    try {
        const news = await News.find().lean().exec();

        return res.status(200).send({ news: getCategoryWiseNews(news) });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

app.get("/news/:id", async (req, res) => {
    try {
        const news = await News.findById(req.params.id).lean().exec();
        return res.status(200).send({ news });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});


app.listen(5000, async () => {
    try {
        await connect();
        console.log("Connected to database");
    } catch (err) {
        console.log("Error connecting to database");
    }

    console.log("App running on port 5000");
});