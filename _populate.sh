for name in `ls ../reducedBlogs/rss*`
do
node populateTypesenseIndex $name
# echo $name
done
