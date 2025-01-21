import json

# קריאת הקובץ JSON
with open('model/flowersInfo.json', 'r') as file:
    flowers_data = json.load(file)

# פונקציה לשליפת המידע לפי שם הפרח
def get_flower_info(flower_name):
    if flower_name in flowers_data:
        return flowers_data[flower_name]
    else:
        return "Flower not found"


# דוגמה לשימוש
flower_name = "Astilbe"
flower_info = get_flower_info(flower_name)
print(flower_info)
