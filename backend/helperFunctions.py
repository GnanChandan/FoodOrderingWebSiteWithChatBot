import re
def getSessionId(url):
    match = re.search(r"projects/mira-chatbot-flvx/agent/sessions/(.*)/contexts/ongoing-order",url)
    if match:
        return match.group(1)
    return None

def getOrderDetails(order):
    res = ""
    for k,v in order.items():
        res = f"{res},{k}-{v}"
    return res[1:]