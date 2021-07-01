cd ../newBlogs
wget --no-check-certificate 'https://drive.google.com/uc?id=1TvEX0PZN1fnOAw3S_zzl0wzX9UeWfqoz&export=download' -r -A 'uc*' -e robots=off -nd
mv 'uc?id=1TvEX0PZN1fnOAw3S_zzl0wzX9UeWfqoz&export=download' new.json
ls
cd ../typesense-instantsearch-demo
