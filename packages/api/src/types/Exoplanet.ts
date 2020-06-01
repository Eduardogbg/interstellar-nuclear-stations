export type ExoplanetCoordinates = {
  system: string
  right_ascension: number
  right_ascension_units: string
  declination: number
  declination_units: string
  epoch: number
}

export type ExoplanetMeasure = {
  value: number
  unit: string
  error_max: number
  error_min: number
  bibcode: string
}

export type Exoplanet = {
  name: string
  coordinates: ExoplanetCoordinates
  mass: ExoplanetMeasure
  radius: ExoplanetMeasure
  inclination: ExoplanetMeasure
  semi_major_axis: ExoplanetMeasure
  orbital_period: ExoplanetMeasure
  eccentricity: ExoplanetMeasure
  omega_angle: ExoplanetMeasure
  anomaly_angle: ExoplanetMeasure
  lambda_angle: ExoplanetMeasure
  time_periastron: ExoplanetMeasure
  time_conjonction: ExoplanetMeasure
  angular_distance: ExoplanetMeasure
  tzero_primary_transit: ExoplanetMeasure
  tzero_secondary_transit: ExoplanetMeasure
  impact_parameter: ExoplanetMeasure
  tzero_radial_velocity: ExoplanetMeasure
  velocity_semiamplitude: ExoplanetMeasure
  calculated_temperature: ExoplanetMeasure
  measured_temperature: ExoplanetMeasure
  hottest_point_longitude: ExoplanetMeasure
  geometric_albedo: ExoplanetMeasure
  surface_gravity: ExoplanetMeasure
  detection_method: ExoplanetMeasure
  mass_detection_method: ExoplanetMeasure
  radius_detection_method: ExoplanetMeasure
  parent_star: ExoplanetMeasure
}
