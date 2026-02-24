public class Draconid extends Monster {
    public Draconid(String name, int health, int reward){
        super(name, health,reward);
    }

    @Override
    public void getVulnerability() {

    }

    @Override
    public void showVulnerability() {
        System.out.println("Pro-tip: Draconids like " + getName() + " are weak to Grapeshot bombs and Draconid Oil.");
    }
    }

