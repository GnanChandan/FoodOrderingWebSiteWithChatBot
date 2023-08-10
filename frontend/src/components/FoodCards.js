import FoodCard from "./FoodCard";
import '../styles/styles.css'
export default function FoodCards({foodItems})
{
   return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12"> 
            {foodItems.map((foodItem,i)=>{
                return (
                    <FoodCard key={i} photoPath={foodItem.path} foodItemName={foodItem.name} price={`${foodItem.price} $`}/>
                )
            })}
        </div>
   )
}