package com.example.backend.Service.Implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.Models.Country;
import com.example.backend.Models.Photo;
import com.example.backend.Repository.CountryRepository;
import com.example.backend.Repository.PhotoRepository;
import com.example.backend.Service.Interface.CountryServiceInterface;

@Service
public class CountryServiceImplementation implements CountryServiceInterface {
    private final CountryRepository countryRepository;
    private final PhotoRepository photoRepository;
    public CountryServiceImplementation(CountryRepository countryRepository, PhotoRepository photoRepository) {
        this.countryRepository = countryRepository;
        this.photoRepository = photoRepository;
    }

    @Override
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    @Override
    public Country getCountryById(Long id) {
        return countryRepository.findById(id).orElseThrow(()-> new RuntimeException("Country not found"));
    }

    @Override
    public Country createCountry(Country country) {
        return countryRepository.save(country);
    }

    @Override
    public Country updateCountry(Country country) {
        Country existingCountry=getCountryById(country.getId());
        existingCountry.setName(country.getName());
        existingCountry.setCode(country.getCode());
        existingCountry.setPhotos(country.getPhotos());
        return countryRepository.save(existingCountry);
    }

    @Override
    public void deleteCountry(Long id) {
        countryRepository.deleteById(id);
    }

    @Override
    public List<Photo> getPhotosByCountryName(String countryName) {
        return photoRepository.findByCountryName(countryName); 
    }
    @Override
    public Country getCountryByName(String name) {
        return countryRepository.findByName(name);
    }
    
}
