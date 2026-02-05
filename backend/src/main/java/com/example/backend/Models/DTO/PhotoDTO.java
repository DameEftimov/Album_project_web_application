package com.example.backend.Models.DTO;

import com.example.backend.Models.Photo;

public class PhotoDTO {
    private Long id;
    private String title;
    private String description;
    private String url;
    private String countryName;
    private Long countryId;
    private String username; 

    public PhotoDTO(Photo photo) {
        this.id = photo.getId();
        this.title = photo.getTitle();
        this.description = photo.getDescription();
        this.url = photo.getUrl();
        this.countryName = photo.getCountry().getName();
        this.username = photo.getUser() != null ? photo.getUser().getUsername() : "unknown";
        this.countryId = photo.getCountry().getId();
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getUrl() { return url; }
    public String getCountryName() { return countryName; }
    public String getUsername() { return username; }
    public Long getCountryId() { return countryId; }
}
