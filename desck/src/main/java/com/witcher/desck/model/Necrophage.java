package com.witcher.desck.model;

public class Necrophage extends Monster {
    public Necrophage(){}
    public Necrophage(String name, int health, int reward) {
        super(name, health, reward);
    }
    @Override
    public void showVulnerability() { }
}
