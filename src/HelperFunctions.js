/**
 * Gathers environment variables and returns mockmeSettings object.
 * @return {{mockmeRoot: string, fieldName: string}}
 */
export const getEnvVariables = () => {
  // console.log(process.env)
  return ({
    mockmeRoot: process.env.REACT_APP_MOCKME_ROOT
        ? process.env.REACT_APP_MOCKME_ROOT
        : 'mockme-root',
    fieldName: process.env.REACT_APP_FIELD_NAME
        ?  process.env.REACT_APP_FIELD_NAME
        : '',
    sgEndpoint: process.env.REACT_APP_SG_ENDPOINT
        ?  process.env.REACT_APP_SG_ENDPOINT
        : '',
  })
}