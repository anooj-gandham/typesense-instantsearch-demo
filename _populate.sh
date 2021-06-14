for name in `ls ../reducedBlogs/rss111*`
do
node populateTypesenseIndex $name
# echo $name
done
