import '../styles/styles.css'
export default function FoodCard({photoPath,price,foodItemName})
{
    return (
        <div className='relative w-73 h-72 m-5 col-span-3'>
            <img
                src={photoPath}
                alt={foodItemName}
                className='w-full h-full'
            />
            <p class="absolute bottom-0 left-0 bg-yellow-300 text-black font-bold text-lg p-4 ">{foodItemName}</p>
            <p class="absolute bottom-0 right-0 bg-yellow-300 text-black font-bold  p-4">{price}</p>
        </div>
    )
}