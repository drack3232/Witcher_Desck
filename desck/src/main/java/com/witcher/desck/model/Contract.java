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
}
