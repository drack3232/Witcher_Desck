public class Contract<T extends Monster> {
    private String id;
    private String location;
    private T target;
    private boolean isCompleted;

    public Contract(String id, String loc, T target){
        this.id = id;
        this.location = loc;
        this.isCompleted = false;
        this.target = target;
    }
    public T getTarget() {
        return target;
    }

    public boolean isCompleted(){
        return isCompleted;
    }

    public void setCompleted(boolean completed){
        isCompleted = completed;
    }

    @Override
    public String toString() {
        String status = isCompleted ? "[COMPLETED]" : "[ACTIVE]";
        return String.format("%s Contract %s: %s in %s (Reward: %d crowns)",
                status, id, target.getName(), location, target.getReward());
    }
}
