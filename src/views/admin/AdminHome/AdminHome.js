import React from 'react';
import { Button, message } from "antd";
import { serverURL } from "@/apiConfig";
import axios from 'axios';
import { gitCommitApi } from "@/api/admin-common-api";
export default function AdminHome() {

  const folderInputRef = React.useRef(null);

  const styles = {
    hide: {
      display: "none",
    },
  };

  // 把文件夹分解成文件
  const handleFolderChange = (e) => {
    console.log(e.target.files.length);
    const list = Array.from(e.target.files);
    const files = list.map((file) => {
      if (file.webkitRelativePath) {
        const path = file.webkitRelativePath.split("/");
        const folders = path.slice(0, -1);
        file.folder = folders.join("#");
      }
      file.webkitRelativePath.replace(/\//g, "@");
      return file;
    });
    if (files.length > 0) {
      uploadFiles(files);
    }
    console.log('files', files);
    folderInputRef.current.value = "";
  };

  const MAX_COUNT = 1000;
  const MAX_SIZE = 1024 * 1024 * 1024;

  const uploadFiles = (files,idx = 0) => {
    if (files.length === 0) {
      return;
    }
    const list = Array.from(files);
    if (MAX_COUNT && list.length > MAX_COUNT) {
      message.error(`最多上传${MAX_COUNT}个文件`);
      return;
    }
    let isOverSize = false;
    if (MAX_SIZE) {
      isOverSize =
        list.filter((file) => {
          return file.size > MAX_SIZE;
        }).length > 0;
    }

    if (isOverSize) {
      message.error(`最多上传${MAX_SIZE / 1024 / 1024}M大的文件`);
      return;
    }
    // 设置文件类型
    // let isNotMatchType = false;
    // if (ACCEPS.length > 0) {
    //   isNotMatchType =
    //     list.filter((file) => {
    //       return ACCEPS.length > 0 && !ACCEPS.includes(file.type);
    //     }).length > 0;
    // }

    // if (isNotMatchType) {
    //   message.error("上传文件的类型不合法");
    //   return;
    // }
    let formData = new FormData();
    // 每次上传一个文件
    formData.append("files", files[idx], files[idx].webkitRelativePath.replace(/\//g, "@"));
    // 每次上传多个文件   可选，如果想要提升上传速度，可以选择一次上传多个文件，但上限为20个(亲测)，超过20个可能会报错
    // files.forEach((file, i) => {
    //   formData.append(
    //     'files', 
    //     files[i],
    //     files[i].webkitRelativePath.replace(/\//g, "@")
    //   );
    // });
    
    axios.post(serverURL + "/api/index/uploadFolder", formData)
      .then((res) => {
        console.log("res", res);
        if(idx<files.length-1){
          // 递归调用，可通过idx自行编写进度条
          uploadFiles(files,idx+1);
        }
        if(idx === files.length-1){
          message.success("上传成功");
        }
      })
      .catch((err) => {
        console.log("err", err);
        message.error("上传失败");
      })
  };



  const gitCommit = () => {
    gitCommitApi().then(res=>{
      if(res.code === 200){
        message.success('提交成功');
      }
    });
  }

  return (
    <div>
      <Button onClick={() => folderInputRef.current.click()} disabled type="primary">
        上传文件夹
      </Button>
      <input
        style={styles.hide}
        directory=""
        webkitdirectory=""
        onClick={(e) => e.stopPropagation()}
        onChange={handleFolderChange}
        multiple
        type="file"
        ref={folderInputRef}
      />

      <Button onClick={gitCommit} style={{margin: '0 10px'}} disabled type="primary">
        提交代码到仓库
      </Button>

    </div>
  )
}
