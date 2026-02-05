package com.example.backend.Models;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
@Entity
@Table(name = "countries")
public class Country {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String code;
    @OneToMany(mappedBy = "country", cascade = CascadeType.ALL, fetch=FetchType.EAGER,orphanRemoval = true)
    @JsonIgnore
    private List<Photo> photos;
    public Country() {}
    public Country(String name, String code) {
        this.name = name;
        this.code = code;
        photos= new java.util.ArrayList<>();
    }
    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getCode() {
        return code;
    }
    public List<Photo> getPhotos() {
        return photos;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public void addPhoto(Photo photo) {
        photos.add(photo);
        photo.setCountry(this);
    }
    public List<Photo> setPhotos(List<Photo> photos) {
        this.photos = photos;
        return photos;
    }
    
}
