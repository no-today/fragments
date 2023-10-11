const qiniu = require('qiniu')
const path = require('path')
const fs = require('fs')
const ProgressBar = require('progress')

const cfg = {
    accessKey: 'h7w-X-BsIMguR-46uAFhVKrliUZPjv2Cu8kM0mTw',
    secretKey: 'kfOvP-u0UFZP9Gno8J3kLmZyynaxWQcOTsIV_Stt',
    bucket: 'super-man',
    localPath: '../source/_posts/record-fragments/assets_zip',
    cloudPath: 'record-fragments'
}

// ----------------------------------------

const mac = new qiniu.auth.digest.Mac(cfg.accessKey, cfg.secretKey)

// 配置七牛云的存储空间对应的区域
const config = new qiniu.conf.Config({zone: qiniu.zone.Zone_z2})

// 创建七牛云上传管理器
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()

// 获取文件夹内的所有文件
let files = fs.readdirSync(cfg.localPath)
    .filter(item => fs.statSync(path.join(cfg.localPath, item)).isFile())

// 创建进度条
const progressBar = new ProgressBar(`Uploading [:bar] :percent [:current/:total] :etas :failure`, {
    complete: '=',
    incomplete: ' ',
    width: 50,
    total: files.length,
})

// 用于存储上传失败的文件名
const failures = []

// 循环遍历文件和子文件夹，并上传文件
files.forEach((file) => {
    const itemPath = path.join(cfg.localPath, file)
    const key = path.join(cfg.cloudPath, file) // 上传到七牛云的文件名

    formUploader.putFile(
        uploadToken(mac, cfg.bucket, key),
        key,
        itemPath,
        putExtra,
        (respErr, respBody, respInfo) => {
            if (respErr || respInfo.statusCode !== 200) failures.push(file)
            progressBar.tick({failure: failures.length === 0 ? '' : `(Failures: ${failures.length})`})
        }
    )
})

if (failures.length > 0) console.log(`Error upload image: ${JSON.stringify(failures)}`)

// 生成上传凭证
function uploadToken(mac, bucket, key) {
    const putPolicy = new qiniu.rs.PutPolicy({scope: `${bucket}:${key}`})
    return putPolicy.uploadToken(mac)
}
