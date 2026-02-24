package com.witcher.desck.model;

public class Contract<T extends Monster> {
    private String id;
    private String location;
    private T target;
    private boolean completed;

    public Contract(String id, String location, T target) {
        this.id = id;
        this.location = location;
        this.target = target;
        this.completed = false;
    }

    // Геттери для перетворення в JSON
    public String getId() { return id; }
    public String getLocation() { return location; }
    public T getTarget() { return target; }
    public boolean isCompleted() { return completed; }
}
