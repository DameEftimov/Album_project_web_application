package com.example.backend.Service.Interface;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.Models.Photo;

@Service
public interface PhotoServiceInterface {
    Photo createPhoto(Photo photo, String countryName, Long userId);
    Photo findPhotoById(Long id);
    void deletePhoto(Long id);
    Photo updatePhoto(Long id, Photo photo, Long countryId);
    List<Photo> getAllPhotosByCountryId(Long countryId);
    Photo addPhotoToCountry(Long countryId, Photo photo);
    
}
