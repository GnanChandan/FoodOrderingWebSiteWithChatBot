import FoodCards from "./FoodCards";
import foodItemData from "../Data/foodItems";
export default function Menu()
{
    return (
        <FoodCards foodItems={foodItemData["FoodItems"]} />
    )
}