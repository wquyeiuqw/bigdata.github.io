const multer = require('multer');
const { execSync } = require('child_process');
const express = require('express');
const upload = multer({ dest: 'uploads/' });

function Upload() {
  const router = express.Router();
// 处理文件上传的路由
  router.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const container = req.body.container;
  const filePath = `/opt/${file.originalname}`;

  // 将文件移动到容器目录中
  execSync(`docker cp ${file.path} ${container}:${filePath}`);
  // 删除上传的临时文件
  execSync(`rm ${file.path}`);
  // 构建要执行的命令
  const command = `docker exec ${container} hadoop jar /opt/${file.path} HelloWorld /input /output`;
  // 在容器中执行命令
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return res.status(500).send('Error executing command');
    }

    console.log(`Command output: ${stdout}`);
    console.error(`Command error: ${stderr}`);
    return res.status(200).send('File uploaded and executed successfully');
  });

  res.status(200).json({ message: 'File uploaded successfully.' });
});
    return router;
}
module.exports = Upload;

