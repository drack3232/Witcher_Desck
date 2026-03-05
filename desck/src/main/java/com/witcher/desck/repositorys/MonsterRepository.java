package com.witcher.desck.repositorys;

import com.witcher.desck.model.Monster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MonsterRepository extends JpaRepository<Monster, Long> {
    Monster findByname(String name);
    List<Monster> findByLocationId(Long locationId);



}