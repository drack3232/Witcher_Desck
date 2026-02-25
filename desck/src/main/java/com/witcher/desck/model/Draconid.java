package com.witcher.desck.model;

import jakarta.persistence.Entity;

@Entity
public class Draconid extends Monster {
    public Draconid() {}
    public Draconid(String name, int health, int reward) {
        super(name, health, reward);
    }
    @Override
    public void showVulnerability() { }
}
