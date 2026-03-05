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
        // Запускаємо логіку тільки якщо база порожня
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

            // 2. Читаємо наш JSON файл
            ObjectMapper mapper = new ObjectMapper();
            InputStream inputStream = getClass().getResourceAsStream("/monsters.json");

            if (inputStream != null) {
                // Розбираємо JSON на об'єкти
                JsonNode jsonNode = mapper.readTree(inputStream);

                for (JsonNode node : jsonNode) {
                    Monster monster = new Monster();
                    monster.setName(node.get("name").asText());
                    monster.setHealth(node.get("health").asInt());
                    monster.setReward(node.get("reward").asInt());
                    monster.setDescription(node.get("description").asText());
                    monster.setCombatTactics(node.get("combatTactics").asText());
                    monster.setImageUrl(node.get("imageUrl").asText());

                    // Зв'язуємо монстра з локацією по ID
                    Long locId = node.get("locationId").asLong();
                    Location location = locationRepository.findById(locId).orElse(velen); // Захист: якщо ID не знайдено, кидаємо у Велен
                    monster.setLocation(location);

                    // Зберігаємо монстра в базу
                    monsterRepository.save(monster);
                }
                System.out.println("⚔️ База даних успішно наповнена з JSON!");
            } else {
                System.out.println("⚠️ Файл monsters.json не знайдено!");
            }
        }
    }
}