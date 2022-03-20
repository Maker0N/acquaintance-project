import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useQualities } from '../../../hooks/useQualities';

const QualitiesList = ({ qualitiesId }) => {
  const { isLoading } = useQualities();
  if (isLoading) return 'Loading...';
  return (
    <>
      {qualitiesId.map((qual) => (
        <Quality key={qual} id={qual} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualitiesId: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QualitiesList
