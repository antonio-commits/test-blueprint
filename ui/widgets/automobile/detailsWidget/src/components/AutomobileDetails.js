import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import automobileType from 'components/__types__/automobile';
import AutomobileFieldTable from 'components/automobile-field-table/AutomobileFieldTable';

const AutomobileDetails = ({ t, automobile }) => {
  return (
    <Box>
      <h3>
        {t('common.widgetName', {
          widgetNamePlaceholder: 'Automobile',
        })}
      </h3>
      <AutomobileFieldTable automobile={automobile} />
    </Box>
  );
};

AutomobileDetails.propTypes = {
  automobile: automobileType,
  t: PropTypes.func.isRequired,
};

AutomobileDetails.defaultProps = {
  automobile: {},
};

export default withTranslation()(AutomobileDetails);
