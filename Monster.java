public abstract class Monster implements Attackable {
    private String name;
    private int health;
    private int reward;

    public Monster(String n, int h, int r){
        this.health = h;
        this.name = n;
        this.reward = r;
    }
    @Override
   public void takeDamage(int damage){
        this.health -= damage;
        System.out.println(name + " take  " + damage  + " damage. Keap a health:  " + health);
    }
    @Override
    public boolean isAlive(){
        return health > 0;
    }
    public abstract void getVulnerability();

    public String getName() { return name; }
    public int getReward() { return reward; }

    public abstract void showVulnerability();
}
