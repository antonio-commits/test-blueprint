import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import automobileType from 'components/__types__/automobile';

const AutomobileFieldTable = ({ t, automobile }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>{t('common.name')}</TableCell>
        <TableCell>{t('common.value')}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>
          <span>{t('entities.automobile.id')}</span>
        </TableCell>
        <TableCell>
          <span>{automobile.id}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.automobile.marca')}</span>
        </TableCell>
        <TableCell>
          <span>{automobile.marca}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.automobile.modello')}</span>
        </TableCell>
        <TableCell>
          <span>{automobile.modello}</span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

AutomobileFieldTable.propTypes = {
  automobile: automobileType,
  t: PropTypes.func.isRequired,
};

AutomobileFieldTable.defaultProps = {
  automobile: [],
};

export default withTranslation()(AutomobileFieldTable);
