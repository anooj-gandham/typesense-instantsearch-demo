for name in `ls ../newBlogs/rss*`
do
echo $name
node pop11 $name
done
