const qiniu = require("qiniu");
const path = require("path");
const fs = require("fs");
const ProgressBar = require("progress");

const cfg = {
    accessKey: "",
    secretKey: "",
    bucket: "super-man",
    localPath: "source/_posts/record-fragments.assets",
    cloudPath: "record-fragments"
}

// 配置七牛云的Access Key和Secret Key
const accessKey = cfg.accessKey;
const secretKey = cfg.secretKey;

// 配置七牛云存储空间的名称
const bucket = cfg.bucket;

// 指定要上传的文件夹路径
const localPath = cfg.localPath;
// 上传到的七牛云路径
const cloudPath = cfg.cloudPath;

// ----------------------------------------

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

// 配置七牛云的存储空间对应的区域
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2; // 根据你的需求选择合适的区域

// 创建七牛云上传管理器
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

// 获取文件夹内的所有文件
let files = fs.readdirSync(localPath)
    .filter(item => fs.statSync(path.join(localPath, item)).isFile());

// 创建进度条
const progressBar = new ProgressBar("Uploading [:bar] :percent :etas (Failures: 0)", {
    complete: "=",
    incomplete: " ",
    width: 50,
    total: files.length,
});

// 上传计数器
let uploadCount = 0;

// 用于存储上传失败的文件名
const failedUploads = [];

// 循环遍历文件和子文件夹，并上传文件
files.forEach((file) => {
    const itemPath = path.join(localPath, file);
    const key = path.join(cloudPath, file); // 上传到七牛云的文件名

    formUploader.putFile(
        uploadToken(mac, bucket, key),
        key,
        itemPath,
        putExtra,
        (respErr, respBody, respInfo) => {
            uploadCount++;
            progressBar.tick();

            if (respErr || respInfo.statusCode !== 200) {
                failedUploads.push(file);
                progressBar.fmt = `Uploading [:bar] :percent :etas (Failures: ${failedUploads.length})`;
            }
        }
    );
});

// 生成上传凭证
function uploadToken(mac, bucket, key) {
    const options = {
        scope: `${bucket}:${key}`,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
}
