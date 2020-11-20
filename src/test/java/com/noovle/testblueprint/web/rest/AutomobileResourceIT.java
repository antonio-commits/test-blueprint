package com.noovle.testblueprint.web.rest;

import com.noovle.testblueprint.TestblueprintApp;
import com.noovle.testblueprint.config.TestSecurityConfiguration;
import com.noovle.testblueprint.domain.Automobile;
import com.noovle.testblueprint.repository.AutomobileRepository;
import com.noovle.testblueprint.service.AutomobileService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AutomobileResource} REST controller.
 */
@SpringBootTest(classes = { TestblueprintApp.class, TestSecurityConfiguration.class })
@AutoConfigureMockMvc
@WithMockUser
public class AutomobileResourceIT {

    private static final String DEFAULT_MARCA = "AAAAAAAAAA";
    private static final String UPDATED_MARCA = "BBBBBBBBBB";

    private static final String DEFAULT_MODELLO = "AAAAAAAAAA";
    private static final String UPDATED_MODELLO = "BBBBBBBBBB";

    @Autowired
    private AutomobileRepository automobileRepository;

    @Autowired
    private AutomobileService automobileService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAutomobileMockMvc;

    private Automobile automobile;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Automobile createEntity(EntityManager em) {
        Automobile automobile = new Automobile()
            .marca(DEFAULT_MARCA)
            .modello(DEFAULT_MODELLO);
        return automobile;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Automobile createUpdatedEntity(EntityManager em) {
        Automobile automobile = new Automobile()
            .marca(UPDATED_MARCA)
            .modello(UPDATED_MODELLO);
        return automobile;
    }

    @BeforeEach
    public void initTest() {
        automobile = createEntity(em);
    }

    @Test
    @Transactional
    public void createAutomobile() throws Exception {
        int databaseSizeBeforeCreate = automobileRepository.findAll().size();
        // Create the Automobile
        restAutomobileMockMvc.perform(post("/api/automobiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(automobile)))
            .andExpect(status().isCreated());

        // Validate the Automobile in the database
        List<Automobile> automobileList = automobileRepository.findAll();
        assertThat(automobileList).hasSize(databaseSizeBeforeCreate + 1);
        Automobile testAutomobile = automobileList.get(automobileList.size() - 1);
        assertThat(testAutomobile.getMarca()).isEqualTo(DEFAULT_MARCA);
        assertThat(testAutomobile.getModello()).isEqualTo(DEFAULT_MODELLO);
    }

    @Test
    @Transactional
    public void createAutomobileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = automobileRepository.findAll().size();

        // Create the Automobile with an existing ID
        automobile.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutomobileMockMvc.perform(post("/api/automobiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(automobile)))
            .andExpect(status().isBadRequest());

        // Validate the Automobile in the database
        List<Automobile> automobileList = automobileRepository.findAll();
        assertThat(automobileList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAutomobiles() throws Exception {
        // Initialize the database
        automobileRepository.saveAndFlush(automobile);

        // Get all the automobileList
        restAutomobileMockMvc.perform(get("/api/automobiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(automobile.getId().intValue())))
            .andExpect(jsonPath("$.[*].marca").value(hasItem(DEFAULT_MARCA)))
            .andExpect(jsonPath("$.[*].modello").value(hasItem(DEFAULT_MODELLO)));
    }
    
    @Test
    @Transactional
    public void getAutomobile() throws Exception {
        // Initialize the database
        automobileRepository.saveAndFlush(automobile);

        // Get the automobile
        restAutomobileMockMvc.perform(get("/api/automobiles/{id}", automobile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(automobile.getId().intValue()))
            .andExpect(jsonPath("$.marca").value(DEFAULT_MARCA))
            .andExpect(jsonPath("$.modello").value(DEFAULT_MODELLO));
    }
    @Test
    @Transactional
    public void getNonExistingAutomobile() throws Exception {
        // Get the automobile
        restAutomobileMockMvc.perform(get("/api/automobiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAutomobile() throws Exception {
        // Initialize the database
        automobileService.save(automobile);

        int databaseSizeBeforeUpdate = automobileRepository.findAll().size();

        // Update the automobile
        Automobile updatedAutomobile = automobileRepository.findById(automobile.getId()).get();
        // Disconnect from session so that the updates on updatedAutomobile are not directly saved in db
        em.detach(updatedAutomobile);
        updatedAutomobile
            .marca(UPDATED_MARCA)
            .modello(UPDATED_MODELLO);

        restAutomobileMockMvc.perform(put("/api/automobiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAutomobile)))
            .andExpect(status().isOk());

        // Validate the Automobile in the database
        List<Automobile> automobileList = automobileRepository.findAll();
        assertThat(automobileList).hasSize(databaseSizeBeforeUpdate);
        Automobile testAutomobile = automobileList.get(automobileList.size() - 1);
        assertThat(testAutomobile.getMarca()).isEqualTo(UPDATED_MARCA);
        assertThat(testAutomobile.getModello()).isEqualTo(UPDATED_MODELLO);
    }

    @Test
    @Transactional
    public void updateNonExistingAutomobile() throws Exception {
        int databaseSizeBeforeUpdate = automobileRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAutomobileMockMvc.perform(put("/api/automobiles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(automobile)))
            .andExpect(status().isBadRequest());

        // Validate the Automobile in the database
        List<Automobile> automobileList = automobileRepository.findAll();
        assertThat(automobileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAutomobile() throws Exception {
        // Initialize the database
        automobileService.save(automobile);

        int databaseSizeBeforeDelete = automobileRepository.findAll().size();

        // Delete the automobile
        restAutomobileMockMvc.perform(delete("/api/automobiles/{id}", automobile.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Automobile> automobileList = automobileRepository.findAll();
        assertThat(automobileList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
