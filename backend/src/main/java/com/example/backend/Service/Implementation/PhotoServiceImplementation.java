package com.example.backend.Service.Implementation;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.Models.Country;
import com.example.backend.Models.Photo;
import com.example.backend.Repository.CountryRepository;
import com.example.backend.Repository.PhotoRepository;
import com.example.backend.Service.Interface.PhotoServiceInterface;

import jakarta.transaction.Transactional;
@Transactional
@Service
public class PhotoServiceImplementation implements PhotoServiceInterface {
    private PhotoRepository photoRepository;
    private CountryRepository countryRepository;
    public PhotoServiceImplementation(PhotoRepository photoRepository, CountryRepository countryRepository) {
        this.photoRepository = photoRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    public Photo createPhoto(Photo photo, String countryName, Long userId) {
    Country managedCountry =
    countryRepository.findByName(countryName);
    photo.setCountry(managedCountry);
    photo.setUploadDate(LocalDateTime.now());

    return photoRepository.save(photo);
    }

    @Override
    public Photo findPhotoById(Long id) {
        return photoRepository.findById(id).orElseThrow(() -> new RuntimeException("Photo was not found"));
    }
    @Override
    public void deletePhoto(Long id) {
    Photo photo = photoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Photo not found"));
    if (photo.getCountry() != null) {
        photo.getCountry().getPhotos().remove(photo);
        photo.setCountry(null);
    }
    if (photo.getUser() != null) {
        photo.getUser().getPhotos().remove(photo);
        photo.setUser(null);
    }

    photoRepository.delete(photo);
}

    @Override
    public Photo updatePhoto(Long id,Photo photo, Long countryId) {
        Photo existingPhoto = photoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Photo was not found"));
        existingPhoto.setTitle(photo.getTitle());
        existingPhoto.setUrl(photo.getUrl());
        existingPhoto.setDescription(photo.getDescription());
        existingPhoto.setCountry(countryRepository.findById(countryId).orElseThrow(() -> new RuntimeException("Country not found")));
        existingPhoto.setUploadDate(photo.getUploadDate());
        photoRepository.save(existingPhoto);
        return existingPhoto;
    }

    @Override
    public List<Photo> getAllPhotosByCountryId(Long countryId) {
        return photoRepository.findByCountryId(countryId);
    }
    @Override
    public Photo addPhotoToCountry(Long countryId, Photo photo) {
        photo.setCountry(countryRepository.findById(countryId).orElseThrow(() -> new RuntimeException("Country not found")));
        return photoRepository.save(photo);
    }

    
}
