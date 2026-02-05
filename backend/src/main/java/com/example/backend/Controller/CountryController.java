package com.example.backend.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Models.Country;
import com.example.backend.Service.Interface.CountryServiceInterface;

@RestController
@RequestMapping("/api/countries")
public class CountryController {
    private final CountryServiceInterface countryService;
    public CountryController(CountryServiceInterface countryService) {
        this.countryService = countryService;
    }
    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }
    @GetMapping("/{name}")
    public ResponseEntity<Country> getCountryDetails(@PathVariable String name) {
        Country country = countryService.getCountryByName(name);
        if (country != null) {
            return ResponseEntity.ok(country);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/create")
    public ResponseEntity<Country> createCountry(@RequestBody Country country){
        return ResponseEntity.ok(countryService.createCountry(country));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCountry(@PathVariable Long id){
        countryService.deleteCountry(id);
        return ResponseEntity.ok("Country deleted successfully");
    }
    @PutMapping("/edit")
    public ResponseEntity<Country> editCountry(@RequestBody Country country){
        return ResponseEntity.ok(countryService.updateCountry(country));
    }
    
}
