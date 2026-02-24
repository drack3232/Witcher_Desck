package com.witcher.desck.service;

import com.witcher.desck.model.Contract;
import com.witcher.desck.model.Draconid;
import com.witcher.desck.model.Monster;
import com.witcher.desck.model.Necrophage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContractService {
    private final List<Contract<? extends Monster>> board = new ArrayList<>();

    public ContractService() {
        // Додаємо стартові дані (імітуємо базу даних)
        board.add(new Contract<>("CON-001", "Velen", new Necrophage("Water Hag", 80, 150)));
        board.add(new Contract<>("CON-002", "Skellige", new Draconid("Royal Wyvern", 250, 500)));
        board.add(new Contract<>("CON-003", "White Orchard", new Necrophage("Drowner", 40, 50)));
    }

    public List<Contract<? extends Monster>> getAllContracts() {
        return board;
    }
}