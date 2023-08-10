import mysql.connector

cnx = mysql.connector.connect(user='root', host = 'localhost',database='restaurant',password='YOUR_PASSWORD',port=3306)

def get_order_status(order_id):
    cursor = cnx.cursor()
    cursor.execute('select status from order_tracking where order_id=(%s)',(order_id,))
    res = cursor.fetchall()
    cursor.close()
    if len(res):
        return res[0][0]
    else:
        return None
    

def getNextOrderId():
    query = "SELECT MAX(order_id) from orders;"
    cursor = cnx.cursor()
    cursor.execute(query)
    res = cursor.fetchall()
    nextOrderId = 1
    if res[0][0] != None:
        nextOrderId = res[0][0] + 1
    return nextOrderId

    

def saveOrdersToDb(order: dict,uid:str):
    # order_id  item_id  quantity  total_price
    cursor = cnx.cursor()
    order_id = getNextOrderId()
    item_ids,item_prices = getItemDetails()
    query = "insert into orders values(%s,%s,%s,%s,%s)"
    for item,quantity in order.items():
        item = item.lower()
        cursor.execute(query,(uid,order_id,item_ids[item],quantity,item_prices[item]*quantity))
    cursor.execute("insert into order_tracking values(%s,%s)",(order_id,"in transit"))
    cnx.commit()
    cursor.close()
    return order_id


def getItemDetails():
    priceMapping = dict()
    idMapping = dict()
    query = "select * from food_items"
    cursor = cnx.cursor()
    cursor.execute(query)
    foodItems = cursor.fetchall()
    for foodItem in foodItems:
        idMapping[foodItem[1].lower()] = foodItem[0]
        priceMapping[foodItem[1].lower()] = float(foodItem[2])
    cursor.close()
    return [idMapping,priceMapping]

def addUserToDb(user):
    cursor= cnx.cursor()
    query = "insert IGNORE  into userInfo values(%s,%s)"
    cursor.execute(query,(user.username,user.uid))
    cnx.commit()
    cursor.close()

def getUserName(uid):
    cursor= cnx.cursor()
    query = "select username from userInfo where uid=(%s);"
    cursor.execute(query,(uid,))
    username = cursor.fetchall()
    return username[0][0]
