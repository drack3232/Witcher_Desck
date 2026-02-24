import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class WitcherJournal {
    public static void main(String[] args) {
        List<Contract<? extends Monster>> board = new ArrayList<>();
board.add(new Contract<>("CON-1", "Lviv", new Necrophage("Water Hag", 150, 90)) );
        board.add(new Contract<>("CON-2", "Rivne", new Draconid("Vaselisk", 350, 190)) );
        board.add(new Contract<>("CON-3", "Striy", new Necrophage("Ghoul", 200, 120)) );

        System.out.println("=== WITCHER'S CONTRACT BOARD ===");
        board.forEach(System.out::println);
        System.out.println("\n--- Hunting the first target ---");

        Contract<? extends Monster> currentTask = board.get(0);
        Monster target = currentTask.getTarget();

        target.showVulnerability();
        target.takeDamage(100);

        if (!target.isAlive()) {
            currentTask.setCompleted(true);
            System.out.println("Contract fulfilled! Collected " + target.getReward() + " crowns.");
        }
        System.out.println("\n=== HIGH-REWARD ACTIVE CONTRACTS (>100 crowns) ===");
        List<Contract<? extends Monster>> eliteTasks = board.stream()
                .filter(c -> !c.isCompleted())
                .filter(c -> c.getTarget().getReward() > 100)
                .collect(Collectors.toList());

        eliteTasks.forEach(System.out::println);
    }
}
