package com.witcher.desck.model;

import jakarta.persistence.*;

@Entity
public class Contract<T> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String location;
    @ManyToOne(cascade = CascadeType.ALL, targetEntity = Monster.class)
    @JoinColumn(name = "monster_id")
    private Monster target;
    private boolean completed;

    @Column(columnDefinition = "TEXT")
    private String combatTactics;

    private String imageUrl;

    public Contract(Long id, String location, Monster target) {
        this.id = id;
        this.location = location;
        this.target = target;
        this.completed = false;
    }


    // Геттери для перетворення в JSON
    public Long getId() { return id; }
    public String getLocation() { return location; }
    public Monster getTarget() { return target; }
    public boolean isCompleted() { return completed; }
    public String getCombatTactics() {
        return combatTactics;
    }

    public void setCombatTactics(String combatTactics) {
        this.combatTactics = combatTactics;
    }
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

}
