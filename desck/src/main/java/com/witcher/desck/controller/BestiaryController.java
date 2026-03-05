package com.witcher.desck.controller;

import com.witcher.desck.model.Location;
import com.witcher.desck.model.Monster;
import com.witcher.desck.repositorys.LocationRepository;
import com.witcher.desck.repositorys.MonsterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class BestiaryController {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private MonsterRepository monsterRepository;

    @GetMapping("/locations")
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @PostMapping("/locations/{id}/monsters")
    public Monster addMonster(@PathVariable Long id, @RequestBody Monster newMonster) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Локацію не знайдено"));

        newMonster.setLocation(location);

        return monsterRepository.save(newMonster);
    }

    @GetMapping("/locations/{id}/monsters")
    public List<Monster> getMonstersByLocation(@PathVariable Long id) {
        return monsterRepository.findByLocationId(id);
    }
}