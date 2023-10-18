#!/bin/bash

cd ../source/_posts/record-fragments/assets || exit

for file in *.jpg; do
    filename=$(basename -- "$file")   # 提取文件名
    extension="${filename##*.}"       # 获取文件扩展名
    filename_no_ext="${filename%.*}"  # 提取没有扩展名的文件名

    # 计算文件的MD5哈希
    md5_hash=$(md5sum "$file" | cut -d' ' -f1)

    # 生成新的文件名
    new_filename="${filename_no_ext:0:4}-${md5_hash}.${extension}"

    # 文件名一致则跳过
    if [ "${file}" = "${new_filename}" ]; then
      echo "Skip unchanged $file"
      continue
    fi

    # 同步替换 Markdown 引用的图片链接
    # Mac 平台 sed -i 后面必须加备份文件后缀
    if [[ $(uname) == "Darwin" ]]; then
      sed -i '' "s/${filename}/${new_filename}/g" ../record-fragments-local.md
    else
      sed -i "s/${filename}/${new_filename}/g" ../record-fragments-local.md
    fi

    # 重命名文件
    mv "$file" "$new_filename"

    echo "Renamed $file to $new_filename"
done

# 本地路径替换为 CDN 地址
sed 's#assets#https://cdn.cathub.me/blog/record-fragments#g; s#hidden: true##g' ../record-fragments-local.md > ../../record-fragments.md
echo "Local resource Formatted to cdn"