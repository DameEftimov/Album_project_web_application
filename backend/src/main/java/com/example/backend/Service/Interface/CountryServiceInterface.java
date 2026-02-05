package com.example.backend.Service.Interface;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.Models.Country;
import com.example.backend.Models.Photo;

@Service
public interface CountryServiceInterface {
    List<Country> getAllCountries();
    Country getCountryById(Long id);
    Country createCountry(Country country);
    Country updateCountry(Country country);
    void deleteCountry(Long id);
    List<Photo> getPhotosByCountryName(String countryName);
    Country getCountryByName(String name);
}
