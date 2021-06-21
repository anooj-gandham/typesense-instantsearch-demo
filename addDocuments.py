import sys
import typesense
import unicodedata

fileName = sys.argv[1]

client = typesense.Client({
  'nodes': [{
    'host': 'localhost',  # For Typesense Cloud use xxx.a1.typesense.net
    'port': '8108',       # For Typesense Cloud use 443
    'protocol': 'http'    # For Typesense Cloud use https
  }],
  'api_key': 'xyz',
  'connection_timeout_seconds': 2
})

# print(fileName)
data = open(fileName,'r').read()
# jsonl_file = jsonl_file.encode('latin-1', 'replace')


# print(data[5861456:5861476])
# print(str(unicodedata.normalize('NFKD', jsonl_file[5814010:5814020]).encode('ascii', 'ignore')))
# data = unicodedata.normalize('NFKD', jsonl_file).encode('ascii', 'ignore').decode("utf-8")

return_data = client.collections['blogs'].documents.import_(data)
print('Documents length: ', len(data.split('\n'))-1)
print('Sucessfully added: ', return_data.count('true'))

