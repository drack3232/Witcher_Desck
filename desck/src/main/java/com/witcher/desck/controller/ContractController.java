package com.witcher.desck.controller;

import com.witcher.desck.model.Contract;
import com.witcher.desck.model.Monster;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.witcher.desck.service.ContractService;

import java.util.List;

@RestController
@RequestMapping("/api/contracts")
@CrossOrigin(origins = "*") // Дозволяє фронтенду робити запити до цього API
public class ContractController {

    private final ContractService contractService;

    // Spring сам передасть сюди ContractService (Dependency Injection)
    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping
    public List<Contract> getContracts() { // <-- Прибрали дженерік
        return contractService.getAllContracts();
    }
}