import { orderBy } from "lodash";

const categories = [
    "backgrounds",
    "fashion" ,
    "nature",
    "science",
    "education",
    "feelings",
    "health",
    "people",
    "religion",
    "places",
    "animals",
    "industry",
    "computer",
    "sports",
    "food",
    "transportation",
    "travel",
    "buildings",
    "business",
    "music"
];

const filters={
    order:["popular","latest"],
    orientation:["horizonal","vertical"],
    type:["photo","illustration","vector"],
    colors:[
        "red",
        "orange",
        "yellow",
        "green",
        "turquoise",
        "blue",
        "lilac",
        "pink",
        "white",
        "gray",
        "black",
        "brown",

    ]
}
export const data ={
    categories, filters
}