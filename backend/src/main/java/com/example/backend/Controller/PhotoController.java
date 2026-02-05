package com.example.backend.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Models.Photo;
import com.example.backend.Models.User;
import com.example.backend.Models.DTO.PhotoDTO;
import com.example.backend.Service.Interface.CountryServiceInterface;
import com.example.backend.Service.Interface.PhotoServiceInterface;
import com.example.backend.Service.Interface.UserServiceInterface;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {
    private final PhotoServiceInterface photoService;
    private final CountryServiceInterface countryService;
    private final UserServiceInterface userService;

    public PhotoController(PhotoServiceInterface photoService, CountryServiceInterface countryService, UserServiceInterface userService) {
        this.photoService = photoService;
        this.countryService = countryService;
        this.userService = userService;
    }

    @GetMapping("/country/{name}")
    public List<PhotoDTO> getPhotosByCountry(@PathVariable String name) {
    List<Photo> photos = countryService.getPhotosByCountryName(name);
    return photos.stream().map(PhotoDTO::new).collect(Collectors.toList());
}

    @GetMapping("/{id}")
    public ResponseEntity<PhotoDTO> getPhotoDetails(@PathVariable Long id) {
        Photo photo = photoService.findPhotoById(id);
        if (photo != null) {
            return ResponseEntity.ok(new PhotoDTO(photo));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<Photo> uploadPhoto(@RequestBody Photo photo) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user=userService.findUserByUsername(username);
        photo.setUser(user);
        System.out.println(user);
        Long userId=user.getId();
        return ResponseEntity.ok(photoService.createPhoto(photo,photo.getCountry().getName(),userId));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePhoto(@PathVariable Long id) {
        photoService.deletePhoto(id);
        return ResponseEntity.ok("Photo deleted successfully");
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Photo> editPhoto(
        @PathVariable Long id,
        @RequestBody Photo photo) {

    Photo updatedPhoto = photoService.updatePhoto(id, photo,photo.getCountry().getId());
    return ResponseEntity.ok(updatedPhoto);
}
    @PutMapping("/add/country/{countryId}")
    public ResponseEntity<Photo> addPhotoToCountry(@PathVariable Long countryId, @RequestBody Photo photo) { 
        return ResponseEntity.ok(photoService.addPhotoToCountry(countryId, photo));
    }

}
