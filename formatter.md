```shell
rclone copy source/_posts/record-fragments/assets/ r2:cathub/blog/record-fragments -vv
```

```shell
rclone copy r2:cathub/blog/record-fragments source/_posts/record-fragments/assets/ -vv -P
```

```shell
sed 's#assets#https://cdn.cathub.me/blog/record-fragments#g' source/_posts/record-fragments/record-fragments-local.md > source/_posts/record-fragments.md
```