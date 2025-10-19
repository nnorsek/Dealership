package com.dealership.start.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dealership.start.service.S3UploadService;


@RestController
@CrossOrigin("*")
@RequestMapping("/cars/images")
public class UploadImageController {
    
    @Autowired
    private S3UploadService s3UploadService;

    @PostMapping("/upload/{carId}")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @PathVariable String carId) {
        try {
            String imageUrl = s3UploadService.uploadFile(file, carId);
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
    }


    
    
}
