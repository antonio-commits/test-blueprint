package com.noovle.testblueprint.service;

import com.noovle.testblueprint.domain.Automobile;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Automobile}.
 */
public interface AutomobileService {

    /**
     * Save a automobile.
     *
     * @param automobile the entity to save.
     * @return the persisted entity.
     */
    Automobile save(Automobile automobile);

    /**
     * Get all the automobiles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Automobile> findAll(Pageable pageable);


    /**
     * Get the "id" automobile.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Automobile> findOne(Long id);

    /**
     * Delete the "id" automobile.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
