curl -H "X-TYPESENSE-API-KEY: xyz" -X POST --data-binary @docs.jsonl \
"http://localhost:8108/collections/blogs1/documents/import?action=create"

