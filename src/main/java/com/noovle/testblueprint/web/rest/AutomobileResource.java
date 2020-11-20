package com.noovle.testblueprint.web.rest;

import com.noovle.testblueprint.domain.Automobile;
import com.noovle.testblueprint.service.AutomobileService;
import com.noovle.testblueprint.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.noovle.testblueprint.domain.Automobile}.
 */
@RestController
@RequestMapping("/api")
public class AutomobileResource {

    private final Logger log = LoggerFactory.getLogger(AutomobileResource.class);

    private static final String ENTITY_NAME = "testblueprintAutomobile";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AutomobileService automobileService;

    public AutomobileResource(AutomobileService automobileService) {
        this.automobileService = automobileService;
    }

    /**
     * {@code POST  /automobiles} : Create a new automobile.
     *
     * @param automobile the automobile to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new automobile, or with status {@code 400 (Bad Request)} if the automobile has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/automobiles")
    public ResponseEntity<Automobile> createAutomobile(@RequestBody Automobile automobile) throws URISyntaxException {
        log.debug("REST request to save Automobile : {}", automobile);
        if (automobile.getId() != null) {
            throw new BadRequestAlertException("A new automobile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Automobile result = automobileService.save(automobile);
        return ResponseEntity.created(new URI("/api/automobiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /automobiles} : Updates an existing automobile.
     *
     * @param automobile the automobile to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated automobile,
     * or with status {@code 400 (Bad Request)} if the automobile is not valid,
     * or with status {@code 500 (Internal Server Error)} if the automobile couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/automobiles")
    public ResponseEntity<Automobile> updateAutomobile(@RequestBody Automobile automobile) throws URISyntaxException {
        log.debug("REST request to update Automobile : {}", automobile);
        if (automobile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Automobile result = automobileService.save(automobile);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, automobile.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /automobiles} : get all the automobiles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of automobiles in body.
     */
    @GetMapping("/automobiles")
    public ResponseEntity<List<Automobile>> getAllAutomobiles(Pageable pageable) {
        log.debug("REST request to get a page of Automobiles");
        Page<Automobile> page = automobileService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /automobiles/:id} : get the "id" automobile.
     *
     * @param id the id of the automobile to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the automobile, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/automobiles/{id}")
    public ResponseEntity<Automobile> getAutomobile(@PathVariable Long id) {
        log.debug("REST request to get Automobile : {}", id);
        Optional<Automobile> automobile = automobileService.findOne(id);
        return ResponseUtil.wrapOrNotFound(automobile);
    }

    /**
     * {@code DELETE  /automobiles/:id} : delete the "id" automobile.
     *
     * @param id the id of the automobile to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/automobiles/{id}")
    public ResponseEntity<Void> deleteAutomobile(@PathVariable Long id) {
        log.debug("REST request to delete Automobile : {}", id);

        automobileService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
