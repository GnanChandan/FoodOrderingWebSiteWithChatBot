import { useEffect, useState } from "react"
export default function Cart({uid})
{
    const [items,setItems] = useState({});
    const renderItems = ()=>{
        let ans = []
        let foodItemNames = Object.keys(items);
        let n = foodItemNames.length
        for (var i = 0;i < n;++i)
        {
            ans.push(
                <tr>
                    <td className="border p-2">{foodItemNames[i]}</td>
                    <td className="border p-2">{items[foodItemNames[i]][0]}</td>
                    <td className="border p-2">{items[foodItemNames[i]][1]}</td>
                </tr>
            )
        }
        return ans; 
    }

    const getTotalPrice = ()=>{
        let foodItemNames = Object.keys(items);
        let n = foodItemNames.length
        let totalPrice = 0;
        for (var i = 0;i < n;++i)
        {
            totalPrice += items[foodItemNames[i]][1];
        }
        return totalPrice;
        
        
    }

    useEffect(()=>{
        fetch(`http://localhost:8000/cart/${uid}`,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
        },
        }).then(async (res)=>{
            if (res.ok)
            {
                let items = await res.json();
                console.log(items);
                setItems(items['items']);
            }
        })
    },[uid])

    return (
        <div>
            <table className="w-full border-collapse">
                <tr>
                    <th className="border p-2">Item Name</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Price</th>
                </tr>
                {
                    renderItems()
                }
            </table>
            <div className="mt-4 mr-4 float-right">
                <p className="text-lg font-semibold">
                Total: $
                {getTotalPrice()}
                </p>
            </div>
        </div>
    )

}