package com.example.backend.Models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Photo {
    @Id
    @GeneratedValue
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private String url;
    private String title;
    private String description;
    private LocalDateTime uploadDate;
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "country_id")
    @JsonIgnoreProperties("photos")
    private Country country;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"photos", "password"}) 
    private User user;

    public Photo() {}

    public Photo(String url, String title, String description, LocalDateTime uploadDate, Country country) {
        this.url = url;
        this.title = title;
        this.description = description;
        this.uploadDate = uploadDate;
        this.country = country;
    }
    public Long getId() {
        return id;
    }
    public String getUrl() {
        return url;
    }
    public String getTitle() {
        return title;
    }
    public String getDescription() {
        return description;
    }
    public LocalDateTime getUploadDate() {
        return uploadDate;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public Country getCountry() {
        return country;
    }
    public void setCountry(Country country) {
        this.country = country;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}