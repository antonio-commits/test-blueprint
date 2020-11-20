package com.noovle.testblueprint.repository;

import com.noovle.testblueprint.domain.Automobile;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Automobile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutomobileRepository extends JpaRepository<Automobile, Long> {
}
