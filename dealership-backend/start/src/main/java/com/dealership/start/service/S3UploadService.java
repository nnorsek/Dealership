package com.dealership.start.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3UploadService {
    
    private final S3Client s3Client;


    @Value("${aws.s3.bucket}")
    private String bucketName;


    public S3UploadService() {
         this.s3Client = S3Client.builder()
            .region(Region.US_EAST_2)
            .build();
    }

    public String uploadFile(MultipartFile file, String carId) throws IOException {
        String key = "cars/" + carId + "/" +file.getOriginalFilename();

        PutObjectRequest putObjectRequest = PutObjectRequest
            .builder()
            .bucket(bucketName).key(key)
            .contentType(file.getContentType())
            .acl("public-read")
            .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

        return "https://" + bucketName + ".s3.amazonaws.com/" + key;
    }


}
