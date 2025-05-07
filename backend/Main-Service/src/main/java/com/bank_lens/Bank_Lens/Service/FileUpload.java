package com.bank_lens.Bank_Lens.Service;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class FileUpload {

    private final Cloudinary cloudinary;

    @Autowired
    public FileUpload(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        return cloudinary.uploader().upload(
                multipartFile.getBytes(),
                Map.of(
                        "public_id", "hey.csv",
                        "resource_type", "raw"
                )
        ).get("url").toString();
    }

}