node createSchema.js && node structCreateSchema.js

curl -H "X-TYPESENSE-API-KEY: xyz" -X POST --data-binary @blogs.jsonl \
"http://localhost:8108/collections/blogs/documents/import?action=create"

curl -H "X-TYPESENSE-API-KEY: xyz" -X POST --data-binary @blogs1.jsonl \
"http://localhost:8108/collections/blogs1/documents/import?action=create"


# curl -H "X-TYPESENSE-API-KEY: xyz" -X GET \
#       "http://localhost:8108/collections/blogs/documents/5"


# curl -H "X-TYPESENSE-API-KEY: xyz" \
#     "http://localhost:8108/collections/blogs1"
