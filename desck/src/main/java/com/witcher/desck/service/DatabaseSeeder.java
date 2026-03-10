package com.witcher.desck.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.witcher.desck.model.Location;
import com.witcher.desck.model.Monster;
import com.witcher.desck.repositorys.LocationRepository;
import com.witcher.desck.repositorys.MonsterRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final LocationRepository locationRepository;
    private final MonsterRepository monsterRepository;

    public DatabaseSeeder(LocationRepository locationRepository, MonsterRepository monsterRepository) {
        this.locationRepository = locationRepository;
        this.monsterRepository = monsterRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (locationRepository.count() == 0) {

            Location velen = new Location();
            velen.setName("Велен");
            velen.setImageUrl("https://i.playground.ru/p/j8XCdr4Ln09d3eWXv5aoVA.jpeg.webp");

            Location novigrad = new Location();
            novigrad.setName("Новіград");
            novigrad.setImageUrl("https://i.playground.ru/p/yGWVoFNknhoW4CCq8qeEyw.jpeg.webp");

            Location skellige = new Location();
            skellige.setName("Скелліге");
            skellige.setImageUrl("https://i.playground.ru/p/M4ggqmbhq_VD-P0yBxLbHw.jpeg.webp");

            locationRepository.save(velen);
            locationRepository.save(novigrad);
            locationRepository.save(skellige);
        }
            ObjectMapper mapper = new ObjectMapper();
            InputStream inputStream = getClass().getResourceAsStream("/monsters.json");

            if (inputStream != null) {
                JsonNode jsonNode = mapper.readTree(inputStream);

                for (JsonNode node : jsonNode) {
                    String monsterName = node.get("name").asText();
                    Monster monster = monsterRepository.findByname(monsterName);

                    if(monster == null){
                        monster = new Monster();

                    }

                    monster.setName(node.get("name").asText());
                    monster.setHealth(node.get("health").asInt());
                    monster.setDescription(node.get("description").asText());
                    monster.setCombatTactics(node.get("combatTactics").asText());
                    monster.setImageUrl(node.get("imageUrl").asText());

                    Long locId = node.get("locationId").asLong();
                    Location location = locationRepository.findById(locId).orElse(null);
                    if(location != null) {
                        monster.setLocation(location);
                        monsterRepository.save(monster);
                    } else {
                        System.out.println("⚠️ Пропущено: Локацію з ID " + locId + " не знайдено для монстра " + monsterName);
                    }


                }

                System.out.println("⚔️ База даних успішно наповнена з JSON!");
            } else {
                System.out.println("⚠️ Файл monsters.json не знайдено!");
            }
        }
    }
