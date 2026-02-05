package com.example.backend.Models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String email;
    private String password;
    @OneToMany(mappedBy = "user", cascade = jakarta.persistence.CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Photo> photos;

    public User() {
    }
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    public Long getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public List<Photo> getPhotos() {
        return photos;
    }
    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }
    public void addPhoto(Photo photo) {
        this.photos.add(photo);
        photo.setUser(this);
    }   
}
