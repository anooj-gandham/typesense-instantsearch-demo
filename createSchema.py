from copy import error
import typesense

client = typesense.Client({
  'nodes': [{
    'host': 'localhost',  # For Typesense Cloud use xxx.a1.typesense.net
    'port': '8108',       # For Typesense Cloud use 443
    'protocol': 'http'    # For Typesense Cloud use https
  }],
  'api_key': 'xyz',
  'connection_timeout_seconds': 2
})

schema = {
  'name':'blogs',
  'fields':[
    {'name':'title','type':'string'},
    {'name':'description','type':'string'},
    {'name':'url','type':'string'},
    {'name':'category','type':'string'},
  ]
}

collections = client.collections.retrieve()
collectionNames = []
for c in collections:
  collectionNames.append(c['name'])

try:
  if 'blogs' not in collectionNames:
    client.collections.create(schema)
    print('Collection blogs created successfully')
  else:
    print('Collection blogs already present')

except(error):
  print(error)
