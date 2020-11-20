package com.noovle.testblueprint.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.noovle.testblueprint.web.rest.TestUtil;

public class AutomobileTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Automobile.class);
        Automobile automobile1 = new Automobile();
        automobile1.setId(1L);
        Automobile automobile2 = new Automobile();
        automobile2.setId(automobile1.getId());
        assertThat(automobile1).isEqualTo(automobile2);
        automobile2.setId(2L);
        assertThat(automobile1).isNotEqualTo(automobile2);
        automobile1.setId(null);
        assertThat(automobile1).isNotEqualTo(automobile2);
    }
}
