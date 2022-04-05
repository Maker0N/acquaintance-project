/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Quality from './quality'
import { getQualitiesLoadingStatus, getQualitiesByIds, loadQualitiesList } from '../../../store/qualities'

const QualitiesList = ({ qualitiesId }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualitiesByIds(qualitiesId))
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  if (isLoading) return 'Loading...'
  return (
    <>
      {qualitiesList.map((qual) => (
        <Quality key={qual._id} {...qual} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualitiesId: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QualitiesList
