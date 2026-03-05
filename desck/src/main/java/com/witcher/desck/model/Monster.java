package com.witcher.desck.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "monsters")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Monster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int health;
    private int reward;

    // ==========================================
    // НОВІ ПОЛЯ ДЛЯ НАШОГО БЕСТІАРІЮ ТА ФРОНТЕНДУ
    // ==========================================
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String combatTactics;

    private String imageUrl;

    // Зв'язок з локацією (Велен, Новіград і т.д.)
    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Location location;

    public Monster() {
        // Порожній конструктор обов'язковий для Hibernate!
    }

    public Monster(String name, int health, int reward) {
        this.name = name;
        this.health = health;
        this.reward = reward;
    }

    // ==========================================
    // ТВОЯ ІГРОВА ЛОГІКА (ООП)
    // ==========================================
    public void takeDamage(int damage) {
        this.health -= damage;
    }

    public boolean isAlive() {
        return health > 0;
    }

    // Робимо метод звичайним, щоб позбутися слова abstract
    public void showVulnerability() {
        if (combatTactics != null) {
            System.out.println("Вразливості: " + combatTactics);
        } else {
            System.out.println("Вразливості цієї бестії ще не вивчені.");
        }
    }

    // ==========================================
    // ГЕТТЕРИ ТА СЕТТЕРИ ДЛЯ ВСІХ ПОЛІВ
    // ==========================================
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getHealth() { return health; }
    public void setHealth(int health) { this.health = health; }

    public int getReward() { return reward; }
    public void setReward(int reward) { this.reward = reward; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCombatTactics() { return combatTactics; }
    public void setCombatTactics(String combatTactics) { this.combatTactics = combatTactics; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }
}
