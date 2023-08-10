from fastapi import  FastAPI
from fastapi import Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import dataBase
import helperFunctions
from fastapi.middleware.cors import CORSMiddleware



class userData(BaseModel):
    uid: str
    username: str

app = FastAPI()

origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

orders = dict()
activeUsers = dict()
userSessionIdMapping = dict()

@app.post("/")
async def handle_request(request: Request):
    # order_id = request['parameters']['order_id']
    body = await request.json()
    intent = body['queryResult']['intent']['displayName']
    parameters = body['queryResult']['parameters']
    url = body['queryResult']['outputContexts'][0]['name']
    sessionId = helperFunctions.getSessionId(url)
    if intent == 'track_order - ongoing-tracking':
        # get order details from database
        status = dataBase.get_order_status(parameters['order_id'])
        if status:
            return JSONResponse(content={
                "fulfillmentText":f"status of you order[{parameters['order_id']}] is {status}"
            })
        else:
            return JSONResponse(content={
                "fulfillmentText":"Enter correct order_id"
            })
    elif intent == 'add_order- context:ongoing-order':
         # {session_id : {food_item: number}}
        items = addOrder(parameters,sessionId)
        # print(f"{sessionId} {userSessionIdMapping[sessionId]}")
        if items:
            return JSONResponse(content={
                "fulfillmentText": f'{items} added successfully,currently you have {helperFunctions.getOrderDetails(orders[sessionId])} do u want anything else ?'
            })
        else:
            return JSONResponse(content={
                "fulfillmentText":'please specify the order correctly'
            })
    elif intent == 'remove_order - context:ongoing-order':
        res = removeOrder(parameters,sessionId)
        if res:
            return JSONResponse(content={
                "fulfillmentText":res
            })
        # else:
        #     return JSONResponse(content={
        #         'fulfillmentText':"but you did not order these items"
        #     })
    elif intent == 'order_complete - context: ongoing-order':
            orderId = dataBase.saveOrdersToDb(orders[sessionId],userSessionIdMapping[sessionId])
            orderDetails = helperFunctions.getOrderDetails(orders[sessionId])
            del orders[sessionId]
            if orderId == -1:
                return JSONResponse(content={
                    "fulfillmentText":"Sorry, there was a problem in storing your order, please order again"
                })
            else:
                return JSONResponse(content={
                    "fulfillmentText":f"your order {orderDetails} has been placed with an orderId:{orderId}"
                })
    elif intent == 'new_order - context:ongoing-order':
        if sessionId in orders:
            del orders[sessionId]
    elif intent == 'userName-tracking':
        username = body['queryResult']['parameters']['username'][0]['name']
        if (username and username not in activeUsers):
            return JSONResponse(content={
                'fulfillmentText':"please enter your valid username"
            })
        else:
           userSessionIdMapping[sessionId] = activeUsers[username]

@app.post('/register')
async def addUserToDb(ud:userData):
    dataBase.addUserToDb(ud)
    return {"response":200}


@app.post('/login')
async def addActiveUserDetailsToCache(ud:userData):
    username = dataBase.getUserName(ud.uid)
    activeUsers[username] = ud.uid

@app.get('/cart/{uid}')
def getCartItems(uid:str):
    sessionId = ''
    for k,v in userSessionIdMapping.items():
        if v == uid:
            sessionId = k
    if sessionId in orders:
        orderDetails = orders[sessionId]
        itemIds,itemPrices = dataBase.getItemDetails()
        res = dict()
        for k,v in orderDetails.items():
            res[k] = [v,itemPrices[k] * v]
        return {"items":res}
            
    else:
        return {"items":[]}

def addOrder(parameters,sessionId):
    foodItems = parameters['food_item']
    quantities = parameters['number']
    if len(foodItems) != len(quantities):
        return None
    else:
        resString = ""
        if sessionId not in orders:
            orders[sessionId] = dict()
            for k,v in zip(foodItems,quantities):
                resString  = resString + ' ' + str(v) + '-' + k
                orders[sessionId][k.lower()] = v
        else:
            for i in range(len(foodItems)):
                resString  = resString + ' ' + str(quantities[i]) + '-' + foodItems[i]
                if foodItems[i] not in orders[sessionId]:
                    orders[sessionId][foodItems[i].lower()] = quantities[i]
                else:
                    orders[sessionId][foodItems[i].lower()] += quantities[i]
    return resString

def removeOrder(parameters,sessionId):
    foodItems = parameters['food_item']
    resString = ""
    removed = []
    # notFound = []
    for foodItem in foodItems:
        if foodItem in orders[sessionId]:
            del orders[sessionId][foodItem.lower()]
            removed.append(foodItem)
        # else:
        #     notFound.append(foodItem)
    if len(removed) > 0:
        resString = f"removed {','.join(removed)}"
    if len(orders[sessionId]) > 0:
        resString = f"{resString}, so far you have {','.join(orders[sessionId])}, do you want something else ?"
    else:
        resString = f"{resString}, please order something else"
    return resString