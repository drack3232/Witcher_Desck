public class Necrophage extends Monster {
    public Necrophage(String name, int health, int reward) {
        super(name, health, reward);
    }

    @Override
    public void getVulnerability() {

    }

    @Override
    public void showVulnerability() {
        System.out.println("Pro-tip: Against Necrophages like " + getName() + ", use Necrophage Oil and Igni sign.");
    }
}