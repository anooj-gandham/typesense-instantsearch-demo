cd ../newBlogs
wget --no-check-certificate 'https://drive.google.com/uc?id=1BbyllTN3-A_LN2zlqFZyeFz3y2HR6DlB&export=download' -r -A 'uc*' -e robots=off -nd
mv 'uc?id=1BbyllTN3-A_LN2zlqFZyeFz3y2HR6DlB&export=download' new.jsonl
ls
cd ../typesense-instantsearch-demo
