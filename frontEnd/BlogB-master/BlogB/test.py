from pymongo import MongoClient
conn = MongoClient('localhost', 27017)
db = conn.test
my_set = db.test_set
users={"name":"aaaa","age":2}
my_set.insert(users)
my_set.save(users)
