package pair.boardspring.image.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOError;
import java.io.IOException;

@RestController
@RequestMapping("/image")
@Slf4j
public class ImageController {

    // 루트 경로 불러오기
    private final String rootPath = System.getProperty("user.dir");
    // 프로젝트 루트 경로에 있는 files 디렉토리
    private final String fileDir = rootPath + "/images";

    public String getFullPath(String filename) { return fileDir + filename; }

    @PostMapping("/upload")
    public ResponseEntity save(@RequestParam("files") MultipartFile file) throws IOException {
        String imgFullPath = "";
        if(!file.isEmpty()){
            imgFullPath = File.separator + file.getOriginalFilename();
            file.transferTo(new File(getFullPath(imgFullPath)));
            return ResponseEntity.ok("이미지 저장 "+imgFullPath);
        }else {
            return ResponseEntity.ok("이미지가 없습니다.");
        }
    }
}
