const axios = require('axios')
const fs = require('fs')
const path = require("path")
const ProgressBar = require("progress")

/**
 * API: https://tinypng.com/developers
 */
const cfg = {
    apiKey: "09XvXjbbBLh8D8Fx2C7mCjJnPTpBrnCq",
    inputDirectory: '../source/_posts/record-fragments/assets',
    outputDirectory: '../source/_posts/record-fragments/assets_zip'
}

// If not exists output dir, create
if (!fs.existsSync(cfg.outputDirectory)) fs.mkdirSync(cfg.outputDirectory)

// Read all files in the input directory and compress them
let files = fs.readdirSync(cfg.inputDirectory)
    .filter(item => fs.statSync(path.join(cfg.inputDirectory, item)).isFile() && !fs.existsSync(path.join(cfg.outputDirectory, item)))

// 创建进度条
const progressBar = new ProgressBar(`CompressImage [:bar] :percent [:current/:total] :etas :failure`, {
    complete: '=',
    incomplete: ' ',
    width: 50,
    total: files.length,
})

// 用于存储压缩失败的文件名
const failures = []

files.forEach(async (file) => {
    const inputFilePath = path.join(cfg.inputDirectory, file)
    const outputFilePath = path.join(cfg.outputDirectory, file)

    await compressImage(inputFilePath, outputFilePath)
})

if (failures.length > 0) console.log(`Error compressing image: ${JSON.stringify(failures)}`)

// Function to compress an image using TinyPNG API
async function compressImage(inputFilePath, outputFilePath) {
    const inputImage = fs.readFileSync(inputFilePath)
    try {
        const response = await axios.post('https://api.tinify.com/shrink', inputImage, {
            headers: {
                'Authorization': `Basic ${Buffer.from(`api:${cfg.apiKey}`).toString('base64')}`,
            },
        })

        const compressedImageUrl = response.data.output.url
        const downloadResponse = await axios({
            url: compressedImageUrl,
            responseType: 'stream',
        })

        const writer = fs.createWriteStream(outputFilePath)
        downloadResponse.data.pipe(writer)
        progressBar.tick({failure: failures.length === 0 ? '' : `(Failures: ${failures.length})`})
    } catch (error) {
        failures.push(path.basename(inputFilePath))
        progressBar.tick({failure: failures.length === 0 ? '' : `(Failures: ${failures.length})`})
    }
}
