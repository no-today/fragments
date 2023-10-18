### Customize

**Canonical file name**

```shell
cd cmd && sh canonical-filename.sh
```

### TinyPNG

- [TinyPNG](https://tinypng.com/), [tinypng-cli](https://www.npmjs.com/package/tinypng-cli)

**Install**

```shell
npm install -g tinypng-cli
```

**Compression**

```shell
tinypng source/images -k <api-key>
```

### Cloudflare R2 & [rclone](https://rclone.org/)

- [Cloudflare R2](https://developers.cloudflare.com/r2/examples/rclone/)

**Install**

```shell
brew install rclone
```

**Show**

```shell
rclone tree r2:cathub
```

```shell
rclone ls r2:cathub/blog/record-fragments
```

**Upload**

```shell
rclone copy source/_posts/record-fragments/assets r2:cathub/blog/record-fragments -vv -P
```

**Download**

```shell
rclone copy r2:cathub/blog/record-fragments source/_posts/record-fragments/assets -vv -P
```

**Delete**

```shell
rclone delete r2:cathub/blog/record-fragments -vv -P
```

### TODO

[issue](https://forum.rclone.org/t/sync-with-cloudflare-r2-overrides-all-files-on-remote/32160/3)

```properties
# 去掉末尾的 bucket-name, 命令中携带 bucket-name
endpoint=https://<account-id>.r2.cloudflarestorage.com
```

