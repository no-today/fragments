```shell
mogrify -format jpg *.HEIC
```

```shell
for file in *.jpg; do mv "$file" "${file:0:4}-$(md5sum "$file" | cut -d' ' -f1).jpg"; done
```

```shell
ls -l | awk '{print $9}'
```

```shell
node qiniu-upload.js
```

```shell
sed -i '.bak' 's#record-fragments.assets#https://cdn.cathub.ink/record-fragments#g' record-fragments.md
```