package com.witcher.desck.model;

public abstract class Monster implements Attackable {
    private String name;
    private int health;
    private int reward;

    public Monster(String name, int health, int reward) {
        this.name = name;
        this.health = health;
        this.reward = reward;
    }

    @Override
    public void takeDamage(int damage) {
        this.health -= damage;
    }

    @Override
    public boolean isAlive() { return health > 0; }
    public abstract void showVulnerability();

    // Геттери дуже важливі для Spring, щоб він міг зробити JSON!
    public String getName() { return name; }
    public int getHealth() { return health; }
    public int getReward() { return reward; }
}
