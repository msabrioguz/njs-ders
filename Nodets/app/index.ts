import express from "express";

const app =  express();
const router = express.Router();

interface User {
    id: number,
    name: string
    lastName: string
    age: number
}

router.get("/", (req: express.Request, res: express.Response) => {
    const arr: User[] = [
        {
            id: 1,
            name: "Mustafa",
            lastName: "Oguz",
            age: 25
        },
        {
            id: 2,
            name: "Ali",
            lastName: "Veli",
            age: 26
        },
        {
            id: 3,
            name: "Ahmet",
            lastName: "Turan",
            age: 27
        }
    ]
    res.status(200).json(arr);
})

app.use(router);

app.listen(5000, () => {
    console.log("Server started on port 5000");
})