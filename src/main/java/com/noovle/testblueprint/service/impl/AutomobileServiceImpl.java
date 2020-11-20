package com.noovle.testblueprint.service.impl;

import com.noovle.testblueprint.service.AutomobileService;
import com.noovle.testblueprint.domain.Automobile;
import com.noovle.testblueprint.repository.AutomobileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Automobile}.
 */
@Service
@Transactional
public class AutomobileServiceImpl implements AutomobileService {

    private final Logger log = LoggerFactory.getLogger(AutomobileServiceImpl.class);

    private final AutomobileRepository automobileRepository;

    public AutomobileServiceImpl(AutomobileRepository automobileRepository) {
        this.automobileRepository = automobileRepository;
    }

    /**
     * Save a automobile.
     *
     * @param automobile the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Automobile save(Automobile automobile) {
        log.debug("Request to save Automobile : {}", automobile);
        return automobileRepository.save(automobile);
    }

    /**
     * Get all the automobiles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Automobile> findAll(Pageable pageable) {
        log.debug("Request to get all Automobiles");
        return automobileRepository.findAll(pageable);
    }


    /**
     * Get one automobile by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Automobile> findOne(Long id) {
        log.debug("Request to get Automobile : {}", id);
        return automobileRepository.findById(id);
    }

    /**
     * Delete the automobile by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Automobile : {}", id);

        automobileRepository.deleteById(id);
    }
}
